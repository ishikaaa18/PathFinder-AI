const express = require('express');
const router = express.Router();
const {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalController');
const authMiddleware = require('../middleware/authMiddleware');

router.route('/').get(authMiddleware, getGoals).post(authMiddleware, addGoal);
router.route('/:id').put(authMiddleware, updateGoal).delete(authMiddleware, deleteGoal);

module.exports = router;
