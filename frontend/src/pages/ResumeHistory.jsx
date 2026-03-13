// src/pages/ResumeHistory.jsx
import React, { useState, useEffect } from 'react';
import { getResumeHistory, getResumeAnalysisById } from '../services/api';
import { FileText, Calendar, ChevronRight, ArrowLeft, CheckCircle, AlertCircle, TrendingUp, Clock, Award, Zap, History, Target, ShieldCheck, Mail } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import SkillMatrix from '../components/SkillMatrix';
import CoverLetterModal from '../components/CoverLetterModal';

const ResumeHistory = () => {
  const [history, setHistory] = useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCoverLetter, setShowCoverLetter] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getResumeHistory();
      setHistory(data);
    } catch (err) {
      setError('Failed to load history.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (id) => {
    setLoading(true);
    try {
      const data = await getResumeAnalysisById(id);
      setSelectedAnalysis(data);
    } catch (err) {
      setError('Failed to load analysis details.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setSelectedAnalysis(null);
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

  if (selectedAnalysis) {
    return (
      <DashboardLayout>
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
          {/* Detailed View Header */}
          <div className="flex items-center justify-between">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              <ArrowLeft size={16} /> 
              Back to History
            </button>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowCoverLetter(true)}
                className="flex items-center gap-2 px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-lg"
              >
                <Mail size={14} />
                Generate Cover Letter
              </button>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-50 dark:bg-brand-500/10 rounded-xl border border-brand-100 dark:border-brand-500/20">
                 <ShieldCheck size={14} className="text-brand-600 dark:text-brand-400" />
                 <span className="text-[10px] font-bold text-brand-700 dark:text-brand-400 uppercase tracking-widest">Verified History</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-sm overflow-hidden animate-edu-in">
            {/* Context Header */}
            <div className="p-8 md:p-12 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-brand-500 uppercase tracking-widest">Target Career</p>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">{selectedAnalysis.targetCareer}</h1>
                  </div>
                  <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span className="flex items-center gap-2">
                      <Calendar size={14} className="text-slate-300" />
                      {new Date(selectedAnalysis.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock size={14} className="text-slate-300" />
                      {new Date(selectedAnalysis.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm">
                  <div className="text-right space-y-0.5">
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Match Score</p>
                    <p className={`text-3xl font-black ${
                      selectedAnalysis.matchScore >= 70 ? 'text-brand-500' :
                      selectedAnalysis.matchScore >= 40 ? 'text-amber-500' : 'text-rose-500'
                    }`}>
                      {selectedAnalysis.matchScore}%
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      selectedAnalysis.matchScore >= 70 ? 'bg-brand-500/10 text-brand-500' :
                      selectedAnalysis.matchScore >= 40 ? 'bg-amber-500/10 text-amber-500' : 'bg-rose-500/10 text-rose-500'
                    }`}>
                    <Award size={24} />
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis Content */}
            <div className="p-8 md:p-12 space-y-12">
              <div className="grid lg:grid-cols-5 gap-12">
                <div className="lg:col-span-3 space-y-12">
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-500 rounded-full" />
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <FileText className="text-brand-500" size={14} /> 
                      AI Summary
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm font-medium italic">{selectedAnalysis.summary}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-6 bg-slate-50 dark:bg-slate-800/10 rounded-3xl border border-slate-100 dark:border-slate-800">
                      <h3 className="text-[10px] font-bold text-slate-400 mb-6 uppercase tracking-widest flex items-center gap-2">
                        <CheckCircle className="text-emerald-500" size={16} /> 
                        Your Strengths
                      </h3>
                      <div className="space-y-3">
                        {selectedAnalysis.strengths.map((strength, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/50 text-xs font-semibold text-slate-600 dark:text-slate-400 italic">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                            {strength}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 bg-slate-50 dark:bg-slate-800/10 rounded-3xl border border-slate-100 dark:border-slate-800">
                      <h3 className="text-[10px] font-bold text-slate-400 mb-6 uppercase tracking-widest flex items-center gap-2">
                        <AlertCircle className="text-rose-500" size={16} /> 
                        Missing Skills
                      </h3>
                      <div className="space-y-3">
                        {selectedAnalysis.missingSkills.map((skill, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/50 text-xs font-semibold text-slate-600 dark:text-slate-400 italic">
                            <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <SkillMatrix 
                    strengths={selectedAnalysis.strengths} 
                    missingSkills={selectedAnalysis.missingSkills} 
                  />
                </div>
              </div>

              <div className="p-8 bg-slate-900 dark:bg-slate-950 rounded-[2rem] shadow-xl">
                <h3 className="text-[10px] font-bold text-brand-500 mb-8 uppercase tracking-widest flex items-center gap-2">
                   <TrendingUp size={18} /> 
                   Evolutionary Directives
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedAnalysis.improvements.map((improvement, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all group">
                      <div className="flex-shrink-0 w-8 h-8 bg-brand-500 text-white rounded-xl flex items-center justify-center font-bold text-xs">
                        {index + 1}
                      </div>
                      <p className="text-xs text-slate-300 font-medium leading-relaxed group-hover:text-white transition-colors">
                        {improvement}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {showCoverLetter && (
          <CoverLetterModal 
            analysisId={selectedAnalysis._id} 
            onClose={() => setShowCoverLetter(false)} 
          />
        )}
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
              Resume History
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              A history of your previous resume analyses.
            </p>
          </div>
          <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400">
             <Target size={20} />
          </div>
        </div>

        {error && (
          <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 p-4 rounded-xl text-xs font-bold uppercase tracking-widest text-center">
            {error}
          </div>
        )}

        {history.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-20 text-center space-y-6 shadow-sm">
            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-slate-300 dark:text-slate-700">
              <Zap size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">Empty History</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto font-medium">No previous scans found. Start by analyzing a resume.</p>
            </div>
            <a href="/resume-analyzer" className="inline-flex items-center px-6 py-2.5 bg-brand-500 text-white font-bold rounded-xl text-sm transition-all hover:shadow-lg active:scale-95">
              Start Analysis
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((item) => (
              <div 
                key={item._id}
                onClick={() => handleViewDetails(item._id)}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl hover:border-brand-500/50 hover:shadow-xl cursor-pointer group transition-all duration-300 overflow-hidden shadow-sm flex flex-col"
              >
                <div className="p-6 space-y-6 flex-1">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-brand-500 group-hover:text-white transition-all">
                      <FileText size={20} />
                    </div>
                    <div className="px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-700 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      {item.matchScore}% Match
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white transition-colors line-clamp-1">
                      {item.targetCareer}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <Calendar size={12} strokeWidth={2.5} />
                      {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>

                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-3 font-medium italic">
                    {item.summary}
                  </p>
                </div>

                <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate max-w-[120px]">
                     {item.originalFilename}
                   </span>
                   <div className="flex items-center gap-1 text-brand-500 font-bold text-[10px] uppercase tracking-widest group-hover:gap-2 transition-all">
                      View Analysis <ChevronRight size={14} />
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ResumeHistory;
