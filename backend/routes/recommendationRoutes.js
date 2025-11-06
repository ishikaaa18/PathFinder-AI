const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController'); // Import the recommendation controller

// Define routes for recommendation-related operations
router.post('/', recommendationController.post);       // Create a new recommendation
router.get('/', recommendationController.get);        // Get all recommendations
router.get('/:id', recommendationController.get);     // Get a recommendation by ID
router.put('/:id', recommendationController.put);     // Update a recommendation by ID
router.delete('/:id', recommendationController.delete);  // Delete a recommendation by ID

module.exports = router;