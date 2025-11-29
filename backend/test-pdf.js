const pdf = require('pdf-parse');
console.log('Type:', typeof pdf);
console.log('Keys:', Object.keys(pdf));
console.log('Is function?', typeof pdf === 'function');
console.log('Has default?', typeof pdf.default === 'function');

try {
    const fs = require('fs');
    // Create a dummy PDF buffer (not a real PDF, just to see if it crashes on call)
    // pdf(Buffer.from('test')).catch(e => console.log('Call result:', e.message));
} catch (e) {
    console.log('Error:', e);
}
