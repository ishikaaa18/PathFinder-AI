const express = require('express');
const router = express.Router();
const Qualification = require('../models/qualification'); // Import the Qualification model

// Get all qualifications, populating the associated user data
router.get('/', async (req, res) => {
    try {
        const qualifications = await Qualification.find().populate('userId', 'username email'); // Populate the 'userId' field and select only 'username' and 'email' fields from the User
        res.json(qualifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Get a qualification by ID, populating the associated user data
router.get('/:id', async (req, res) => {
    try {
        const qualification = await Qualification.findById(req.params.id).populate('userId', 'username email');
        if (!qualification) {
            return res.status(404).json({ message: 'Qualification not found' });
        }
        res.json(qualification);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// ... other CRUD operations (create, update, delete) ...

module.exports = router;