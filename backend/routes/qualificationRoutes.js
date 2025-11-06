const express = require('express');
const router = express.Router();
const qualificationController = require('../controllers/qualificationController'); // Import the qualification controller

// Define the routes for the qualification resource
router.post('/', qualificationController.post);       // Create a new qualification
router.get('/', qualificationController.get);        // Get all qualifications
router.get('/:id', qualificationController.get);     // Get a qualification by ID
router.put('/:id', qualificationController.put);     // Update a qualification by ID
router.delete('/:id', qualificationController.delete);  // Delete a qualification by ID

module.exports = router;