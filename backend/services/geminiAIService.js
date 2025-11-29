// geminiAIService.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const geminiApiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

async function generateCareerRecommendations(userData) {
    try {
        const prompt = `Based on the following user data:
            Skills: ${userData.skills.map(skill => skill.skillName).join(', ')}
            Qualifications: ${userData.qualifications.map(qualification => qualification.title).join(', ')}
            Interests: ${userData.interests.map(interest => interest.interestName).join(', ')}

            Provide 3 career recommendations with a brief explanation for each.
            
            For each career recommendation, suggest 2-3 REAL online courses from popular platforms like:
            - Coursera (www.coursera.org)
            - Udemy (www.udemy.com)
            - edX (www.edx.org)
            - LinkedIn Learning (www.linkedin.com/learning)
            - Udacity (www.udacity.com)
            
            CRITICAL REQUIREMENTS FOR COURSE LINKS:
            1. Provide REAL, ACTUAL course URLs that exist on these platforms
            2. Use the general course search/catalog pages if you don't know specific course URLs
            3. Examples of valid general URLs:
               - https://www.coursera.org/search?query=data%20science
               - https://www.udemy.com/courses/search/?q=python%20programming
               - https://www.edx.org/search?q=machine%20learning
            4. DO NOT use placeholder URLs like "example.com" or "documentation-link.com"
            5. DO NOT use fake URLs - use real platform URLs only
            6. Each URL must start with https://
            
            Format the response as a valid JSON object with the following structure:
            {
                "recommendations": [
                    {
                        "career": "Career Recommendation 1",
                        "explanation": "Explanation for Career Recommendation 1",
                        "courses": [
                            {"title": "Course Title 1", "link": "https://www.coursera.org/actual-course-url"},
                            {"title": "Course Title 2", "link": "https://www.udemy.com/actual-course-url"}
                        ],
                        "roadmap": [
                            {
                                "phase": "Phase 1: Fundamentals",
                                "duration": "4 weeks",
                                "topics": ["Topic 1", "Topic 2"]
                            },
                            {
                                "phase": "Phase 2: Advanced Concepts",
                                "duration": "6 weeks",
                                "topics": ["Topic 3", "Topic 4"]
                            }
                        ]
                    }
                ]
            }
            
            CRITICAL: You MUST include the "roadmap" array for EACH recommendation. It is NOT optional.
            RETURN ONLY THE JSON. NO MARKDOWN FORMATTING.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Clean up markdown code blocks if present
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        try {
            const recommendations = JSON.parse(text);
            return recommendations;
        } catch (parseError) {
            console.error('Error parsing JSON response from Gemini AI:', parseError);
            console.error('Raw response from Gemini AI:', text);
            throw new Error('Failed to parse Gemini AI response.');
        }

    } catch (error) {
        console.error('Error calling Gemini AI API:', error);
        throw new Error('Failed to generate career recommendations. Please try again later.');
    }
}

module.exports = { generateCareerRecommendations };
