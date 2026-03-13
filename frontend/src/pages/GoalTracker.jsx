// src/pages/GoalTracker.jsx
import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle, Circle, Trash2, Calendar, Target, Flag, Loader, X } from 'lucide-react';
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
      toast.success('Goal added!');
    } catch (error) {
      toast.error('Failed to add goal');
    }
  };

  const handleStatusUpdate = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Completed' ? 'Not Started' : 'Completed';
    try {
      setGoals(goals.map(g => g._id === id ? { ...g, status: newStatus } : g));
      await api.put(`/goals/${id}`, { status: newStatus });
      if (newStatus === 'Completed') {
        toast.success('Goal completed!');
      }
    } catch (error) {
      toast.error('Failed to update status');
      fetchGoals();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this goal?')) return;
    try {
      setGoals(goals.filter(g => g._id !== id));
      await api.delete(`/goals/${id}`);
      toast.success('Goal removed');
    } catch (error) {
      toast.error('Failed to delete goal');
      fetchGoals();
    }
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'High': return 'text-rose-500 bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20';
      case 'Medium': return 'text-amber-500 bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20';
      case 'Low': return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20';
      default: return 'text-slate-500 bg-slate-50 border-slate-100';
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8 pb-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <Target className="text-brand-500" size={24} />
              My Goals
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Set and track your career goals.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-sm font-bold transition-all hover:bg-slate-800 dark:hover:bg-slate-100 active:scale-95 border border-slate-800 dark:border-white"
          >
            <Plus size={18} /> 
            Add Goal
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
          </div>
        ) : goals.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-24 text-center space-y-6 shadow-sm">
            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-slate-300 dark:text-slate-700">
               <Target size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">No Goals Yet</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto font-medium leading-relaxed">You haven't added any goals yet. Start by adding your first goal.</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-6 py-2.5 bg-brand-500 text-white font-bold rounded-xl text-sm transition-all hover:shadow-lg active:scale-95"
            >
              Add Goal
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {goals.map((goal) => (
              <div 
                key={goal._id}
                className={`bg-white dark:bg-slate-900 p-6 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:shadow-md group ${
                  goal.status === 'Completed' ? 'opacity-60 grayscale-[0.2]' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-5 flex-1 min-w-0">
                    <button
                      onClick={() => handleStatusUpdate(goal._id, goal.status)}
                      className={`mt-1 flex-shrink-0 transition-all active:scale-90 ${
                        goal.status === 'Completed' 
                          ? 'text-emerald-500' 
                          : 'text-slate-200 dark:text-slate-700 hover:text-brand-500'
                      }`}
                    >
                      {goal.status === 'Completed' ? <CheckCircle size={24} /> : <Circle size={24} />}
                    </button>
                    <div className="flex-1 min-w-0 space-y-1">
                      <h3 className={`text-lg font-bold truncate transition-colors ${
                        goal.status === 'Completed' 
                          ? 'text-slate-400 dark:text-slate-500 line-through' 
                          : 'text-slate-900 dark:text-white group-hover:text-brand-600'
                      }`}>
                        {goal.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {goal.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 pt-3">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 border ${getPriorityStyles(goal.priority)}`}>
                          <Flag size={12} strokeWidth={2.5} /> 
                          {goal.priority}
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
                          <Calendar size={12} strokeWidth={2.5} className="text-slate-300" />
                          {new Date(goal.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(goal._id)}
                    className="text-slate-300 dark:text-slate-700 hover:text-rose-500 transition-colors p-2 flex-shrink-0 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Unified Modal System */}
        {showAddModal && (
          <div className="fixed inset-0 bg-slate-950/40 z-[100] flex items-center justify-center p-4 backdrop-blur-md animate-edu-in">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-lg overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl animate-scale-in">
              <div className="p-8 pb-0 flex justify-between items-center">
                 <div className="space-y-1">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Add New Goal</h2>
                    <p className="text-xs text-slate-500">Set your next career milestone.</p>
                 </div>
                 <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400">
                    <X size={20} />
                 </button>
              </div>

              <form onSubmit={handleAddGoal} className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Goal Title</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition"
                      value={newGoal.title}
                      onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                      placeholder="e.g., Master Predictive Analysis Frameworks"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Goal Details</label>
                    <textarea
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition"
                      value={newGoal.description}
                      onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                      placeholder="Add secondary objectives or success metrics..."
                      rows="3"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Target Date</label>
                      <input
                        type="date"
                        required
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:border-brand-500 outline-none transition"
                        value={newGoal.deadline}
                        onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Priority</label>
                      <select
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:border-brand-500 outline-none transition appearance-none"
                        value={newGoal.priority}
                        onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value })}
                      >
                        <option value="Low">Low Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="High">High Priority</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-3 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold rounded-2xl text-xs uppercase tracking-widest transition-all hover:bg-slate-100 dark:hover:bg-slate-750"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl text-xs uppercase tracking-widest transition-all hover:bg-slate-800 dark:hover:bg-slate-100 shadow-lg shadow-slate-900/10"
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
