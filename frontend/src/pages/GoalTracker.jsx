import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle, Circle, Trash2, Calendar, Target, Flag } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../services/api';
import DashboardLayout from '../layouts/DashboardLayout';

const GoalTracker = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 'Medium'
  });

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await api.get('/goals');
      setGoals(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching goals:', error);
      toast.error('Failed to load goals');
      setLoading(false);
    }
  };

  const handleAddGoal = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/goals', newGoal);
      setGoals([...goals, res.data]);
      setShowAddModal(false);
      setNewGoal({ title: '', description: '', deadline: '', priority: 'Medium' });
      toast.success('Goal added successfully! 🎯');
    } catch (error) {
      toast.error('Failed to add goal');
    }
  };

  const handleStatusUpdate = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Completed' ? 'Not Started' : 'Completed';
    try {
      // Optimistic update
      setGoals(goals.map(g => g._id === id ? { ...g, status: newStatus } : g));
      
      await api.put(`/goals/${id}`, { status: newStatus });
      if (newStatus === 'Completed') {
        toast.success('Goal completed! 🎉');
      }
    } catch (error) {
      toast.error('Failed to update status');
      fetchGoals(); // Revert on error
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this goal?')) return;
    try {
      setGoals(goals.filter(g => g._id !== id));
      await api.delete(`/goals/${id}`);
      toast.success('Goal deleted');
    } catch (error) {
      toast.error('Failed to delete goal');
      fetchGoals();
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-500 bg-red-100 dark:bg-red-900/30';
      case 'Medium': return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30';
      case 'Low': return 'text-green-500 bg-green-100 dark:bg-green-900/30';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Goal Tracker 🎯</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Set and track your career milestones</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-gradient text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
          >
            <Plus size={20} /> Add New Goal
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : goals.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <Target size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">No goals set yet</h3>
            <p className="text-gray-500 dark:text-gray-400">Start by adding your first career goal!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {goals.map((goal) => (
              <div 
                key={goal._id}
                className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md ${
                  goal.status === 'Completed' ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => handleStatusUpdate(goal._id, goal.status)}
                      className={`mt-1 transition-colors ${
                        goal.status === 'Completed' 
                          ? 'text-green-500 hover:text-green-600' 
                          : 'text-gray-300 hover:text-primary-500'
                      }`}
                    >
                      {goal.status === 'Completed' ? <CheckCircle size={24} /> : <Circle size={24} />}
                    </button>
                    <div>
                      <h3 className={`text-xl font-bold mb-1 ${
                        goal.status === 'Completed' 
                          ? 'text-gray-500 dark:text-gray-400 line-through' 
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {goal.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">{goal.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className={`px-3 py-1 rounded-full font-medium flex items-center gap-1 ${getPriorityColor(goal.priority)}`}>
                          <Flag size={12} /> {goal.priority}
                        </span>
                        <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                          <Calendar size={14} />
                          {new Date(goal.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(goal._id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-2"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Goal Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-8 shadow-2xl animate-scale-in">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add New Goal</h2>
              <form onSubmit={handleAddGoal} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    placeholder="e.g., Learn React Native"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <textarea
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                    placeholder="Details about your goal..."
                    rows="3"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deadline</label>
                    <input
                      type="date"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                      value={newGoal.deadline}
                      onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                    <select
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                      value={newGoal.priority}
                      onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value })}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-gradient text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                  >
                    Add Goal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default GoalTracker;
