const { GoogleGenerativeAI } = require("@google/generative-ai");
const MarketInsight = require("../models/MarketInsight");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc    Generate job market insights
// @route   POST /api/insights/generate
// @access  Private
const generateInsights = async (req, res) => {
  const { role } = req.body;

  if (!role) {
    return res.status(400).json({ message: 'Job role is required' });
  }

  try {
    // Check cache first
    const cachedInsight = await MarketInsight.findOne({ role });
    
    // If cache exists and is less than 7 days old, return it
    const CacheExpiry = 7 * 24 * 60 * 60 * 1000; // 7 days
    if (cachedInsight && (Date.now() - cachedInsight.updatedAt < CacheExpiry)) {
      console.log(`Using cached insights for: ${role}`);
      return res.status(200).json(cachedInsight);
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `Provide realistic job market insights for the role of "${role}" in the Indian job market.
    Include the following data points:
    1. Average Salary Range (Entry, Mid, Senior) in Indian Rupees (INR) format (e.g., ₹X LPA - ₹Y LPA).
    2. Current Demand Level (High, Medium, Low).
    3. Year-over-Year Growth (percentage).
    4. Top 5 Skills in Demand in India.
    5. Top 3 Industries hiring for this role in India.

    Return the response in this strictly valid JSON format, without any markdown formatting:
    {
      "salary": {
        "entry": "₹X LPA - ₹Y LPA",
        "mid": "₹X LPA - ₹Y LPA",
        "senior": "₹X LPA - ₹Y LPA"
      },
      "demandLevel": "High/Medium/Low",
      "growth": "+X%",
      "topSkills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"],
      "industries": ["Industry 1", "Industry 2", "Industry 3"]
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("Gemini Insights Raw Output for", role, ":", text);
    
    let insightsData;
    let jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      try {
        insightsData = JSON.parse(jsonMatch[0]);
      } catch (parseError) {
        console.error('Initial JSON Parse Error:', parseError);
        const cleanText = jsonMatch[0].replace(/```json/gi, '').replace(/```/g, '').trim();
        insightsData = JSON.parse(cleanText);
      }
    } else {
      throw new Error("AI did not return a valid JSON object.");
    }

    // Save/Update cache
    await MarketInsight.findOneAndUpdate(
      { role },
      { ...insightsData, lastUpdated: Date.now() },
      { upsert: true, new: true }
    );

    res.status(200).json(insightsData);
  } catch (error) {
    console.error('Error generating insights:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to generate insights', 
      error: error.message 
    });
  }
};

module.exports = {
  generateInsights
};
