import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, ArrowRight, Brain, Target, Zap, TrendingUp, Users, Award, 
  Star, LayoutDashboard, User, Lightbulb, Map, FileText, CheckCircle, 
  Gamepad2, Trophy, Sword, Scroll, BookOpen, Search, BarChart2, ShieldCheck, ChevronRight, Menu, X
} from 'lucide-react';

const Home = () => {
  const containerRef = useRef(null);
  const [activeIdx, setActiveIdx] = React.useState(0);
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    }
  };

  return (
    <div className="min-h-screen bg-edu-bg dark:bg-slate-950 overflow-hidden text-edu-border dark:text-slate-100 selection:bg-brand-500 selection:text-white pb-20 transition-colors duration-300" ref={containerRef}>
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 lg:pt-24 pb-12 sm:pb-16 lg:pb-24 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border-[1.5px] border-edu-border dark:border-slate-800 shadow-sm text-[10px] font-black uppercase tracking-widest text-brand-500">
             <Star size={16} className="fill-brand-500" />
             <span>AI-Powered Career Assistant</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white">
            Design Your <br />
            <span className="text-brand-500 decoration-brand-500/10 underline underline-offset-8">Growth Path</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed font-semibold">
            Analyze your resume, identify skill gaps, and explore AI career paths. Navigate the professional landscape with confidence.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
             <div className="relative group flex-1 max-w-md">
                <div className="absolute inset-y-0 left-4 flex items-center text-slate-400 group-focus-within:text-brand-500 transition-colors">
                   <Search size={20} />
                </div>
                <input 
                  type="text" 
                  placeholder="Master your career path..." 
                  className="w-full pl-12 pr-6 py-4 bg-white dark:bg-slate-900 border-[1.5px] border-edu-border dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-500/10 transition-all font-semibold placeholder:text-slate-300 shadow-sm"
                />
             </div>
             <Link to="/register" className="btn-edu flex items-center justify-center gap-3 text-sm sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                Get Started <ArrowRight size={20} />
             </Link>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 sm:pt-6 text-slate-400 font-bold text-xs uppercase tracking-widest">
             <div className="flex -space-x-3">
                {[...Array(4)].map((_, i) => (
                   <div key={i} className={`w-8 h-8 rounded-full border-2 border-white dark:border-slate-950 bg-edu-${['yellow', 'purple', 'blue', 'yellow'][i]} flex items-center justify-center text-[10px] text-edu-dark font-black shadow-md`}>
                      {String.fromCharCode(65 + i)}
                   </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-950 bg-brand-500 flex items-center justify-center text-[8px] text-white font-black shadow-md">+9.5k</div>
             </div>
             <span>Active Intelligence Network</span>
          </motion.div>
        </motion.div>

        {/* Hero Visual - AI Intelligence Portal Mockup */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:h-[600px] flex items-center justify-center mt-4 lg:mt-0"
        >
           {/* Main Glassmorphic Terminal */}
           <div className="relative z-10 w-full max-w-lg bg-white/70 dark:bg-slate-900/80 backdrop-blur-2xl border-[1.5px] border-edu-border/10 dark:border-slate-800 rounded-[2.5rem] sm:rounded-[3.5rem] p-6 sm:p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden">
              <div className="flex items-center justify-between mb-10">
                 <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-brand-500 animate-pulse"></div>
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-800 dark:text-slate-200">AI Explorer</h3>
                 </div>
                 <div className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[8px] font-black uppercase tracking-widest">v2.0 Beta</div>
              </div>

              {/* Dynamic Carousel Content */}
              <div className="h-[400px] relative">
                <div className="h-full">
                  {/* Slide 1: Market Potency */}
                  {activeIdx === 0 && (
                    <motion.div 
                      key="market"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                       <div className="p-5 sm:p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden group">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 rounded-full blur-3xl"></div>
                         <div className="relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-400 mb-2">Market Demand</p>
                             <div className="text-3xl sm:text-5xl font-black mb-6 tracking-tighter">94.8<span className="text-xl text-white/40 ml-1">%</span></div>
                            <div className="flex gap-1 h-12 items-end mb-6">
                               {[40, 70, 45, 90, 65, 80, 55, 95].map((h, i) => (
                                  <div key={i} className="flex-1 bg-white/20 rounded-t-sm" style={{ height: `${h}%` }} />
                               ))}
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/50">
                               <span>Quarterly Growth</span>
                               <span className="text-brand-400">+12.4%</span>
                            </div>
                         </div>
                      </div>
                      <div className="flex items-center gap-4 p-5 rounded-3xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 shadow-sm">
                         <div className="w-10 h-10 rounded-2xl bg-edu-purple flex items-center justify-center">
                            <Brain size={20} className="text-edu-dark" />
                         </div>
                         <div>
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Neural Extract</p>
                            <h4 className="text-xs font-black uppercase text-slate-800 dark:text-white">AI Architecture Proficient</h4>
                         </div>
                         <div className="ml-auto w-2 h-2 rounded-full bg-green-500"></div>
                      </div>
                    </motion.div>
                  )}

                  {/* Slide 2: Skill Assessment */}
                  {activeIdx === 1 && (
                    <motion.div 
                      key="skills"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                       <div className="p-5 sm:p-8 rounded-[2.5rem] bg-brand-500 text-white relative overflow-hidden group">
                         <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                         <div className="relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-2">Skill Checker</p>
                             <div className="text-2xl sm:text-4xl font-black mb-6 tracking-tighter uppercase">Improvement Hub</div>
                            <div className="space-y-3">
                               {['Python Skills', 'AI Design', 'Logic'].map((skill, i) => (
                                  <div key={i} className="space-y-1">
                                     <div className="flex justify-between text-[8px] font-black uppercase">
                                        <span>{skill}</span>
                                        <span>{95 - (i * 15)}%</span>
                                     </div>
                                     <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-white" style={{ width: `${95 - (i * 15)}%` }}></div>
                                     </div>
                                  </div>
                               ))}
                            </div>
                         </div>
                      </div>
                      <div className="flex items-center gap-4 p-5 rounded-3xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 shadow-sm">
                         <div className="w-10 h-10 rounded-2xl bg-edu-blue flex items-center justify-center">
                            <Zap size={20} className="text-edu-dark" />
                         </div>
                         <div>
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Sync Priority</p>
                            <h4 className="text-xs font-black uppercase text-slate-800 dark:text-white">Cloud Scalar Scaling</h4>
                         </div>
                         <div className="ml-auto w-2 h-2 rounded-full bg-brand-500 animate-ping"></div>
                      </div>
                    </motion.div>
                  )}

                  {/* Slide 3: Growth Trajectory */}
                  {activeIdx === 2 && (
                    <motion.div 
                      key="growth"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                       <div className="p-5 sm:p-8 rounded-[2.5rem] bg-edu-purple text-edu-dark relative overflow-hidden group">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-full blur-2xl"></div>
                         <div className="relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-edu-dark/60 mb-2">Salary Growth</p>
                             <div className="text-3xl sm:text-5xl font-black mb-6 tracking-tighter text-edu-dark">₹12.4<span className="text-xl opacity-40 ml-1">L avg</span></div>
                            <div className="flex items-center gap-3 py-3 px-4 bg-white/40 rounded-2xl border border-black/5">
                               <TrendingUp size={16} className="text-edu-dark" />
                               <span className="text-[10px] font-black uppercase tracking-widest">+22% Annual Growth</span>
                            </div>
                         </div>
                      </div>
                      <div className="flex items-center gap-4 p-5 rounded-3xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 shadow-sm">
                         <div className="w-10 h-10 rounded-2xl bg-edu-yellow flex items-center justify-center">
                            <Award size={20} className="text-edu-dark" />
                         </div>
                         <div>
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Next Milestone</p>
                            <h4 className="text-xs font-black uppercase text-slate-800 dark:text-white">Senior Vector Architect</h4>
                         </div>
                         <div className="ml-auto w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Carousel Indicators */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                   {[0, 1, 2].map(i => (
                      <div 
                        key={i} 
                        className={`h-1.5 rounded-full transition-all duration-500 ${activeIdx === i ? 'w-8 bg-brand-500' : 'w-2 bg-slate-200 dark:bg-slate-700'}`}
                      />
                   ))}
                </div>
              </div>

              {/* Background Glow */}
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-500/10 rounded-full blur-[100px] z-0"></div>
           </div>

           {/* Decorative Orbitals */}
           <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-[120%] h-[120%] border border-slate-200 dark:border-white/5 rounded-full z-0 pointer-events-none"
           >
              <div className="absolute top-1/4 -left-2 w-4 h-4 rounded-full bg-brand-200 dark:bg-brand-500/20 blur-sm"></div>
              <div className="absolute bottom-1/4 -right-2 w-6 h-6 rounded-full bg-edu-purple/30 blur-sm"></div>
           </motion.div>
        </motion.div>
      </section>


      {/* Intelligence Inventory - Interactive Premium Carousel */}
      <section id="features" className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
         {/* Artistic Background Elements */}
         <div className="absolute top-1/2 -left-20 w-96 h-96 bg-brand-500/10 rounded-full blur-[120px] pointer-events-none"></div>
         
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 lg:mb-24 relative z-10">
            <div className="space-y-4">
               <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-edu-border/10 dark:border-slate-800 shadow-sm text-[10px] font-black uppercase tracking-[0.25em] text-brand-500"
               >
                  <Sparkles size={14} />
                  <span>Our Features</span>
               </motion.div>
               <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight text-slate-900 dark:text-white leading-none">
                  Feature <span className="text-brand-500">List</span>
               </h2>
            </div>
            
            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs max-w-sm">
               Explore our suite of AI-powered modules designed to accelerate your professional growth.
            </p>
         </div>

         {/* Carousel Container - Animated Marquee */}
         <div className="relative flex overflow-hidden group">
            <div className="flex gap-8 px-4 whitespace-nowrap animate-marquee-slow pause-on-hover">
               {[
                  { title: 'Resume Insight', color: 'bg-edu-yellow', icon: Brain, desc: 'AI analysis of your resume to help you grow your career.', longDesc: 'Our advanced AI breaks down your experience into key skills and market-relevant keywords.', path: '/resume-analyzer' },
                  { title: 'Success Map', color: 'bg-edu-purple', icon: Map, desc: 'Visual career paths based on real-world expert data.', longDesc: 'Track your progress across 500+ unique career paths with AI-generated milestones.', path: '/roadmap' },
                  { title: 'Market Trends', color: 'bg-edu-blue', icon: BarChart2, desc: 'Real-time market insights to give you a competitive edge.', longDesc: 'Daily updates on hiring trends, salary shifts, and required technologies in your sector.', path: '/market-insights' },
                  { title: 'Assessment', color: 'bg-edu-yellow', icon: Trophy, desc: 'AI technical tests to verify your skills and expertise.', longDesc: 'Verify your claims with technical challenges that adapt to your target career.', path: '/skill-quiz' },
                  { title: 'Skill Finder', color: 'bg-edu-purple', icon: Lightbulb, desc: 'Discover hidden skills that work across different industries.', longDesc: 'Our cross-domain mapping identifies non-obvious strengths that make you a unique candidate.', path: '/dashboard' },
                  { title: 'Career Pulse', color: 'bg-edu-blue', icon: Users, desc: 'Connect with mentors and peers along similar career paths.', longDesc: 'Intelligent matching based on career goals, skill gaps, and professional background.', path: '/dashboard' },
                  // Duplicate for seamless loop
                  { title: 'Resume Insight', color: 'bg-edu-yellow', icon: Brain, desc: 'AI analysis of your resume to help you grow your career.', longDesc: 'Our advanced AI breaks down your experience into key skills and market-relevant keywords.', path: '/resume-analyzer' },
                  { title: 'Success Map', color: 'bg-edu-purple', icon: Map, desc: 'Visual career paths based on real-world expert data.', longDesc: 'Track your progress across 500+ unique career paths with AI-generated milestones.', path: '/roadmap' },
                  { title: 'Market Trends', color: 'bg-edu-blue', icon: BarChart2, desc: 'Real-time market insights to give you a competitive edge.', longDesc: 'Daily updates on hiring trends, salary shifts, and required technologies in your sector.', path: '/market-insights' },
                  { title: 'Assessment', color: 'bg-edu-yellow', icon: Trophy, desc: 'AI technical tests to verify your skills and expertise.', longDesc: 'Verify your claims with technical challenges that adapt to your target career.', path: '/skill-quiz' },
                  { title: 'Skill Finder', color: 'bg-edu-purple', icon: Lightbulb, desc: 'Discover hidden skills that work across different industries.', longDesc: 'Our cross-domain mapping identifies non-obvious strengths that make you a unique candidate.', path: '/dashboard' },
                  { title: 'Career Pulse', color: 'bg-edu-blue', icon: Users, desc: 'Connect with mentors and peers along similar career paths.', longDesc: 'Intelligent matching based on career goals, skill gaps, and professional background.', path: '/dashboard' },
               ].map((f, i) => (
                  <div 
                    key={i}
                    className="w-[260px] sm:w-[320px] md:w-[380px] lg:w-[420px] shrink-0"
                  >
                     <div className="group h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-[1.5px] border-edu-border/10 dark:border-slate-800 rounded-[3rem] p-10 shadow-sm transition-all duration-500 flex flex-col hover:shadow-2xl hover:border-brand-500/30 overflow-hidden relative">
                        
                        <div className="flex justify-between items-start mb-10 relative z-10">
                           <div className={`w-16 h-16 ${f.color} border border-edu-border/5 dark:border-slate-700/50 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-500`}>
                              <f.icon size={32} className="text-edu-dark" />
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 dark:text-slate-700">Module #{String((i % 6) + 1).padStart(2, '0')}</div>
                        </div>
                        
                        <div className="relative z-10 flex-grow">
                           <h3 className="text-2xl font-black mb-5 uppercase tracking-tight text-slate-900 dark:text-white leading-tight whitespace-normal">{f.title}</h3>
                           <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 leading-relaxed mb-6 italic whitespace-normal">
                              {f.desc}
                           </p>
                           <p className="text-xs font-bold text-slate-400 dark:text-slate-500 leading-loose opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-normal">
                              {f.longDesc}
                           </p>
                        </div>
                        
                        <div className="mt-10 flex items-center justify-between relative z-10">
                           <Link to={f.path} className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] gap-3 text-brand-500 hover:gap-5 transition-all">
                              Launch <ArrowRight size={14} />
                           </Link>
                           <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
                        </div>

                        {/* Subtle Background Mark */}
                        <div className="absolute -bottom-4 -right-2 text-[80px] font-black text-slate-900/[0.02] dark:text-white/[0.02] uppercase select-none pointer-events-none group-hover:text-brand-500/[0.05] transition-colors duration-700 leading-none">
                           {f.title.split(' ')[0]}
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Scroll Progress Bar */}
         <div className="max-w-2xl mx-auto h-1 bg-slate-100 dark:bg-white/5 rounded-full mt-12 overflow-hidden">
            <motion.div 
               initial={{ width: "20%" }}
               whileInView={{ width: "100%" }}
               transition={{ duration: 2 }}
               className="h-full bg-brand-500"
            />
         </div>
      </section>

      {/* Platform Advantages - Infinite Loop Carousel */}
      <section className="py-12 sm:py-16 lg:py-24 bg-slate-50 dark:bg-slate-900/40 border-y border-edu-border/5 dark:border-white/5 overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-[10px] font-black uppercase tracking-widest text-brand-500">
                  <TrendingUp size={14} />
                  <span>The Edge</span>
               </div>
               <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-white leading-none">
                  Why <span className="text-brand-500">Choose Us</span>
               </h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs max-w-sm">
               Why elite professionals choose PathFinder to engineer their career growth.
            </p>
         </div>

         {/* Infinite Scroll Container */}
         <div className="relative flex overflow-hidden group">
            <div className="flex gap-8 px-4 whitespace-nowrap animate-marquee-slow pause-on-hover">
               {[
                  { title: "AI Accuracy", val: "99.4%", desc: "Precise document parsing using advanced AI.", icon: Brain },
                  { title: "Market Data", val: "500k+", desc: "Real-time tracking of global career paths.", icon: BarChart2 },
                  { title: "Career Speed", val: "2.5x", desc: "Accelerate your transition into new roles.", icon: Zap },
                  { title: "Live Updates", val: "24/7", desc: "Live updates from across the industry.", icon: Sparkles },
                  { title: "AI Accuracy", val: "99.4%", desc: "Precise document parsing using advanced AI.", icon: Brain },
                  { title: "Market Data", val: "500k+", desc: "Real-time tracking of global career paths.", icon: BarChart2 },
                  { title: "Career Speed", val: "2.5x", desc: "Accelerate your transition into new roles.", icon: Zap },
                  { title: "Live Updates", val: "24/7", desc: "Live updates from across the industry.", icon: Sparkles },
               ].map((item, i) => (
                  <div key={i} className="inline-block w-[350px] shrink-0">
                     <div className="p-10 bg-white dark:bg-slate-900 border-[1.5px] border-edu-border/10 dark:border-slate-800 rounded-[3rem] shadow-sm hover:shadow-xl hover:border-brand-500/20 transition-all duration-500">
                        <div className="flex justify-between items-start mb-8">
                           <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center">
                              <item.icon size={28} className="text-brand-500" />
                           </div>
                           <div className="text-3xl font-black text-slate-200 dark:text-slate-800 tracking-tighter">#{String(i % 4 + 1).padStart(2, '0')}</div>
                        </div>
                        <div className="text-4xl font-black text-brand-500 mb-2 tracking-tighter">{item.val}</div>
                        <h4 className="text-xl font-black uppercase text-slate-900 dark:text-white mb-4 tracking-tight">{item.title}</h4>
                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 whitespace-normal leading-relaxed">
                           {item.desc}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Final CTA Section - Professional Light Design */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32 text-center relative overflow-hidden">
         {/* Atmospheric Backgrounds - Softer for Light Mode */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-500/5 rounded-full blur-[120px] pointer-events-none"></div>
         
         <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
             className="relative z-10 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-12 md:p-24 bg-white dark:bg-slate-900 border-[1.5px] border-edu-border/10 dark:border-slate-800 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.08)] overflow-hidden group"
         >
            {/* Soft Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 via-transparent to-edu-blue/10 opacity-70"></div>
            
            {/* Decorative Floating Elements - Soft Colors */}
            <motion.div 
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-10 right-10 w-24 h-24 bg-edu-yellow/10 rounded-[2rem] blur-2xl"
            ></motion.div>
            <motion.div 
               animate={{ y: [0, 15, 0] }}
               transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute bottom-10 left-10 w-32 h-32 bg-brand-100/20 rounded-full blur-2xl"
            ></motion.div>

            <div className="relative z-10 space-y-10">
               <div className="space-y-4">
                  <motion.div 
                     initial={{ opacity: 0, y: 10 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-brand-500 mb-4"
                  >
                     <Zap size={14} className="fill-brand-500" />
                     <span>Future-Proof Your Career</span>
                  </motion.div>
                  
                  <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[0.9] uppercase">
                     Start Your <br /> 
                     <span className="text-brand-500 underline underline-offset-[12px] decoration-brand-500/10">Career Path</span>
                  </h2>
               </div>

               <p className="text-slate-500 dark:text-slate-400 font-bold text-sm sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed uppercase tracking-wide">
                  Join a network of professionals leveraging AI to navigate the modern job market with confidence.
               </p>

               <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-6 sm:pt-10">
                  <Link 
                     to="/register" 
                     className="group/btn relative px-8 sm:px-12 py-4 sm:py-6 bg-brand-500 text-white rounded-2xl font-black text-base sm:text-xl uppercase tracking-widest overflow-hidden transition-all hover:shadow-[0_20px_40px_-10px_rgba(240,101,67,0.3)] active:scale-95 w-full sm:w-auto"
                  >
                     <span className="relative z-10 flex items-center gap-3">
                        Join PathFinder <ArrowRight className="group-hover/btn:translate-x-2 transition-transform" />
                     </span>
                     <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                  </Link>

                   <Link 
                      to="/login" 
                      className="px-8 sm:px-12 py-4 sm:py-6 bg-white dark:bg-white/5 border-[1.5px] border-edu-border dark:border-white/20 text-slate-900 dark:text-white rounded-2xl font-black text-base sm:text-xl uppercase tracking-widest transition-all hover:bg-slate-50 dark:hover:bg-white/10 active:scale-95 shadow-sm w-full sm:w-auto text-center"
                  >
                     Login Access
                  </Link>
               </div>
               
               <div className="pt-12 flex items-center justify-center gap-8 opacity-20">
                  <div className="h-px w-12 bg-slate-900 dark:bg-white"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900 dark:text-white">Powered by PathFinder AI v2.0</span>
                  <div className="h-px w-12 bg-slate-900 dark:bg-white"></div>
               </div>
            </div>
          </motion.div>
       </section>
    </div>
  );
};

export default Home;
