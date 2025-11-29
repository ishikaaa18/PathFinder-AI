import React, { useState, useEffect } from 'react';
import { Map, Sparkles, AlertCircle } from 'lucide-react';
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
      // Don't show error if it's just 404 (no recommendations yet)
      if (error.response?.status !== 404) {
        toast.error('Failed to load roadmaps');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRoadmapUpdate = async (recommendationId, phaseIndex, newStatus) => {
    try {
      // Find the recommendation
      const recommendation = recommendations.find(r => r._id === recommendationId);
      if (!recommendation) return;

      // Create updated roadmap
      const updatedRoadmap = [...recommendation.roadmap];
      updatedRoadmap[phaseIndex] = { ...updatedRoadmap[phaseIndex], status: newStatus };

      // Optimistic update
      const updatedRecommendations = recommendations.map(r => 
        r._id === recommendationId ? { ...r, roadmap: updatedRoadmap } : r
      );
      setRecommendations(updatedRecommendations);

      // API call
      await api.put(`/recommendations/${recommendationId}`, {
        roadmap: updatedRoadmap
      });
      
      toast.success('Progress updated! 🚀');
    } catch (error) {
      console.error('Error updating roadmap:', error);
      toast.error('Failed to update progress');
      fetchRecommendations();
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Map className="text-blue-600 dark:text-blue-400 w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Career Roadmaps</h1>
            <p className="text-gray-600 dark:text-gray-300">Track your progress towards your dream career</p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : recommendations.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-12 text-center border border-gray-100 dark:border-gray-700">
            <Sparkles className="mx-auto text-gray-400 dark:text-gray-500 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
              No roadmaps found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Generate career recommendations in your Dashboard first to see your personalized roadmaps.
            </p>
            <a 
              href="/dashboard" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Go to Dashboard
            </a>
          </div>
        ) : (
          <div className="grid gap-8">
            {recommendations.map((rec) => (
              <div key={rec._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">{rec.careerSuggestion}</h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-600">
                    {rec.aiModelUsed}
                  </span>
                </div>
                
                <div className="p-6">
                  {(!rec.roadmap || rec.roadmap.length === 0) ? (
                    <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-4 rounded-lg">
                      <AlertCircle size={20} />
                      <p>No roadmap data available for this recommendation. Try regenerating it.</p>
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
