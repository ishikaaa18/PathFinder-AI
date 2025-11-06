const Recommendation = require('../models/recommendation');
const User = require('../models/user');
const Skill = require('../models/skill');
const Qualification = require('../models/qualification');
const Interest = require('../models/interest');
const { generateCareerRecommendations } = require('../services/geminiAIService');

// @desc    Create a new recommendation manually
// @route   POST /api/recommendations
// @access  Protected
exports.createRecommendation = async (req, res) => {
    try {
        const recommendationData = {
            ...req.body,
            userId: req.user._id
        };
        const newRecommendation = new Recommendation(recommendationData);
        const savedRecommendation = await newRecommendation.save();
        res.status(201).json(savedRecommendation);
    } catch (error) {
        console.error('Error creating recommendation:', error);
        res.status(400).json({ message: error.message });
    }
};

// @desc    Generate AI-powered career recommendations
// @route   POST /api/recommendations/generate/:userId
// @access  Protected
exports.generateRecommendations = async (req, res) => {
    try {
        const { userId } = req.params;
        
        if (userId !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied: Cannot generate recommendations for other users' });
        }

        // Validate user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch user data
        const skills = await Skill.find({ userId });
        const qualifications = await Qualification.find({ userId });
        const interests = await Interest.find({ userId });

        // Validate that user has provided sufficient data
        if (skills.length === 0 && qualifications.length === 0 && interests.length === 0) {
            return res.status(400).json({ 
                message: 'Insufficient data. Please add your skills, qualifications, or interests first.' 
            });
        }

        // Prepare user data for AI
        const userData = {
            skills,
            qualifications,
            interests,
            user: {
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        };

        // Generate recommendations using Gemini AI
        const aiResponse = await generateCareerRecommendations(userData);

        // Save recommendations to database
        const savedRecommendations = [];
        if (aiResponse.recommendations && Array.isArray(aiResponse.recommendations)) {
            for (const rec of aiResponse.recommendations) {
                const recommendation = new Recommendation({
                    userId,
                    careerSuggestion: rec.career,
                    justification: rec.explanation,
                    courseLink: rec.courses ? JSON.stringify(rec.courses) : null,
                    aiModelUsed: 'Gemini Pro',
                    confidenceScore: rec.confidence || 0.85,
                    skillGaps: rec.skillGaps || []
                });
                const saved = await recommendation.save();
                savedRecommendations.push(saved);
            }
        }

        res.status(201).json({
            message: 'Career recommendations generated successfully',
            recommendations: savedRecommendations,
            aiResponse
        });
    } catch (error) {
        console.error('Error generating recommendations:', error);
        res.status(500).json({ 
            message: 'Failed to generate recommendations', 
            error: error.message 
        });
    }
};

// @desc    Get all recommendations
// @route   GET /api/recommendations
// @access  Protected
exports.getAllRecommendations = async (req, res) => {
    try {
        const recommendations = await Recommendation.find({ userId: req.user._id })
            .sort({ createdAt: -1 });
        res.json(recommendations);
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get recommendations by user ID
// @route   GET /api/recommendations/user/:userId
// @access  Protected
exports.getRecommendationsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        
        if (userId !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied: Cannot view other users recommendations' });
        }
        
        const recommendations = await Recommendation.find({ userId })
            .sort({ createdAt: -1 });
        
        if (!recommendations || recommendations.length === 0) {
            return res.status(404).json({ message: 'No recommendations found for this user' });
        }
        
        res.json(recommendations);
    } catch (error) {
        console.error('Error fetching user recommendations:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get a recommendation by ID
// @route   GET /api/recommendations/:id
// @access  Protected
exports.getRecommendationById = async (req, res) => {
    try {
        const recommendation = await Recommendation.findById(req.params.id);
        
        if (!recommendation) {
            return res.status(404).json({ message: 'Recommendation not found' });
        }
        
        if (recommendation.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied: Cannot view other users recommendations' });
        }
        
        res.json(recommendation);
    } catch (error) {
        console.error('Error fetching recommendation:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a recommendation by ID
// @route   PUT /api/recommendations/:id
// @access  Protected
exports.updateRecommendation = async (req, res) => {
    try {
        const recommendation = await Recommendation.findById(req.params.id);
        
        if (!recommendation) {
            return res.status(404).json({ message: 'Recommendation not found' });
        }
        
        if (recommendation.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied: Cannot update other users recommendations' });
        }
        
        const updatedRecommendation = await Recommendation.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        
        res.json(updatedRecommendation);
    } catch (error) {
        console.error('Error updating recommendation:', error);
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a recommendation by ID
// @route   DELETE /api/recommendations/:id
// @access  Protected
exports.deleteRecommendation = async (req, res) => {
    try {
        const recommendation = await Recommendation.findById(req.params.id);
        
        if (!recommendation) {
            return res.status(404).json({ message: 'Recommendation not found' });
        }
        
        if (recommendation.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied: Cannot delete other users recommendations' });
        }
        
        await Recommendation.findByIdAndDelete(req.params.id);
        
        res.json({ message: 'Recommendation deleted successfully' });
    } catch (error) {
        console.error('Error deleting recommendation:', error);
        res.status(500).json({ message: error.message });
    }
};
