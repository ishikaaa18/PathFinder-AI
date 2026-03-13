// src/pages/SkillQuiz.jsx
import React, { useState, useEffect } from 'react';
import { Award, BookOpen, Brain, Briefcase, Target, Compass, Star, ChevronRight, Zap, GraduationCap, ShieldCheck } from 'lucide-react';
import api from '../services/api';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import QuizModal from '../components/QuizModal';

const SkillQuiz = () => {
  const { user } = useAuth();
  const [skills, setSkills] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    if (user?._id) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [skillsRes, recsRes] = await Promise.all([
        api.get(`/skills/user/${user._id}`).catch(() => ({ data: [] })),
        api.get(`/recommendations/user/${user._id}`).catch(() => ({ data: [] }))
      ]);
      setSkills(skillsRes.data || []);
      setRecommendations(Array.isArray(recsRes.data) ? recsRes.data : []);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    } finally {
      setLoading(false);
    }
  };

  const careerPaths = [...new Set(recommendations.map(r => r.careerSuggestion))].filter(Boolean);
  const skillGaps = [...new Set(recommendations.flatMap(r => r.skillGaps || []))].filter(Boolean);

  const startQuiz = (topic) => {
    setSelectedTopic(topic);
    // Scroll to top so the overlay is visible immediately without scrolling
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-12 pb-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <GraduationCap className="text-brand-500" size={24} />
              Skill Center
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Take quizzes to test your skills and improve your profile.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-50 dark:bg-brand-500/10 rounded-xl border border-brand-100 dark:border-brand-500/20">
             <ShieldCheck size={14} className="text-brand-600 dark:text-brand-400" />
             <span className="text-[10px] font-bold text-brand-700 dark:text-brand-400 uppercase tracking-widest">Quiz Mode Enabled</span>
          </div>
        </div>

 
        {loading ? (
          <div className="flex justify-center py-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
          </div>
        ) : (
          <div className="space-y-16 animate-edu-in">
            
            {/* 1. Career Readiness Quizzes */}
            {careerPaths.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-500">
                        <Briefcase size={16} />
                     </div>
                     <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">Career Quizzes</h2>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {careerPaths.map((career, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group">
                      <div className="space-y-4">
                         <div className="flex items-center justify-between">
                            <span className="bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest border border-brand-100 dark:border-brand-500/20">Quiz</span>
                            <Zap size={16} className="text-slate-300 dark:text-slate-700" />
                         </div>
                         <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors">{career}</h3>
                         <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed italic">
                            Test your readiness for a career as a {career}.
                         </p>
                      </div>

                      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                         <button
                           onClick={() => startQuiz(`Readiness for ${career}`)}
                           className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                         >
                           Start Quiz
                         </button>
                         <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
 
            {/* 2. Skill Gaps Quizzes */}
            {skillGaps.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center gap-3 px-2">
                   <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-500">
                      <Target size={16} />
                   </div>
                   <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">Quick Quizzes</h2>
                </div>
 
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {skillGaps.map((gap, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => startQuiz(gap)}
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl hover:border-brand-500/30 hover:shadow-md transition-all cursor-pointer group flex items-center gap-4"
                    >
                      <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                         <Brain size={16} />
                      </div>
                      <div className="min-w-0 pr-2">
                         <h3 className="font-bold text-xs text-slate-800 dark:text-slate-200 truncate uppercase tracking-tight">{gap}</h3>
                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Start Now</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
   
            {/* 3. Existing Skills Verification */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 px-2">
                 <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-500">
                    <Award size={16} />
                 </div>
                 <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">Skill Verification</h2>
              </div>
 
              {skills.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-20 text-center space-y-4">
                  <BookOpen size={48} className="mx-auto text-slate-200 dark:text-slate-800" />
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">No skills yet. Update your profile to start verification quizzes.</p>
                  <a href="/profile" className="inline-block px-5 py-2 bg-brand-500 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all hover:shadow-lg active:scale-95">Update Profile</a>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {skills.map((skill, idx) => (
                    <div key={skill._id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all group overflow-hidden flex flex-col">
                       <div className="flex-1 p-6 space-y-6">
                          <div className="flex justify-between items-start">
                             <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 transition-colors group-hover:bg-brand-500/10 group-hover:text-brand-500">
                                <Award size={20} />
                             </div>
                             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                          </div>
                          <div className="space-y-1">
                             <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 truncate">{skill.skillName}</h3>
                             <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Current Level: {skill.proficiencyLevel}</p>
                          </div>
                       </div>
                       <button
                         onClick={() => startQuiz(skill.skillName)}
                         className="mx-6 mb-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl text-[10px] font-bold uppercase tracking-widest group-hover:bg-slate-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-slate-900 transition-all"
                       >
                         Start Quiz
                       </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
            
            {/* 4. Featured Verified Courses */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 px-2">
                 <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
                    <BookOpen size={16} />
                 </div>
                 <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">Featured Courses</h2>
              </div>
 
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                 {[
                   {
                     title: 'IBM DevOps & Software Engineering',
                     platform: 'Coursera',
                     link: 'https://www.coursera.org/professional-certificates/devops-and-software-engineering',
                     desc: 'Comprehensive certificate for full-stack and DevOps roles.',
                     color: 'brand'
                   },
                   {
                     title: 'Harvard Data Science Professional',
                     platform: 'edX',
                     link: 'https://www.edx.org/certificates/professional-certificate/harvardx-data-science',
                     desc: 'Deep foundation in R, statistics, and machine learning.',
                     color: 'edu-purple'
                   },
                   {
                     title: 'IBM Data Science Professional',
                     platform: 'Coursera',
                     link: 'https://www.coursera.org/professional-certificates/ibm-data-science',
                     desc: 'Industry-recognized path for entering Data Science.',
                     color: 'edu-blue'
                   },
                   {
                     title: 'Complete Software Engineering',
                     platform: 'Udemy',
                     link: 'https://www.udemy.com/course/software-engineering-course-for-beginners-to-advanced-level/',
                     desc: 'Full lifecycle and industry standards simplified.',
                     color: 'edu-yellow'
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
                           <div className="text-slate-300 group-hover:text-brand-500 transition-colors">
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                           </div>
                        </div>
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors leading-snug">{course.title}</h3>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                           {course.desc}
                        </p>
                     </div>
                     <div className="mt-6 flex items-center text-[9px] font-black uppercase tracking-widest text-brand-500 gap-2">
                        Explore Course <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                     </div>
                   </a>
                 ))}
              </div>
            </section>
            
          </div>
        )}

      </div>
    </DashboardLayout>

    {/* Rendered outside DashboardLayout so fixed positioning works against true viewport */}
    {selectedTopic && (
      <QuizModal 
        skill={selectedTopic} 
        onClose={() => setSelectedTopic(null)} 
      />
    )}
    </>
  );
};

export default SkillQuiz;
