require('dotenv').config();
const https = require('https');

const apiKey = process.env.GEMINI_API_KEY;

function fetchModels(version) {
  const url = `https://generativelanguage.googleapis.com/${version}/models?key=${apiKey}`;
  
  https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        if (parsed.models) {
          console.log(`--- ${version} ---`);
          parsed.models.forEach(m => {
            if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent')) {
               console.log(m.name);
            }
          });
        } else {
            console.log(`No models for ${version}:`, parsed);
        }
      } catch (e) {
        console.error(e);
      }
    });
  }).on('error', (err) => {
    console.error(err);
  });
}

fetchModels('v1beta');
fetchModels('v1');
