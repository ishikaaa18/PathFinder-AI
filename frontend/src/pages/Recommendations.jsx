// src/pages/Recommendations.jsx
import React, { useState, useEffect } from 'react';
import { BookOpen, ExternalLink, Trash2 } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../layouts/DashboardLayout';

const Recommendations = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?._id) {
      fetchRecommendations();
    }
  }, [user]);

  const fetchRecommendations = async () => {
    if (!user?._id) return;
    
    try {
      setLoading(true);
      const res = await api.get(`/recommendations/user/${user._id}`);
      setRecommendations(res.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteRecommendation = async (id) => {
    if (!confirm('Are you sure you want to delete this recommendation?')) return;
    
    try {
      await api.delete(`/recommendations/${id}`);
      setRecommendations(recommendations.filter((r) => r._id !== id));
    } catch (error) {
      console.error('Error deleting recommendation:', error);
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

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Recommendations</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            View and manage all your AI-generated career recommendations
          </p>
        </div>

        {recommendations.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-12 text-center border border-gray-100 dark:border-gray-700">
            <BookOpen className="mx-auto text-gray-400 dark:text-gray-500 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
              No recommendations yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Go to the Dashboard and click "Generate Recommendations" to get started!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {recommendations.map((rec) => {
              const courses = parseCourses(rec.courseLink);
              return (
                <div
                  key={rec._id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-start justify-between bg-gradient-to-r from-primary-600 to-primary-700 p-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{rec.careerSuggestion}</h3>
                      <p className="text-primary-100 text-sm mt-1">
                        {new Date(rec.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteRecommendation(rec._id)}
                      className="text-white hover:text-red-200 transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                        Why This Career?
                      </h4>
                      <p className="text-gray-700 dark:text-gray-200 text-lg">{rec.justification}</p>
                    </div>

                    {courses.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <BookOpen size={20} />
                          Recommended Courses
                        </h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {courses.map((course, idx) => (
                            <a
                              key={idx}
                              href={ensureHttps(course.link)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 hover:bg-primary-50 dark:hover:bg-primary-900/20 px-4 py-3 rounded-lg transition group"
                            >
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-primary-700 dark:group-hover:text-primary-400">
                                {course.title}
                              </span>
                              <ExternalLink
                                size={16}
                                className="text-gray-400 group-hover:text-primary-600"
                              />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>AI Model: {rec.aiModelUsed}</span>
                      <span>Confidence: {(rec.confidenceScore * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Recommendations;
