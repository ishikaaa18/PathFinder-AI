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
            
            For each career recommendation, suggest 2-3 REAL online courses from popular platforms.
            
            PREFERRED PLATFORMS AND VERIFIED EXAMPLES:
            - Coursera (e.g., https://www.coursera.org/professional-certificates/devops-and-software-engineering)
            - edX (e.g., https://www.edx.org/certificates/professional-certificate/harvardx-data-science)
            - Udemy (e.g., https://www.udemy.com/courses/search/?q=python%20programming)
            
            CRITICAL REQUIREMENTS FOR COURSE LINKS:
            1. Provide REAL, ACTUAL course URLs.
            2. If a specific course URL is not known, use a VERIFIED search URL:
               - https://www.coursera.org/search?query=[topic]
               - https://www.edx.org/search?q=[topic]
               - https://www.udemy.com/courses/search/?q=[topic]
            3. DO NOT use placeholder URLs like "example.com".
            4. Each URL must start with https://
            
            Format the response as a valid JSON object with the following structure:
            {
                "recommendations": [
                    {
                        "career": "Career Recommendation 1",
                        "explanation": "Explanation for Career Recommendation 1",
                        "courses": [
                            {"title": "Foundational Course Title", "link": "https://www.coursera.org/verified-url"},
                            {"title": "Advanced Specialty Title", "link": "https://www.edx.org/verified-url"}
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
                        ],
                        "skillGaps": ["Skill 1", "Skill 2"]
                    }
                ]
            }
            
            CRITICAL: You MUST include the "roadmap" array for EACH recommendation. 
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

async function generateCoverLetter(resumeData, careerData) {
    try {
        const prompt = `Write a professional, modern cover letter for a ${careerData.career} position.
            
            USER DATA:
            Resume Summary: ${resumeData.summary}
            Top Strengths: ${resumeData.strengths.join(', ')}
            Skills Gaps Identified: ${resumeData.missingSkills.join(', ')}
            
            INSTRUCTIONS:
            1. The letter should be professional yet enthusiastic.
            2. Address the "Skills Gaps" by mentioning how the user is actively improving in these areas (mention that they are following a personalized learning roadmap).
            3. Highlight the "Strengths" and how they align with the ${careerData.career} role.
            4. Keep the tone confident but humble.
            5. Structure: Opening (expressing interest), Body (linking experience to the role and addressing gaps), and Closing (call to action).
            
            Format: Return the text directly. Do not use markdown backticks.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();

    } catch (error) {
        console.error('Error calling Gemini AI for cover letter:', error);
        throw new Error('Failed to generate cover letter.');
    }
}

module.exports = { generateCareerRecommendations, generateCoverLetter };
