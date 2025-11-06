const Interest = require('../models/interest');

// @desc    Create a new interest
// @route   POST /api/interests
// @access  Protected
exports.createInterest = async (req, res) => {
    try {
        const interestData = {
            ...req.body,
            userId: req.user._id
        };
        const newInterest = new Interest(interestData);
        const savedInterest = await newInterest.save();
        res.status(201).json(savedInterest);
    } catch (error) {
        console.error('Error creating interest:', error);
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all interests
// @route   GET /api/interests
// @access  Protected
exports.getAllInterests = async (req, res) => {
    try {
        const interests = await Interest.find({ userId: req.user._id })
            .sort({ createdAt: -1 });
        res.json(interests);
    } catch (error) {
        console.error('Error fetching interests:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get interests by user ID
// @route   GET /api/interests/user/:userId
// @access  Protected
exports.getInterestsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        
        if (userId !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied: Cannot view other users interests' });
        }
        
        const interests = await Interest.find({ userId })
            .sort({ createdAt: -1 });
        
        if (!interests || interests.length === 0) {
            return res.status(404).json({ message: 'No interests found for this user' });
        }
        
        res.json(interests);
    } catch (error) {
        console.error('Error fetching user interests:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get an interest by ID
// @route   GET /api/interests/:id
// @access  Protected
exports.getInterestById = async (req, res) => {
    try {
        const interest = await Interest.findById(req.params.id);
        
        if (!interest) {
            return res.status(404).json({ message: 'Interest not found' });
        }
        
        if (interest.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied: Cannot view other users interests' });
        }
        
        res.json(interest);
    } catch (error) {
        console.error('Error fetching interest:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update an interest by ID
// @route   PUT /api/interests/:id
// @access  Protected
exports.updateInterest = async (req, res) => {
    try {
        const interest = await Interest.findById(req.params.id);
        
        if (!interest) {
            return res.status(404).json({ message: 'Interest not found' });
        }
        
        if (interest.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied: Cannot update other users interests' });
        }
        
        const updatedInterest = await Interest.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        
        res.json(updatedInterest);
    } catch (error) {
        console.error('Error updating interest:', error);
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete an interest by ID
// @route   DELETE /api/interests/:id
// @access  Protected
exports.deleteInterest = async (req, res) => {
    try {
        const interest = await Interest.findById(req.params.id);
        
        if (!interest) {
            return res.status(404).json({ message: 'Interest not found' });
        }
        
        if (interest.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied: Cannot delete other users interests' });
        }
        
        await Interest.findByIdAndDelete(req.params.id);
        
        res.json({ message: 'Interest deleted successfully' });
    } catch (error) {
        console.error('Error deleting interest:', error);
        res.status(500).json({ message: error.message });
    }
};
