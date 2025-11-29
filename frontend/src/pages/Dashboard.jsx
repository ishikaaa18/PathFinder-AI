// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, BookOpen, ExternalLink, Map } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../layouts/DashboardLayout';
import Roadmap from '../components/Roadmap';
import MarketInsights from '../components/MarketInsights';

const Dashboard = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [stats, setStats] = useState({ skills: 0, qualifications: 0, interests: 0 });

  useEffect(() => {
    if (user?._id) {
      fetchRecommendations();
      fetchStats();
    }
  }, [user]);

  const fetchRecommendations = async () => {
    if (!user?._id) return;
    
    try {
      setLoading(true);
      const res = await api.get(`/recommendations/user/${user._id}`);
      setRecommendations(Array.isArray(res.data) ? res.data : []);
      console.log('Fetched recommendations:', res.data); // Debug log
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    if (!user?._id) return;
    
    try {
      const [skills, quals, interests] = await Promise.all([
        api.get(`/skills/user/${user._id}`).catch(() => ({ data: [] })),
        api.get(`/qualifications/user/${user._id}`).catch(() => ({ data: [] })),
        api.get(`/interests/user/${user._id}`).catch(() => ({ data: [] })),
      ]);
      setStats({
        skills: (skills.data || []).length,
        qualifications: (quals.data || []).length,
        interests: (interests.data || []).length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const generateRecommendations = async () => {
    if (!user?._id) {
      alert('User not found. Please log in again.');
      return;
    }
    
    if (stats.skills === 0 && stats.qualifications === 0 && stats.interests === 0) {
      alert('Please add at least one skill, qualification, or interest before generating recommendations.');
      return;
    }

    try {
      setGenerating(true);
      const res = await api.post(`/recommendations/generate/${user._id}`);
      setRecommendations(res.data.recommendations);
      console.log('Generated recommendations:', res.data.recommendations); // Debug log
      toast.success('🎯 AI recommendations generated successfully!');
    } catch (error) {
      console.error('Error generating recommendations:', error);
      const errorMsg = error.response?.data?.message || 'Failed to generate recommendations';
      toast.error(errorMsg);
      alert(errorMsg);
    } finally {
      setGenerating(false);
    }
  };

  const parseCourses = (courseLink) => {
    try {
      return JSON.parse(courseLink);
    } catch {
      return [];
    }
  };

  // Helper function to ensure URL has proper protocol
  const ensureHttps = (url) => {
    if (!url) return '#';
    // If URL already has a protocol, return as is
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    // If URL starts with //, add https:
    if (url.startsWith('//')) {
      return `https:${url}`;
    }
    // Otherwise, add https:// prefix
    return `https://${url}`;
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
      // Revert on error (could be improved by refetching)
      fetchRecommendations();
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.firstName}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Here are your personalized career recommendations
            </p>
          </div>
          <button
            onClick={generateRecommendations}
            disabled={generating}
            className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {generating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Generate Recommendations
              </>
            )}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/50 dark:to-primary-800/50 rounded-2xl p-6 border border-primary-200 dark:border-primary-700">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-primary-700 dark:text-primary-300 font-medium">Skills</p>
                <p className="text-3xl font-bold text-primary-900 dark:text-white">{stats.skills}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-900/50 dark:to-secondary-800/50 rounded-2xl p-6 border border-secondary-200 dark:border-secondary-700">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary-600 rounded-lg flex items-center justify-center">
                <BookOpen className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-secondary-700 dark:text-secondary-300 font-medium">Qualifications</p>
                <p className="text-3xl font-bold text-secondary-900 dark:text-white">{stats.qualifications}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-900/50 dark:to-accent-800/50 rounded-2xl p-6 border border-accent-200 dark:border-accent-700">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent-600 rounded-lg flex items-center justify-center">
                <Sparkles className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-accent-700 dark:text-accent-300 font-medium">Recommendations</p>
                <p className="text-3xl font-bold text-accent-900 dark:text-white">{recommendations.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Career Paths</h2>
          
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : recommendations.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-12 text-center border border-gray-100 dark:border-gray-700">
              <Sparkles className="mx-auto text-gray-400 dark:text-gray-500 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
                No recommendations yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Add your skills, qualifications, and interests, then click "Generate Recommendations"
                to get AI-powered career suggestions.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((rec) => {
                const courses = parseCourses(rec.courseLink);
                return (
                  <div
                    key={rec._id}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
                  >
                    <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6">
                      <h3 className="text-xl font-bold text-white">{rec.careerSuggestion}</h3>
                      <p className="text-primary-100 text-sm mt-1">AI Model: {rec.aiModelUsed}</p>
                    </div>
                    
                    <div className="p-6">
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{rec.justification}</p>
                      
                      {courses.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <BookOpen size={18} />
                            Recommended Courses
                          </h4>
                          <div className="space-y-2">
                             {courses.map((course, idx) => (
                              <a
                                key={idx}
                                href={ensureHttps(course.link)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 hover:bg-primary-50 dark:hover:bg-primary-900/30 px-4 py-3 rounded-lg transition group border border-gray-100 dark:border-gray-600"
                              >
                                <span className="text-sm text-gray-700 dark:text-gray-200 group-hover:text-primary-700 dark:group-hover:text-primary-400">
                                  {course.title}
                                </span>
                                <ExternalLink size={16} className="text-gray-400 group-hover:text-primary-600 dark:text-gray-500 dark:group-hover:text-primary-400" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Roadmap Section */}
                      {rec.roadmap && rec.roadmap.length > 0 && (
                        <Roadmap 
                          roadmap={rec.roadmap} 
                          onUpdateStatus={(phaseIndex, newStatus) => 
                            handleRoadmapUpdate(rec._id, phaseIndex, newStatus)
                          }
                        />
                      )}

                      {/* Market Insights Section */}
                      <MarketInsights role={rec.careerSuggestion} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
