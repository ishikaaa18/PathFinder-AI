const mongoose = require('mongoose');

const resumeAnalysisSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    targetCareer: {
        type: String,
        required: true
    },
    originalFilename: {
        type: String,
        required: true
    },
    matchScore: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    summary: {
        type: String,
        required: true
    },
    missingSkills: [{
        type: String
    }],
    improvements: [{
        type: String
    }],
    strengths: [{
        type: String
    }],
    analyzedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ResumeAnalysis', resumeAnalysisSchema);
