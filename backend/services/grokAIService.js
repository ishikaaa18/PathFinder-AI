// grokAIService.js
const OpenAI = require('openai');
require('dotenv').config(); // Load environment variables from .env

const grokApiKey = process.env.GROK_API_KEY;
const client = new OpenAI({
    apiKey: grokApiKey,
    baseURL: 'https://api.x.ai/v1'
});

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

        // 2. Call the Grok AI API using OpenAI-compatible endpoint
        const completion = await client.chat.completions.create({
            model: 'grok-beta',
            messages: [
                {
                    role: 'system',
                    content: 'You are a career guidance AI assistant. Provide career recommendations in valid JSON format only.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            response_format: { type: 'json_object' }
        });

        const text = completion.choices[0].message.content;

        // 3. Parse the JSON response
        try {
            const recommendations = JSON.parse(text);
            return recommendations;
        } catch (parseError) {
            console.error('Error parsing JSON response from Grok AI:', parseError);
            console.error('Raw response from Grok AI:', text); // Log the raw response for debugging
            throw new Error('Failed to parse Grok AI response. Check the raw response for errors.');
        }

    } catch (error) {
        console.error('Error calling Grok AI API:', error);
        throw new Error('Failed to generate career recommendations. Please try again later.');
    }
}

module.exports = { generateCareerRecommendations };
