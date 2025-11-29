// src/pages/ResumeHistory.jsx
import React, { useState, useEffect } from 'react';
import { getResumeHistory, getResumeAnalysisById } from '../services/api';
import { FileText, Calendar, ChevronRight, ArrowLeft, CheckCircle, AlertCircle, TrendingUp, Clock, Award } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';

const ResumeHistory = () => {
  const [history, setHistory] = useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getResumeHistory();
      setHistory(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load history');
      setLoading(false);
    }
  };

  const handleViewDetails = async (id) => {
    setLoading(true);
    try {
      const data = await getResumeAnalysisById(id);
      setSelectedAnalysis(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load analysis details');
      setLoading(false);
    }
  };

  const handleBack = () => {
    setSelectedAnalysis(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
      </div>
    );
  }

  if (selectedAnalysis) {
    return (
      <DashboardLayout>
        <div className="min-h-[calc(100vh-theme(spacing.32))] bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white p-4 md:p-8 rounded-2xl shadow-xl">
          <div className="max-w-5xl mx-auto space-y-6 animate-fade-in-up">
            <button 
              onClick={handleBack}
              className="flex items-center text-white/80 hover:text-white font-medium transition-colors bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-white/20"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to History
            </button>

            <div className="glass-morphism rounded-2xl p-6 md:p-8 shadow-2xl">
              {/* ... existing content ... */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-white/10 pb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="text-accent-400" size={28} />
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                      Analysis Result
                    </h1>
                  </div>
                  <p className="text-xl text-white/90">
                    Target Career: <span className="font-bold text-secondary-400">{selectedAnalysis.targetCareer}</span>
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-white/60">
                    <span className="flex items-center bg-white/5 px-3 py-1 rounded-full">
                      <Calendar size={14} className="mr-2" />
                      {new Date(selectedAnalysis.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center bg-white/5 px-3 py-1 rounded-full">
                      <Clock size={14} className="mr-2" />
                      {new Date(selectedAnalysis.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="text-right">
                    <div className="text-sm text-white/60 uppercase tracking-wider font-semibold">Match Score</div>
                    <div className={`text-4xl font-bold ${
                      selectedAnalysis.matchScore >= 70 ? 'text-green-400' :
                      selectedAnalysis.matchScore >= 40 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {selectedAnalysis.matchScore}%
                    </div>
                  </div>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${
                      selectedAnalysis.matchScore >= 70 ? 'border-green-400 text-green-400' :
                      selectedAnalysis.matchScore >= 40 ? 'border-yellow-400 text-yellow-400' : 'border-red-400 text-red-400'
                    }`}>
                    <Award size={32} />
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                    <FileText className="mr-2 text-secondary-400" /> Executive Summary
                  </h3>
                  <p className="text-white/80 leading-relaxed text-lg">{selectedAnalysis.summary}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-500/10 p-6 rounded-xl border border-green-500/20">
                    <h3 className="flex items-center text-xl font-semibold text-green-400 mb-4">
                      <CheckCircle size={24} className="mr-2" />
                      Key Strengths
                    </h3>
                    <ul className="space-y-3">
                      {selectedAnalysis.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start text-white/90 bg-green-500/10 p-3 rounded-lg">
                          <span className="mr-3 text-green-400 font-bold">•</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-500/10 p-6 rounded-xl border border-red-500/20">
                    <h3 className="flex items-center text-xl font-semibold text-red-400 mb-4">
                      <AlertCircle size={24} className="mr-2" />
                      Missing Skills
                    </h3>
                    <ul className="space-y-3">
                      {selectedAnalysis.missingSkills.map((skill, index) => (
                        <li key={index} className="flex items-start text-white/90 bg-red-500/10 p-3 rounded-lg">
                          <span className="mr-3 text-red-400 font-bold">•</span>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-500/10 p-6 rounded-xl border border-blue-500/20">
                  <h3 className="flex items-center text-xl font-semibold text-blue-400 mb-4">
                    <TrendingUp size={24} className="mr-2" />
                    Recommended Improvements
                  </h3>
                  <div className="grid gap-3">
                    {selectedAnalysis.improvements.map((improvement, index) => (
                      <div key={index} className="flex items-start text-white/90 bg-blue-500/10 p-4 rounded-lg hover:bg-blue-500/20 transition-colors">
                        <span className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-bold mr-4">
                          {index + 1}
                        </span>
                        <p className="mt-1">{improvement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-[calc(100vh-theme(spacing.32))] bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white p-4 md:p-8 rounded-2xl shadow-xl">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-4 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-secondary-200 to-white">
              Resume Analysis History
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Track your progress and review past insights to continuously improve your resume.
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-xl text-center max-w-2xl mx-auto">
              {error}
            </div>
          )}

          {history.length === 0 ? (
            <div className="text-center py-20 glass-morphism rounded-2xl animate-scale-in max-w-2xl mx-auto">
              <div className="bg-white/5 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText size={48} className="text-white/40" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No analyses yet</h3>
              <p className="text-white/60 mb-8">Upload a resume to get your first AI-powered analysis</p>
              <a href="/resume-analyzer" className="btn-gradient px-8 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all">
                Analyze New Resume
              </a>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {history.map((item, index) => (
                <div 
                  key={item._id}
                  onClick={() => handleViewDetails(item._id)}
                  className="glass-morphism rounded-xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer group card-3d border border-white/5 hover:border-white/20 relative overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <FileText size={100} />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-white/10 p-3 rounded-lg group-hover:bg-secondary-500/20 transition-colors">
                        <FileText className="text-secondary-400" size={24} />
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                        item.matchScore >= 70 ? 'bg-green-500/20 text-green-400' :
                        item.matchScore >= 40 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {item.matchScore}% Match
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-secondary-300 transition-colors">
                      {item.targetCareer}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-sm text-white/50 mb-4">
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-white/70 text-sm line-clamp-2 mb-6 h-10">
                      {item.summary}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-xs text-white/40 truncate max-w-[150px]">
                        {item.originalFilename}
                      </span>
                      <span className="flex items-center text-secondary-400 text-sm font-semibold group-hover:translate-x-1 transition-transform">
                        View Details <ChevronRight size={16} className="ml-1" />
                      </span>
                    </div>
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

export default ResumeHistory;
