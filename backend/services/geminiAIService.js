// geminiAIService.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config(); // Load environment variables from .env

const geminiApiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(geminiApiKey);

async function generateCareerRecommendations(userData) {
    try {
        // 1. Construct the prompt
        const prompt = `Based on the following user data:
            Skills: ${userData.skills.map(skill => skill.skillName).join(', ')}
            Qualifications: ${userData.qualifications.map(qualification => qualification.title).join(', ')}
            Interests: ${userData.interests.map(interest => interest.interestName).join(', ')}

            Provide 3 career recommendations with a brief explanation for each, and suggest relevant online courses for each career.
            Format the response as a JSON object with the following structure:
            {
                "recommendations": [
                    {
                        "career": "Career Recommendation 1",
                        "explanation": "Explanation for Career Recommendation 1",
                        "courses": [
                            {"title": "Course Title 1", "link": "Course Link 1"},
                            {"title": "Course Title 2", "link": "Course Link 2"}
                        ]
                    },
                    {
                        "career": "Career Recommendation 2",
                        "explanation": "Explanation for Career Recommendation 2",
                        "courses": [
                            {"title": "Course Title 1", "link": "Course Link 1"},
                            {"title": "Course Title 2", "link": "Course Link 2"}
                        ]
                    },
                    {
                        "career": "Career Recommendation 3",
                        "explanation": "Explanation for Career Recommendation 3",
                        "courses": [
                            {"title": "Course Title 1", "link": "Course Link 1"},
                            {"title": "Course Title 2", "link": "Course Link 2"}
                        ]
                    }
                ]
            }`;

        // 2. Call the Gemini AI API
        const model = genAI.model({ model: "gemini-pro" }); // Or "gemini-1.5-pro-latest" or another model
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // 3. Parse the JSON response
        try {
            const recommendations = JSON.parse(text);
            return recommendations;
        } catch (parseError) {
            console.error('Error parsing JSON response from Gemini AI:', parseError);
            console.error('Raw response from Gemini AI:', text); // Log the raw response for debugging
            throw new Error('Failed to parse Gemini AI response. Check the raw response for errors.');
        }

    } catch (error) {
        console.error('Error calling Gemini AI API:', error);
        throw new Error('Failed to generate career recommendations. Please try again later.');
    }
}

module.exports = { generateCareerRecommendations };