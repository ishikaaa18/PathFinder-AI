const mongoose = require('mongoose');
const { Schema } = mongoose;

const skillSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    skillName: { type: String, required: true },
    proficiencyLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
    yearsExperience: { type: Number }
}, { timestamps: true }); // Automatically manages createdAt and updatedAt

const Skill = mongoose.model('Skill', skillSchema);
module.exports = Skill;
