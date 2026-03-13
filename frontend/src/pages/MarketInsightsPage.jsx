// src/pages/MarketInsightsPage.jsx
import React, { useState, useEffect } from 'react';
import { BarChart2, Briefcase, ChevronRight, Globe, TrendingUp } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import MarketInsights from '../components/MarketInsights';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const MarketInsightsPage = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
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

  const uniqueCareers = [...new Set(recommendations.map(r => r.careerSuggestion))].filter(Boolean);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8 pb-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <Globe className="text-brand-500" size={24} />
              Market Insights
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Current industry trends, salary ranges, and growth prospects.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800">
             <TrendingUp size={14} className="text-brand-600 dark:text-brand-400" />
             <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">Region: India / Global</span>
          </div>
        </div>

 
        {/* Career Selection Hub */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 shadow-sm space-y-8">
          <div className="space-y-1">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Briefcase size={14} />
              Select a Career Path
            </h2>
            <p className="text-[10px] text-slate-400">Choose a recommended career path to see specific market data.</p>
          </div>
          
          {loading ? (
             <div className="flex flex-col items-center justify-center py-12 gap-3">
               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-500"></div>
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Loading career paths...</span>
             </div>
          ) : uniqueCareers.length === 0 ? (
            <div className="py-16 text-center bg-slate-50/50 dark:bg-slate-800/20 rounded-[1.5rem] border border-dashed border-slate-200 dark:border-slate-800">
               <p className="text-xs font-medium text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                No personalized recommendations found. Generate career paths to see market data.
               </p>
               <a href="/recommendations" className="mt-6 inline-block px-5 py-2 bg-brand-500 text-white font-bold rounded-xl text-[10px] uppercase tracking-widest hover:shadow-lg transition-all">Generate Paths</a>
            </div>

          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uniqueCareers.map((career, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedRole(career)}
                  className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 group hover:scale-[1.02] ${
                    selectedRole === career 
                      ? 'bg-slate-900 border-slate-900 shadow-xl shadow-slate-900/10' 
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-brand-500/50'
                  }`}
                >
                  <span className={`font-bold text-xs uppercase tracking-tight ${selectedRole === career ? 'text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                    {career}
                  </span>
                  <div className={`p-1.5 rounded-lg transition-all ${
                    selectedRole === career ? 'bg-white/10 text-brand-400' : 'bg-slate-50 dark:bg-slate-800 text-slate-300 group-hover:text-brand-500'
                  }`}>
                    <ChevronRight size={14} />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
 
        {/* Insights Visualization Section */}
        {selectedRole && (
          <div className="animate-edu-in space-y-8 pt-8 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-brand-500/20">
                 <BarChart2 size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                   Market Data for <span className="text-brand-600 dark:text-brand-400">{selectedRole}</span>
                </h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Market Trends & Salary Range</p>

              </div>
            </div>
            
            <MarketInsights role={selectedRole} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MarketInsightsPage;
