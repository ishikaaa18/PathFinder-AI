const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');

// Skill routes
router.post('/', skillController.createSkill);
router.get('/', skillController.getAllSkills);
router.get('/:id', skillController.getSkillById);
router.put('/:id', skillController.updateSkill);

// ❌ If you don’t want delete now, remove it from here
// router.delete('/:id', skillController.deleteSkill);

module.exports = router;
