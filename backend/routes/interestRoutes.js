const express = require('express');
const router = express.Router();
const interestController = require('../controllers/interestController');
const authMiddleware = require('../middleware/authMiddleware');

// Get interests by user ID
router.get('/user/:userId', authMiddleware, interestController.getInterestsByUserId);

// CRUD operations
router.post('/', authMiddleware, interestController.createInterest);
router.get('/', authMiddleware, interestController.getAllInterests);
router.get('/:id', authMiddleware, interestController.getInterestById);
router.put('/:id', authMiddleware, interestController.updateInterest);
router.delete('/:id', authMiddleware, interestController.deleteInterest);

module.exports = router;