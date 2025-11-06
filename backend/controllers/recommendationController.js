const express = require('express');
const router = express.Router();
const Recommendation = require('../models/recommendation'); // Import the Recommendation model

// 1. Create a new recommendation (POST /api/recommendations)
router.post('/', async (req, res) => {
    try {
        const newRecommendation = new Recommendation(req.body);
        const savedRecommendation = await newRecommendation.save();
        res.status(201).json(savedRecommendation); // 201 Created
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message }); // 400 Bad Request
    }
});

// 2. Get all recommendations (GET /api/recommendations)
router.get('/', async (req, res) => {
    try {
        const recommendations = await Recommendation.find().populate('userId', 'username email'); // Populate user data
        res.json(recommendations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
});

// 3. Get a recommendation by ID (GET /api/recommendations/:id)
router.get('/:id', async (req, res) => {
    try {
        const recommendation = await Recommendation.findById(req.params.id).populate('userId', 'username email'); // Populate user data
        if (!recommendation) {
            return res.status(404).json({ message: 'Recommendation not found' }); // 404 Not Found
        }
        res.json(recommendation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// 4. Update a recommendation by ID (PUT /api/recommendations/:id)
router.put('/:id', async (req, res) => {
    try {
        const updatedRecommendation = await Recommendation.findByIdAndUpdate(req.params.id, req.body, { new: true }); // new: true returns the updated document
        if (!updatedRecommendation) {
            return res.status(404).json({ message: 'Recommendation not found' });
        }
        res.json(updatedRecommendation);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message }); // 400 Bad Request
    }
});

// 5. Delete a recommendation by ID (DELETE /api/recommendations/:id)
router.delete('/:id', async (req, res) => {
    try {
        const deletedRecommendation = await Recommendation.findByIdAndDelete(req.params.id);
        if (!deletedRecommendation) {
            return res.status(404).json({ message: 'Recommendation not found' });
        }
        res.json({ message: 'Recommendation deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;