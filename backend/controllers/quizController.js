const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc    Generate a quiz for a specific skill
// @route   POST /api/quiz/generate
// @access  Private
const generateQuiz = async (req, res) => {
  const { skill } = req.body;

  if (!skill) {
    return res.status(400).json({ message: 'Skill is required' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", apiVersion: "v1" });

    const prompt = `Generate a technical multiple-choice quiz to verify a user's proficiency in "${skill}".
    Create exactly 5 questions.
    For each question, provide:
    1. The question text.
    2. 4 options (A, B, C, D).
    3. The correct answer (index 0-3).
    4. A brief explanation of the correct answer.

    Return the response in this strictly valid JSON format, without any markdown formatting:
    {
      "questions": [
        {
          "question": "Question text here?",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": 0,
          "explanation": "Explanation here."
        }
      ]
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up markdown if present
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const quizData = JSON.parse(cleanText);

    res.status(200).json(quizData);
  } catch (error) {
    console.error('Error generating quiz:', error);
    res.status(500).json({ message: 'Failed to generate quiz', error: error.message });
  }
};

module.exports = {
  generateQuiz
};
