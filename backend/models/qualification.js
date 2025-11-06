const mongoose = require('mongoose');
const { Schema } = mongoose;

const qualificationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
    title: { type: String, required: true },
    institution: { type: String },
    dateObtained: { type: Date },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Qualification = mongoose.model('Qualification', qualificationSchema);

module.exports = Qualification;