const mongoose = require('mongoose');
const { Schema } = mongoose;

const interestSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    interestName: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Interest = mongoose.model('Interest', interestSchema);

module.exports = Interest;