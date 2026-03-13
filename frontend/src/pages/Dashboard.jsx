// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, BookOpen, ExternalLink, Map, Trophy, Target, Star, ChevronRight, ArrowRight } from 'lucide-react';
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
    if (!user?._id) return;
    if (stats.skills === 0 && stats.qualifications === 0 && stats.interests === 0) {
      toast.warning('Please add skills or interests first.');
      return;
    }

    try {
      setGenerating(true);
      const res = await api.post(`/recommendations/generate/${user._id}`);
      setRecommendations(res.data.recommendations);
      toast.success('Career paths generated! 🚀');
    } catch (error) {
      console.error('Error generating recommendations:', error);
      toast.error('Failed to update path.');
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

  const ensureHttps = (url) => {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.startsWith('//')) return `https:${url}`;
    return `https://${url}`;
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
      await api.put(`/recommendations/${recommendationId}`, { roadmap: updatedRoadmap });
      toast.success('Saved successfully.');
    } catch (error) {
      toast.error('Save failed.');
      fetchRecommendations();
    }
  };

  const cardColors = ['yellow', 'purple', 'blue'];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-edu-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <h1 className="text-lg font-black tracking-tight uppercase text-slate-800 dark:text-white">My Dashboard</h1>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{user?.firstName}</span>
          </div>
          <button
            onClick={generateRecommendations}
            disabled={generating}
            className="px-4 py-1.5 bg-brand-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center gap-2 hover:brightness-105 transition-all shadow-sm"
          >
            {generating ? (
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
            ) : <Sparkles size={14} />}
            Update My Path
          </button>
        </div>


        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {[
            { label: 'Skills', value: stats.skills, icon: Trophy, color: 'brand' },
            { label: 'Degree', value: stats.qualifications, icon: Target, color: 'emerald' },
            { label: 'Matches', value: recommendations.length, icon: Sparkles, color: 'blue' }
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 p-3 sm:p-4 rounded-2xl flex items-center gap-2 sm:gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${stat.color}-500/10 text-${stat.color}-500`}>
                <stat.icon size={16} />
              </div>
              <div>
                <p className="text-sm font-black text-slate-800 dark:text-white leading-none">{stat.value}</p>
                <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400 mt-1">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Career Paths Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-3 bg-brand-500 rounded-full" />
            <h2 className="text-[10px] font-black tracking-widest uppercase text-slate-400">Recommended Careers</h2>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-500"></div>
            </div>
          ) : recommendations.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 p-12 text-center space-y-4 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm">
               <div className="w-12 h-12 bg-brand-500/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Sparkles className="text-brand-500" size={24} />
               </div>
               <div className="space-y-1">
                 <h3 className="text-sm font-extrabold dark:text-white uppercase tracking-tight">No Paths Saved</h3>
                 <p className="text-slate-500 dark:text-slate-400 font-semibold max-w-xs mx-auto text-[10px]">Update your profile to see recommendations.</p>
               </div>
               <button onClick={generateRecommendations} className="btn-edu text-[9px] py-2 px-6 shadow-none mt-2">Generate Now</button>
            </div>
          ) : (
            <div className="grid gap-4">
              {recommendations.slice(0, 2).map((rec, index) => {
                const courses = parseCourses(rec.courseLink);
                return (
                  <div key={rec._id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl overflow-hidden p-6">
                    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                         {/* Left Side: Career Info */}
                         <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-3">
                               <div className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-widest rounded-full border border-emerald-500/10">
                                  Best Fit
                               </div>
                               <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Match Score: {(rec.confidenceScore * 100).toFixed(0)}%</span>
                            </div>
                            
                            <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight leading-tight">
                               {rec.careerSuggestion}
                            </h3>
                            
                            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic border-l-2 border-brand-500/10 pl-4 py-0.5 text-xs truncate max-w-xl">
                               Why this: "{rec.justification}"
                            </p>


                            <MarketInsights role={rec.careerSuggestion} />
                         </div>

                         {/* Right Side: Quick Specs */}
                         <div className="lg:w-64 space-y-4">
                            {courses.length > 0 && (
                               <div className="space-y-2">
                                  <h4 className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Resources</h4>
                                  <div className="space-y-1">
                                     {courses.slice(0, 2).map((course, idx) => (
                                      <a
                                        key={idx}
                                        href={ensureHttps(course.link)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between bg-slate-50 dark:bg-white/5 px-3 py-2 rounded-xl border border-transparent hover:border-brand-500/10 transition-all text-[10px] font-bold text-slate-600 dark:text-slate-300"
                                      >
                                        <span className="truncate pr-2">{course.title}</span>
                                        <ExternalLink size={10} className="flex-shrink-0 opacity-40" />
                                      </a>
                                    ))}
                                  </div>
                               </div>
                            )}

                            <button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-brand-500 hover:text-white transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2">
                               Start Path <ArrowRight size={12} />
                            </button>
                         </div>
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
