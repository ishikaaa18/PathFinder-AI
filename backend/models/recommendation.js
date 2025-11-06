const mongoose = require('mongoose');
const { Schema } = mongoose;

const recommendationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    careerSuggestion: { type: String, required: true },
    courseLink: { type: String },
    justification: { type: String },
    aiModelUsed: { type: String, default: 'Gemini Pro' },
    confidenceScore: { type: Number, min: 0, max: 1, default: 0.8 },
    skillGaps: [{ type: String }]
}, { timestamps: true });

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

module.exports = Recommendation;