// src/components/MarketInsights.jsx
import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Briefcase, BarChart2, MapPin, Search, Star, Loader2, Info } from 'lucide-react';
import api from '../services/api';

const MarketInsights = ({ role }) => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (role) {
      fetchInsights();
    } else {
      setLoading(false);
    }
  }, [role]);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.post('/insights/generate', { role });
      setInsights(res.data);
    } catch (err) {
      console.error('Error fetching insights:', err);
      setError(err.response?.data?.error || 'Market data unavailable.');
    } finally {
      setLoading(false);
    }
  };


  const formatSalary = (salaryStr) => {
    if (!salaryStr) return '';
    // Ensure only one Rupee symbol at the start if it already exists
    return salaryStr.trim().startsWith('₹') ? salaryStr.trim() : `₹${salaryStr.trim()}`;
  };

  if (loading) {
    return (
      <div className="bg-slate-50 dark:bg-slate-800/20 rounded-[2.5rem] p-20 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-brand-500" size={32} />
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Loading Market Data...</p>
      </div>
    );
  }


  if (error || !insights || !insights.salary || !insights.topSkills) {
    return (
      <div className="p-8 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-3xl border border-rose-100 dark:border-rose-500/20 flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
        <Info size={18} />
        System Alert: {error || 'Data packet corruption detected.'}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-edu-in">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Salary Matrix */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-2 mb-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <DollarSign size={14} className="text-brand-500" /> 
            Salary Range
          </div>

          
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Entry Level</p>
                 <p className="text-2xl font-bold text-slate-900 dark:text-white">{formatSalary(insights.salary.entry)}</p>
              </div>
              <div className="text-right space-y-1">
                 <p className="text-[10px] font-bold text-brand-500 uppercase tracking-widest">Experienced</p>
                 <p className="text-3xl font-black text-brand-500">{formatSalary(insights.salary.mid)}</p>
              </div>
            </div>

            
            {/* Visual Bar */}
            <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
               <div className="h-full bg-brand-500 w-2/3 rounded-full" />
            </div>
          </div>
        </div>
 
        {/* Market Dynamics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-amber-50 dark:bg-amber-500/5 p-6 rounded-[2rem] border border-amber-100 dark:border-amber-500/10 flex flex-col justify-between">
            <p className="text-[10px] text-amber-600 dark:text-amber-400 uppercase tracking-widest font-bold">Demand Index</p>
            <div className="space-y-1 pt-4">
               <p className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{insights.demandLevel}</p>
               <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className={`h-1 w-4 rounded-full ${i <= 4 ? 'bg-amber-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                  ))}
               </div>
            </div>
          </div>
          
           <div className="bg-emerald-50 dark:bg-emerald-500/5 p-6 rounded-[2rem] border border-emerald-100 dark:border-emerald-500/10 flex flex-col justify-between">
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-bold">Growth Rate</p>
            <div className="space-y-1 pt-4">
               <p className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{insights.growth}</p>
               <TrendingUp size={20} className="text-emerald-500" />
            </div>
          </div>

        </div>
      </div>
 
      {/* Skill Priority Matrix */}
      <div className="bg-slate-50 dark:bg-slate-800/20 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
         <div className="flex items-center gap-2 mb-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <Star size={14} className="text-brand-500" /> 
            Required Skills
          </div>

          <div className="flex flex-wrap gap-3">
            {insights.topSkills.map((skill, i) => (
              <div key={i} className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center gap-2 group hover:border-brand-500 transition-colors shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-tight">{skill}</span>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default MarketInsights;
