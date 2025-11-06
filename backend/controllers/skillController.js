const Skill = require('../models/skill');

// @desc    Create a new skill
// @route   POST /api/skills
// @access  Protected
exports.createSkill = async (req, res) => {
    try {
        const skillData = {
            ...req.body,
            userId: req.user._id
        };
        const skill = new Skill(skillData);
        const savedSkill = await skill.save();
        res.status(201).json(savedSkill);
    } catch (error) {
        console.error('Error creating skill:', error);
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all skills
// @route   GET /api/skills
// @access  Protected
exports.getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.find({ userId: req.user._id })
            .sort({ createdAt: -1 });
        res.json(skills);
    } catch (error) {
        console.error('Error fetching skills:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get skills by user ID
// @route   GET /api/skills/user/:userId
// @access  Protected
exports.getSkillsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        
        if (userId !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied: Cannot view other users skills' });
        }
        
        const skills = await Skill.find({ userId })
            .sort({ yearsExperience: -1 });
        
        if (!skills || skills.length === 0) {
            return res.status(404).json({ message: 'No skills found for this user' });
        }
        
        res.json(skills);
    } catch (error) {
        console.error('Error fetching user skills:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get a skill by ID
// @route   GET /api/skills/:id
// @access  Protected
exports.getSkillById = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }
        
        if (skill.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied: Cannot view other users skills' });
        }
        
        res.json(skill);
    } catch (error) {
        console.error('Error fetching skill:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Protected
exports.updateSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }
        
        if (skill.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied: Cannot update other users skills' });
        }
        
        const updatedSkill = await Skill.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        
        res.json(updatedSkill);
    } catch (error) {
        console.error('Error updating skill:', error);
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Protected
exports.deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }
        
        if (skill.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied: Cannot delete other users skills' });
        }
        
        await Skill.findByIdAndDelete(req.params.id);
        
        res.json({ message: 'Skill deleted successfully' });
    } catch (error) {
        console.error('Error deleting skill:', error);
        res.status(500).json({ message: error.message });
    }
};
