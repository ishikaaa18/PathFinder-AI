require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // For listing models, we don't need to get a model instance first.
    // But the SDK doesn't have a direct listModels method on the client in older versions?
    // Actually, in 0.21.0 it might be different.
    // Let's try to use the model manager if it exists, or just try to generate content with a known model to see if we can get a better error or if we can list models via a raw request if needed.
    // Wait, the error message says "Call ListModels".
    
    // Let's try to use the `getGenerativeModel` and assume we can't list easily without looking up docs.
    // But wait, I can try to make a raw fetch request to the list models endpoint using the API key.
    
    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.models) {
      console.log('Available Models:');
      data.models.forEach(model => {
        if (model.supportedGenerationMethods && model.supportedGenerationMethods.includes('generateContent')) {
           console.log(`- ${model.name}`);
        }
      });
    } else {
      console.log('No models found or error:', data);
    }
    
  } catch (error) {
    console.error('Error listing models:', error);
  }
}

listModels();
