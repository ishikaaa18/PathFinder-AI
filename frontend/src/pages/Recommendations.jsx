// src/pages/Recommendations.jsx
import React, { useState, useEffect } from 'react';
import { BookOpen, ExternalLink, Trash2, Lightbulb, Zap, ChevronRight, Bookmark, Filter, Download, History, Award, Terminal, Star } from 'lucide-react';
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
    if (!confirm('Confirm removal of this trajectory from archive?')) return;
    try {
      await api.delete(`/recommendations/${id}`);
      setRecommendations(recommendations.filter((r) => r._id !== id));
    } catch (error) {
      console.error('Error deleting recommendation:', error);
    }
  };

  const parseCourses = (courseLink) => {
    try {
      if (!courseLink) return [];
      // Handle array or JSON string
      if (typeof courseLink === 'string') {
        const parsed = JSON.parse(courseLink);
        return Array.isArray(parsed) ? parsed : [];
      }
      return Array.isArray(courseLink) ? courseLink : [];
    } catch {
      return [];
    }
  };

  const ensureHttps = (url) => {
    if (!url) return '#';
    // Remove potential redundant characters from model output
    const cleanUrl = url.trim().replace(/^'|'$/g, '').replace(/^"|"$/g, '');
    if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) return cleanUrl;
    if (cleanUrl.startsWith('//')) return `https:${cleanUrl}`;
    return `https://${cleanUrl}`;
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-32">
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
              <History className="text-brand-500" size={24} />
              Career Paths
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              A history of your recommended career paths.
            </p>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-widest gap-2">
                <Terminal size={12} />
                Saved Paths
             </div>
          </div>
        </div>

        {recommendations.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-24 text-center space-y-6 shadow-sm">
            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-slate-300 dark:text-slate-700">
              <Zap size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">No Paths Saved</h3>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                No career paths saved yet. Upload your resume or take a quiz to see recommendations.
              </p>
            </div>
            <a href="/dashboard" className="inline-flex items-center px-6 py-2.5 bg-brand-500 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all hover:shadow-lg active:scale-95">
              Start Analysis
            </a>
          </div>

        ) : (
          <div className="grid gap-6">
            {recommendations.map((rec) => {
              const courses = parseCourses(rec.courseLink);
              return (
                <div
                  key={rec._id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group flex flex-col"
                >
                 <div className="p-5 sm:p-8 flex flex-col sm:flex-row md:flex-row gap-6 sm:gap-8">
                    {/* Trajectory Scoring */}
                    <div className="flex md:flex-col items-center justify-between md:justify-start gap-4 md:w-28">
                       <div className="w-20 h-20 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex flex-col items-center justify-center text-slate-900 dark:text-white border border-slate-100 dark:border-slate-800 group-hover:border-brand-500/30 transition-colors shadow-inner">
                          <span className="text-xl font-black leading-none italic">{(rec.confidenceScore * 100).toFixed(0)}%</span>
                          <span className="text-[8px] font-bold uppercase tracking-widest mt-1.5 text-slate-400">Match Score</span>
                       </div>
                       <div className="flex md:flex-col gap-2">
                          <div className="w-10 h-10 rounded-xl bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-center text-slate-300 transition-colors group-hover:text-brand-500">
                             <Award size={18} />
                          </div>
                          <button
                            onClick={() => deleteRecommendation(rec._id)}
                            className="w-10 h-10 rounded-xl bg-slate-50/50 dark:bg-slate-800/30 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-500 flex items-center justify-center text-slate-300 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                       </div>
                    </div>


                    {/* Core Intelligence */}
                    <div className="flex-1 space-y-6">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-[9px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 rounded-lg border border-brand-100 dark:border-brand-500/20 shadow-sm">
                            {(rec.aiModelUsed || 'AI Analysis').split('-')[0]} v2.0
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                            Generated on: {new Date(rec.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-brand-600 transition-colors">
                          {rec.careerSuggestion}
                        </h3>
                      </div>


                      <div className="relative pl-6">
                        <div className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-slate-100 dark:bg-slate-800 rounded-full" />
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium italic">
                          "{rec.justification}"
                        </p>
                      </div>

                      {courses.length > 0 && (
                        <div className="pt-2 space-y-4">
                          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <BookOpen size={14} className="text-brand-500" />
                            Recommended Courses
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {courses.map((course, idx) => (
                              <a
                                key={idx}
                                href={ensureHttps(course.link)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-brand-500/40 transition-all group/link"
                              >
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate pr-4">
                                  {course.title || course.name}
                                </span>
                                <ExternalLink size={14} className="text-slate-300 dark:text-slate-600 group-hover/link:text-brand-500 transition-colors flex-shrink-0" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contextual Footer */}
                  <div className="px-8 py-5 bg-slate-50/50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                     <div className="flex items-center gap-5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full border border-emerald-500 flex items-center justify-center">
                              <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                           </div>
                           Path Verified
                        </div>
                        <div className="flex items-center gap-2">
                           <Lightbulb size={12} className="text-amber-500" />
                           Best Fit
                        </div>
                     </div>
                     <a href="/roadmap" className="text-[10px] font-bold text-brand-500 uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all group-hover:text-brand-600">
                        See Roadmap <ChevronRight size={14} />
                     </a>
                  </div>

                </div>
              );
            })}
            {/* Featured Career Courses */}
            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-3 px-2">
                 <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
                    <Star size={16} />
                 </div>
                 <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">Featured Career Courses</h2>
              </div>
 
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                 {[
                   {
                     title: 'IBM DevOps & Software Engineering',
                     platform: 'Coursera',
                     link: 'https://www.coursera.org/professional-certificates/devops-and-software-engineering',
                     desc: 'Comprehensive certificate for full-stack and DevOps roles.'
                   },
                   {
                     title: 'Harvard Data Science Professional',
                     platform: 'edX',
                     link: 'https://www.edx.org/certificates/professional-certificate/harvardx-data-science',
                     desc: 'Deep foundation in R, statistics, and machine learning.'
                   },
                   {
                     title: 'IBM Data Science Professional',
                     platform: 'Coursera',
                     link: 'https://www.coursera.org/professional-certificates/ibm-data-science',
                     desc: 'Industry-recognized path for entering Data Science.'
                   },
                   {
                     title: 'Complete Software Engineering',
                     platform: 'Udemy',
                     link: 'https://www.udemy.com/course/software-engineering-course-for-beginners-to-advanced-level/',
                     desc: 'Full lifecycle and industry standards simplified.'
                   }
                 ].map((course, idx) => (
                   <a 
                     key={idx} 
                     href={course.link} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-brand-500/30 hover:shadow-xl transition-all duration-300 group"
                   >
                     <div className="space-y-4">
                        <div className="flex items-center justify-between">
                           <span className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest border border-slate-100 dark:border-slate-700">{course.platform}</span>
                           <ExternalLink size={14} className="text-slate-300 group-hover:text-brand-500 transition-colors" />
                        </div>
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors leading-snug">{course.title}</h3>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                           {course.desc}
                        </p>
                     </div>
                     <div className="mt-6 flex items-center text-[9px] font-black uppercase tracking-widest text-brand-500 gap-2">
                        View Course <ChevronRight size={12} />
                     </div>
                   </a>
                 ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Recommendations;
