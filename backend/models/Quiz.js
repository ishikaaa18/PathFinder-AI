const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    skill: { type: String, required: true, unique: true },
    questions: [{
        question: String,
        options: [String],
        correctAnswer: Number,
        explanation: String
    }],
    lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
