const mongoose = require('mongoose');

const marketInsightSchema = new mongoose.Schema({
    role: { type: String, required: true, unique: true },
    salary: {
        entry: String,
        mid: String,
        senior: String
    },
    demandLevel: String,
    growth: String,
    topSkills: [String],
    industries: [String],
    lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

const MarketInsight = mongoose.model('MarketInsight', marketInsightSchema);
module.exports = MarketInsight;
