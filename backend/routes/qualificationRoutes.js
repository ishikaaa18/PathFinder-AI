const express = require('express');
const router = express.Router();
const qualificationController = require('../controllers/qualificationController');
const authMiddleware = require('../middleware/authMiddleware');

// Get qualifications by user ID
router.get('/user/:userId', authMiddleware, qualificationController.getQualificationsByUserId);

// CRUD operations
router.post('/', authMiddleware, qualificationController.createQualification);
router.get('/', authMiddleware, qualificationController.getAllQualifications);
router.get('/:id', authMiddleware, qualificationController.getQualificationById);
router.put('/:id', authMiddleware, qualificationController.updateQualification);
router.delete('/:id', authMiddleware, qualificationController.deleteQualification);

module.exports = router;