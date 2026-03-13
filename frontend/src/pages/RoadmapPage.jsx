// src/pages/RoadmapPage.jsx
import React, { useState, useEffect } from 'react';
import { Map, Sparkles, AlertCircle, Compass, History, Target } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../layouts/DashboardLayout';
import Roadmap from '../components/Roadmap';

const RoadmapPage = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?._id) {
      fetchRecommendations();
    }
  }, [user]);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/recommendations/user/${user._id}`);
      setRecommendations(res.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      if (error.response?.status !== 404) {
        toast.error('Failed to load roadmaps');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRoadmapUpdate = async (recommendationId, phaseIndex, newStatus) => {
    try {
      const recommendation = recommendations.find(r => r._id === recommendationId);
      if (!recommendation) return;

      const updatedRoadmap = [...recommendation.roadmap];
      updatedRoadmap[phaseIndex] = { ...updatedRoadmap[phaseIndex], status: newStatus };

      const updatedRecommendations = recommendations.map(r => 
        r._id === recommendationId ? { ...r, roadmap: updatedRoadmap } : r
      );
      setRecommendations(updatedRecommendations);

      await api.put(`/recommendations/${recommendationId}`, {
        roadmap: updatedRoadmap
      });
      
      toast.success('Progress updated!');
    } catch (error) {
      console.error('Error updating roadmap:', error);
      toast.error('Failed to update progress');
      fetchRecommendations();
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8 pb-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <Compass className="text-brand-500" size={24} />
              Career Roadmaps
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Step-by-step guides to help you reach your career goals.
            </p>

          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-2">
              <History size={14} />
              View History
            </button>
          </div>
        </div>

        {recommendations.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-20 text-center space-y-6 shadow-sm">
            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
               <Target size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Roadmap Found</h3>

              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Generate a career recommendation first to unlock your personalized roadmap.
              </p>
            </div>
            <a href="/dashboard" className="inline-flex items-center px-6 py-2.5 bg-brand-500 text-white font-bold rounded-xl text-sm transition-all hover:shadow-lg active:scale-95">
              Launch Dashboard
            </a>
          </div>
        ) : (
          <div className="grid gap-12">
            {recommendations.map((rec) => (
              <div key={rec._id} className="space-y-6">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-500">
                      <Target size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">{rec.careerSuggestion}</h2>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          ID: {rec._id.slice(-8)}
                        </span>

                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-500">
                          Model: {rec.aiModelUsed?.split('-')[0] || 'Neural'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 lg:p-12 shadow-sm transition-all duration-300">
                  {(!rec.roadmap || rec.roadmap.length === 0) ? (
                    <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-500 text-sm font-medium">
                      <AlertCircle size={20} className="flex-shrink-0 text-amber-500" />
                      <p>Loading roadmap details. Please refresh or regenerate if it doesn't appear.</p>

                    </div>
                  ) : (
                    <Roadmap 
                      roadmap={rec.roadmap} 
                      onUpdateStatus={(phaseIndex, newStatus) => 
                        handleRoadmapUpdate(rec._id, phaseIndex, newStatus)
                      }
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default RoadmapPage;
