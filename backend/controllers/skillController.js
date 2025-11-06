const Skill = require('../models/skill');

// Create a new skill
exports.createSkill = async (req, res) => {
    try {
        const skill = new Skill(req.body);
        const savedSkill = await skill.save();
        res.status(201).json(savedSkill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all skills
exports.getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.find().populate('userId', 'username email');
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a skill by ID
exports.getSkillById = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id).populate('userId', 'username email');
        if (!skill) return res.status(404).json({ message: 'Skill not found' });
        res.json(skill);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a skill
exports.updateSkill = async (req, res) => {
    try {
        const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSkill) return res.status(404).json({ message: 'Skill not found' });
        res.json(updatedSkill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a skill (optional – maybe later for admin)
exports.deleteSkill = async (req, res) => {
    try {
        const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
        if (!deletedSkill) return res.status(404).json({ message: 'Skill not found' });
        res.json({ message: 'Skill deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
