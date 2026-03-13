// src/pages/ResumeAnalyzer.jsx
import React, { useState, useEffect } from 'react';
import { Upload, FileText, CheckCircle, AlertTriangle, Loader, ChevronRight, Sparkles, Target, Zap, FileSearch, ShieldCheck, Mail } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../layouts/DashboardLayout';
import SkillMatrix from '../components/SkillMatrix';
import CoverLetterModal from '../components/CoverLetterModal';

const ResumeAnalyzer = () => {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [targetCareer, setTargetCareer] = useState('');
  const [careers, setCareers] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [showCoverLetter, setShowCoverLetter] = useState(false);

  useEffect(() => {
    if (user?._id) {
      fetchCareers();
    }
  }, [user]);

  const fetchCareers = async () => {
    try {
      const res = await api.get(`/recommendations/user/${user._id}`);
      const uniqueCareers = [...new Set(res.data.map(r => r.careerSuggestion))];
      setCareers(uniqueCareers);
    } catch (error) {
      console.error('Error fetching careers:', error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      toast.error('Please upload a PDF file');
    }
  };

  const handleAnalyze = async () => {
    if (!file || !targetCareer) {
      toast.error('Please upload a resume and select a target career');
      return;
    }

    try {
      setAnalyzing(true);
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('targetCareer', targetCareer);

      const res = await api.post('/resume/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(res.data);
      toast.success('Resume analysis complete!');
    } catch (error) {
      console.error('Error analyzing resume:', error);
      const errorMsg = error.response?.data?.details || error.response?.data?.message || 'Failed to analyze resume';
      toast.error(errorMsg);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8 pb-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <FileSearch className="text-brand-500" size={24} />
              Resume Checker
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              AI feedback to help you improve your resume for the job you want.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-50 dark:bg-brand-500/10 rounded-xl border border-brand-100 dark:border-brand-500/20">
             <ShieldCheck size={14} className="text-brand-600 dark:text-brand-400" />
             <span className="text-[10px] font-bold text-brand-700 dark:text-brand-400 uppercase tracking-widest">Powered by PathFinder AI</span>
          </div>
        </div>


        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Input Configuration */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-8 shadow-sm">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                    <Target size={16} />
                  </div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Step 01: Set Target</h3>
                </div>
                <select
                  value={targetCareer}
                  onChange={(e) => setTargetCareer(e.target.value)}
                  className="w-full p-4 bg-slate-50 dark:bg-slate-800/10 border border-slate-200 dark:border-slate-800 rounded-2xl focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition text-sm font-semibold text-slate-900 dark:text-white"
                >
                  <option value="">Select a career path...</option>
                  {careers.map((career, idx) => (
                    <option key={idx} value={career}>{career}</option>
                  ))}
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="Data Scientist">Data Scientist</option>
                  <option value="Product Manager">Product Manager</option>
                </select>

              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                    <Upload size={16} />
                  </div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Step 02: Provide Resume</h3>
                </div>
                <div className="relative group">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center group-hover:bg-slate-50 dark:group-hover:bg-slate-800/20 group-hover:border-brand-500/30 transition-all">
                    <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400 group-hover:text-brand-500 transition-colors">
                      <FileText size={24} />
                    </div>
                    {file ? (
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{file.name}</p>
                        <p className="text-[10px] font-bold text-brand-500 uppercase tracking-widest">File matches profile</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Upload PDF Resume</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">Drag and drop or click to browse</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={analyzing || !file || !targetCareer}
                className="w-full py-4 bg-brand-500 text-white font-bold rounded-2xl transition-all hover:bg-brand-600 hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100 active:scale-[0.98] flex items-center justify-center gap-3 overflow-hidden group/btn"
              >
                {analyzing ? (
                  <>
                    <Loader className="animate-spin" size={20} />
                    <span className="text-sm uppercase tracking-widest">Analyzing Resume...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={20} className="group-hover/btn:scale-110 transition-transform" />
                    <span className="text-sm uppercase tracking-widest">Analyze Resume</span>
                  </>
                )}
              </button>

            </div>

            {/* Support Info */}
            <div className="p-6 bg-slate-50/50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 rounded-3xl">
               <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center flex-shrink-0">
                     <AlertTriangle size={18} className="text-amber-500" />
                  </div>
                  <div className="space-y-1 text-xs">
                     <p className="font-bold text-slate-700 dark:text-slate-200">Processing Disclaimer</p>
                     <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Ensure your PDF is text-readable for the most accurate extraction of skills and experience tokens.</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Analysis Result Output */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl min-h-[600px] shadow-sm flex flex-col overflow-hidden">
            {!result ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-300 dark:text-slate-700">
                   <Zap size={32} />
                </div>
                <div className="space-y-2">
                   <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">Ready to Analyze</h3>
                   <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[260px] leading-relaxed mx-auto italic">Upload your resume and select a path to get feedback.</p>
                </div>
              </div>

            ) : (
              <div className="p-8 md:p-10 space-y-10 animate-edu-in">
                {/* Visual Report Header */}
                <div className="flex items-center justify-between pb-10 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <svg className="w-20 h-20 transform -rotate-90">
                        <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-slate-800" />
                        <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={2 * Math.PI * 36} strokeDashoffset={2 * Math.PI * 36 * (1 - result.matchScore / 100)} className="text-brand-500 transition-all duration-1000 ease-out" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-black text-slate-900 dark:text-white">{result.matchScore}%</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-md font-bold text-slate-900 dark:text-white uppercase tracking-tight">Resume Match</h3>
                      <p className={`text-[10px] font-bold uppercase tracking-widest ${
                        result.matchScore >= 70 ? 'text-emerald-500' : 'text-amber-500'
                      }`}>
                        {result.matchScore >= 70 ? 'Strong Candidate' : 'Improvement Needed'}
                      </p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setShowCoverLetter(true)}
                    className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-md"
                  >
                    <Mail size={14} />
                    Cover Letter
                  </button>
                </div>


                {/* Justification Summary */}
                <div className="relative pl-6">
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-500/20 rounded-full" />
                   <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed italic">
                     "{result.summary}"
                   </p>
                </div>

                {/* Skill Matrix */}
                <div className="py-4">
                  <SkillMatrix 
                    strengths={result.strengths} 
                    missingSkills={result.missingSkills} 
                  />
                </div>

                {/* Tokens (Skills) Section */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                       <ShieldCheck size={14} />
                       Missing Skills
                    </h4>
                    <span className="text-[10px] font-bold text-rose-500 px-2 py-0.5 bg-rose-50 dark:bg-rose-500/10 rounded-md">Action Required</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {result.missingSkills.map((skill, idx) => (
                      <span key={idx} className="bg-white dark:bg-slate-800 border-2 border-rose-100 dark:border-rose-500/20 text-rose-500 px-3 py-1.5 rounded-xl font-bold text-[10px] uppercase tracking-widest">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Strategic Roadmap */}
                <div className="space-y-5">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <ChevronRight size={14} className="text-brand-500" />
                    How to Improve
                  </h4>
                  <div className="space-y-3">

                    {result.improvements.map((tip, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-4 bg-slate-50/50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800/50 hover:border-brand-500/20 transition-all group">
                        <div className="w-6 h-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400 group-hover:bg-brand-500 group-hover:text-white group-hover:border-brand-500 transition-all">
                           {idx + 1}
                        </div>
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                          {tip}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {showCoverLetter && result && (
        <CoverLetterModal 
          analysisId={result._id} 
          onClose={() => setShowCoverLetter(false)} 
        />
      )}
    </DashboardLayout>
  );
};

export default ResumeAnalyzer;
