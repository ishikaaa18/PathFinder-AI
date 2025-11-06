const express = require('express');
const router = express.Router();
const Interest = require('../models/interest'); // Import the Interest model

// 1. Create a new interest (POST /api/interests)
router.post('/', async (req, res) => {
    try {
        const newInterest = new Interest(req.body);
        const savedInterest = await newInterest.save();
        res.status(201).json(savedInterest); // 201 Created
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message }); // 400 Bad Request
    }
});

// 2. Get all interests (GET /api/interests)
router.get('/', async (req, res) => {
    try {
        const interests = await Interest.find().populate('userId', 'username email'); // Populate user data
        res.json(interests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message }); // 500 Internal Server Error
    }
});

// 3. Get an interest by ID (GET /api/interests/:id)
router.get('/:id', async (req, res) => {
    try {
        const interest = await Interest.findById(req.params.id).populate('userId', 'username email'); // Populate user data
        if (!interest) {
            return res.status(404).json({ message: 'Interest not found' }); // 404 Not Found
        }
        res.json(interest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// 4. Update an interest by ID (PUT /api/interests/:id)
router.put('/:id', async (req, res) => {
    try {
        const updatedInterest = await Interest.findByIdAndUpdate(req.params.id, req.body, { new: true }); // new: true returns the updated document
        if (!updatedInterest) {
            return res.status(404).json({ message: 'Interest not found' });
        }
        res.json(updatedInterest);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message }); // 400 Bad Request
    }
});

// 5. Delete an interest by ID (DELETE /api/interests/:id)
router.delete('/:id', async (req, res) => {
    try {
        const deletedInterest = await Interest.findByIdAndDelete(req.params.id);
        if (!deletedInterest) {
            return res.status(404).json({ message: 'Interest not found' });
        }
        res.json({ message: 'Interest deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;