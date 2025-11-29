const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc    Generate job market insights
// @route   POST /api/insights/generate
// @access  Private
const generateInsights = async (req, res) => {
  const { role, location = 'Global' } = req.body;

  if (!role) {
    return res.status(400).json({ message: 'Job role is required' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", apiVersion: "v1" });

    const prompt = `Provide realistic job market insights for the role of "${role}" in "${location}".
    Include the following data points:
    1. Average Salary Range (Entry, Mid, Senior).
    2. Current Demand Level (High, Medium, Low).
    3. Year-over-Year Growth (percentage).
    4. Top 5 Skills in Demand.
    5. Top 3 Industries hiring for this role.

    Return the response in this strictly valid JSON format, without any markdown formatting:
    {
      "salary": {
        "entry": "$X - $Y",
        "mid": "$X - $Y",
        "senior": "$X - $Y"
      },
      "demandLevel": "High/Medium/Low",
      "growth": "+X%",
      "topSkills": ["Skill 1", "Skill 2", ...],
      "industries": ["Industry 1", "Industry 2", ...]
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up markdown if present
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const insightsData = JSON.parse(cleanText);

    res.status(200).json(insightsData);
  } catch (error) {
    console.error('Error generating insights:', error);
    res.status(500).json({ message: 'Failed to generate insights', error: error.message });
  }
};

module.exports = {
  generateInsights
};
