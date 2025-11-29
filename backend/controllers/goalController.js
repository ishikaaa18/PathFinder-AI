const Goal = require('../models/Goal');

// @desc    Get user goals
// @route   GET /api/goals
// @access  Private
const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id }).sort({ deadline: 1 });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Set a goal
// @route   POST /api/goals
// @access  Private
const addGoal = async (req, res) => {
  if (!req.body.title || !req.body.deadline) {
    return res.status(400).json({ message: 'Please add a title and deadline' });
  }

  try {
    const goal = await Goal.create({
      user: req.user.id,
      title: req.body.title,
      description: req.body.description,
      deadline: req.body.deadline,
      priority: req.body.priority || 'Medium',
      status: 'Not Started'
    });

    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    // Check for user
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedGoal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    // Check for user
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await goal.deleteOne();

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
};
