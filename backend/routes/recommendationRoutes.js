const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');
const authMiddleware = require('../middleware/authMiddleware');

// Generate AI recommendations for a user
router.post('/generate/:userId', authMiddleware, recommendationController.generateRecommendations);

// Get recommendations by user ID
router.get('/user/:userId', authMiddleware, recommendationController.getRecommendationsByUserId);

// CRUD operations
router.post('/', authMiddleware, recommendationController.createRecommendation);
router.get('/', authMiddleware, recommendationController.getAllRecommendations);
router.get('/:id', authMiddleware, recommendationController.getRecommendationById);
router.put('/:id', authMiddleware, recommendationController.updateRecommendation);
router.delete('/:id', authMiddleware, recommendationController.deleteRecommendation);

module.exports = router;