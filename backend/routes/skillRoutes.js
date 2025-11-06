const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');
const authMiddleware = require('../middleware/authMiddleware');

// Get skills by user ID
router.get('/user/:userId', authMiddleware, skillController.getSkillsByUserId);

// CRUD operations
router.post('/', authMiddleware, skillController.createSkill);
router.get('/', authMiddleware, skillController.getAllSkills);
router.get('/:id', authMiddleware, skillController.getSkillById);
router.put('/:id', authMiddleware, skillController.updateSkill);
router.delete('/:id', authMiddleware, skillController.deleteSkill);

module.exports = router;
