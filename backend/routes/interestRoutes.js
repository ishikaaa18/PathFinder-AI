const express = require('express');
const router = express.Router();
const interestController = require('../controllers/interestController'); // Import the interest controller

// Define routes for interest-related operations
router.post('/', interestController.post);       // Create a new interest
router.get('/', interestController.get);        // Get all interests
router.get('/:id', interestController.get);     // Get an interest by ID
router.put('/:id', interestController.put);     // Update an interest by ID
router.delete('/:id', interestController.delete);  // Delete an interest by ID

module.exports = router;