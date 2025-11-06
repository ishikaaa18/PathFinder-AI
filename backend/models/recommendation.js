const mongoose = require('mongoose');
const { Schema } = mongoose;

const recommendationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    careerSuggestion: { type: String, required: true },
    courseLink: { type: String },
    justification: { type: String },
    aiModelUsed: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

module.exports = Recommendation;