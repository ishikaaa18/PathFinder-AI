const Qualification = require('../models/qualification');

// @desc    Create a new qualification
// @route   POST /api/qualifications
// @access  Protected
exports.createQualification = async (req, res) => {
    try {
        const qualificationData = {
            ...req.body,
            userId: req.user._id
        };
        const qualification = new Qualification(qualificationData);
        const savedQualification = await qualification.save();
        res.status(201).json(savedQualification);
    } catch (error) {
        console.error('Error creating qualification:', error);
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all qualifications
// @route   GET /api/qualifications
// @access  Protected
exports.getAllQualifications = async (req, res) => {
    try {
        const qualifications = await Qualification.find({ userId: req.user._id })
            .sort({ createdAt: -1 });
        res.json(qualifications);
    } catch (error) {
        console.error('Error fetching qualifications:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get qualifications by user ID
// @route   GET /api/qualifications/user/:userId
// @access  Protected
exports.getQualificationsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        
        if (userId !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied: Cannot view other users qualifications' });
        }
        
        const qualifications = await Qualification.find({ userId })
            .sort({ dateObtained: -1 });
        
        if (!qualifications || qualifications.length === 0) {
            return res.status(404).json({ message: 'No qualifications found for this user' });
        }
        
        res.json(qualifications);
    } catch (error) {
        console.error('Error fetching user qualifications:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get a qualification by ID
// @route   GET /api/qualifications/:id
// @access  Protected
exports.getQualificationById = async (req, res) => {
    try {
        const qualification = await Qualification.findById(req.params.id);
        
        if (!qualification) {
            return res.status(404).json({ message: 'Qualification not found' });
        }
        
        if (qualification.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied: Cannot view other users qualifications' });
        }
        
        res.json(qualification);
    } catch (error) {
        console.error('Error fetching qualification:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a qualification
// @route   PUT /api/qualifications/:id
// @access  Protected
exports.updateQualification = async (req, res) => {
    try {
        const qualification = await Qualification.findById(req.params.id);
        
        if (!qualification) {
            return res.status(404).json({ message: 'Qualification not found' });
        }
        
        if (qualification.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied: Cannot update other users qualifications' });
        }
        
        const updatedQualification = await Qualification.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        
        res.json(updatedQualification);
    } catch (error) {
        console.error('Error updating qualification:', error);
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a qualification
// @route   DELETE /api/qualifications/:id
// @access  Protected
exports.deleteQualification = async (req, res) => {
    try {
        const qualification = await Qualification.findById(req.params.id);
        
        if (!qualification) {
            return res.status(404).json({ message: 'Qualification not found' });
        }
        
        if (qualification.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied: Cannot delete other users qualifications' });
        }
        
        await Qualification.findByIdAndDelete(req.params.id);
        
        res.json({ message: 'Qualification deleted successfully' });
    } catch (error) {
        console.error('Error deleting qualification:', error);
        res.status(500).json({ message: error.message });
    }
};
