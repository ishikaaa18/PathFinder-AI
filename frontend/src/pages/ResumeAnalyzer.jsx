import React, { useState, useEffect } from 'react';
import { Upload, FileText, CheckCircle, AlertTriangle, Loader, ChevronRight } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../layouts/DashboardLayout';

const ResumeAnalyzer = () => {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [targetCareer, setTargetCareer] = useState('');
  const [careers, setCareers] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (user?._id) {
      fetchCareers();
    }
  }, [user]);

  const fetchCareers = async () => {
    try {
      const res = await api.get(`/recommendations/user/${user._id}`);
      // Extract unique career titles
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
      toast.success('Resume analysis complete! 🎉');
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
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <FileText className="text-purple-600 dark:text-purple-400 w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Resume Analyzer</h1>
            <p className="text-gray-600 dark:text-gray-300">Get personalized feedback to match your dream job</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">1. Select Target Career</h3>
              <select
                value={targetCareer}
                onChange={(e) => setTargetCareer(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">-- Choose a career path --</option>
                {careers.map((career, idx) => (
                  <option key={idx} value={career}>{career}</option>
                ))}
                <option value="Software Engineer">Software Engineer (General)</option>
                <option value="Data Scientist">Data Scientist (General)</option>
                <option value="Product Manager">Product Manager (General)</option>
              </select>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">2. Upload Resume (PDF)</h3>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors relative">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="mx-auto text-gray-400 dark:text-gray-500 mb-3" size={32} />
                {file ? (
                  <p className="text-purple-600 dark:text-purple-400 font-medium">{file.name}</p>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">Drag & drop or click to upload PDF</p>
                )}
              </div>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={analyzing || !file || !targetCareer}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {analyzing ? (
                <>
                  <Loader className="animate-spin" /> Analyzing...
                </>
              ) : (
                <>
                  <Sparkles size={20} /> Analyze Resume
                </>
              )}
            </button>
          </div>

          {/* Results Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden min-h-[500px]">
            {!result ? (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center text-gray-400 dark:text-gray-500">
                <FileText size={64} className="mb-4 opacity-20" />
                <p>Upload your resume and select a career to see AI insights here.</p>
              </div>
            ) : (
              <div className="p-6 space-y-6 animate-fadeIn">
                {/* Score Header */}
                <div className="text-center pb-6 border-b border-gray-100 dark:border-gray-700">
                  <div className="relative w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="60"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-100 dark:text-gray-700"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="60"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={377}
                        strokeDashoffset={377 - (377 * result.matchScore) / 100}
                        className={`text-purple-600 dark:text-purple-400 transition-all duration-1000 ease-out`}
                      />
                    </svg>
                    <span className="absolute text-3xl font-bold text-gray-800 dark:text-white">{result.matchScore}%</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">Match Score</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">{result.summary}</p>
                </div>

                {/* Missing Skills */}
                <div>
                  <h4 className="font-semibold text-red-500 mb-3 flex items-center gap-2">
                    <AlertTriangle size={18} /> Missing Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.missingSkills.map((skill, idx) => (
                      <span key={idx} className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium border border-red-100">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Improvements */}
                <div>
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2">
                    <CheckCircle size={18} /> Recommended Improvements
                  </h4>
                  <ul className="space-y-3">
                    {result.improvements.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700 dark:text-gray-200 text-sm bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <ChevronRight className="text-blue-500 dark:text-blue-400 min-w-[16px] mt-0.5" size={16} />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

// Add simple Sparkles component locally if not imported
const Sparkles = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

export default ResumeAnalyzer;
