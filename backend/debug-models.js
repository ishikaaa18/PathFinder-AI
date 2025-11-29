require('dotenv').config();
const fs = require('fs');
const https = require('https');

const apiKey = process.env.GEMINI_API_KEY;

function fetchModels(version) {
  return new Promise((resolve, reject) => {
    const url = `https://generativelanguage.googleapis.com/${version}/models?key=${apiKey}`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ version, data: parsed });
        } catch (e) {
          resolve({ version, error: e.message, raw: data });
        }
      });
    }).on('error', (err) => {
      resolve({ version, error: err.message });
    });
  });
}

async function checkModels() {
  const v1beta = await fetchModels('v1beta');
  const v1 = await fetchModels('v1');

  let output = '--- Gemini Models Debug Log ---\n';
  
  [v1beta, v1].forEach(result => {
    output += `\nAPI Version: ${result.version}\n`;
    if (result.error) {
      output += `Error: ${result.error}\n`;
      if (result.raw) output += `Raw response: ${result.raw}\n`;
    } else if (result.data.error) {
      output += `API Error: ${JSON.stringify(result.data.error, null, 2)}\n`;
    } else if (result.data.models) {
      output += `Found ${result.data.models.length} models:\n`;
      result.data.models.forEach(m => {
        if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent')) {
           output += `- ${m.name} (supports generateContent)\n`;
        } else {
           output += `- ${m.name}\n`;
        }
      });
    } else {
      output += `No models found. Response: ${JSON.stringify(result.data, null, 2)}\n`;
    }
  });

  fs.writeFileSync('available_models.log', output);
  console.log('Log written to available_models.log');
}

checkModels();
