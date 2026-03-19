// src/pages/JobOpeningsPage.jsx
import React, { useState, useEffect } from 'react';
import { Briefcase, ExternalLink, Globe, Target } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const JobOpeningsPage = () => {
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
      setRecommendations(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const getJobSearchUrl = (role, platform) => {
    const query = encodeURIComponent(role);
    switch (platform) {
      case 'linkedin':
        return `https://www.linkedin.com/jobs/search/?keywords=${query}`;
      case 'naukri':
        return `https://www.naukri.com/${role.toLowerCase().replace(/[^a-z0-9]/g, '-')}-jobs`;
      case 'indeed':
      default:
        return `https://www.indeed.com/jobs?q=${query}`;
    }
  };

  const uniqueCareers = [...new Set(recommendations.map(r => r.careerSuggestion))].filter(Boolean);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-edu-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <Briefcase className="text-brand-500" size={24} />
              Active Job Openings
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Direct access to live job listings tailored to your recommended career paths.
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 shadow-sm space-y-8">
          {loading ? (
             <div className="flex flex-col items-center justify-center py-12 gap-3">
               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-500"></div>
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Loading roles...</span>
             </div>
          ) : uniqueCareers.length === 0 ? (
            <div className="py-16 text-center bg-slate-50/50 dark:bg-slate-800/20 rounded-[1.5rem] border border-dashed border-slate-200 dark:border-slate-800">
               <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-slate-400 mb-4">
                  <Target size={32} />
               </div>
               <p className="text-xs font-medium text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                 No personalized recommendations found. Generate career paths to match with active job openings.
               </p>
               <a href="/recommendations" className="mt-6 inline-block px-5 py-2.5 bg-brand-500 text-white font-bold rounded-xl text-xs uppercase tracking-widest hover:shadow-lg transition-all">Generate Paths</a>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {uniqueCareers.map((career, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 hover:border-brand-500/50 hover:bg-white dark:hover:bg-slate-800/40 transition-all duration-300 gap-6"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Target size={12}/> Recommended Match</span>
                    <h2 className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-white">
                      {career}
                    </h2>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <a href={getJobSearchUrl(career, 'linkedin')} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0077b5]/10 text-[#0077b5] hover:bg-[#0077b5] hover:text-white rounded-xl text-xs font-bold transition-all border border-[#0077b5]/20 hover:shadow-md">
                      LinkedIn <ExternalLink size={14} />
                    </a>
                    <a href={getJobSearchUrl(career, 'indeed')} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600/10 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white rounded-xl text-xs font-bold transition-all border border-blue-600/20 hover:shadow-md">
                      Indeed <ExternalLink size={14} />
                    </a>
                    <a href={getJobSearchUrl(career, 'naukri')} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white rounded-xl text-xs font-bold transition-all border border-emerald-600/20 hover:shadow-md">
                      Naukri <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobOpeningsPage;
