const { GoogleGenerativeAI } = require("@google/generative-ai");
const Quiz = require("../models/Quiz");

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
    // Check cache first
    const cachedQuiz = await Quiz.findOne({ skill });
    
    // If cache exists and is less than 7 days old, return it
    const CacheExpiry = 7 * 24 * 60 * 60 * 1000; // 7 days
    if (cachedQuiz && (Date.now() - cachedQuiz.updatedAt < CacheExpiry)) {
      console.log(`Using cached quiz for: ${skill}`);
      return res.status(200).json(cachedQuiz);
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest",
      generationConfig: { responseMimeType: "application/json" }
    });

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
    
    console.log("Gemini Quiz Raw Output for", skill, ":", text);
    
    let quizData;
    let jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      try {
        quizData = JSON.parse(jsonMatch[0]);
      } catch (parseError) {
        console.error('Initial JSON Parse Error:', parseError);
        const cleanText = jsonMatch[0].replace(/```json/gi, '').replace(/```/g, '').trim();
        quizData = JSON.parse(cleanText);
      }
    } else {
      throw new Error("AI did not return a valid JSON object.");
    }

    if (!quizData.questions || !Array.isArray(quizData.questions)) {
      throw new Error("AI response missing 'questions' array.");
    }

    // Save/Update cache
    await Quiz.findOneAndUpdate(
      { skill },
      { ...quizData, lastUpdated: Date.now() },
      { upsert: true, new: true }
    );

    res.status(200).json(quizData);
  } catch (error) {
    console.error('Error generating quiz:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to generate quiz', 
      error: error.message 
    });
  }
};

module.exports = {
  generateQuiz
};
