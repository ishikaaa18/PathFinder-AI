import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { 
  Sparkles, ArrowRight, Brain, Target, Zap, TrendingUp, Users, Award, 
  Star, LayoutDashboard, User, Lightbulb, Map, FileText, CheckCircle, 
  Gamepad2, Trophy, Sword, Scroll
} from 'lucide-react';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Parallax background effect
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const defaultTiltOptions = {
    reverse: false,
    max: 15,
    perspective: 1000,
    scale: 1.05,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] overflow-hidden text-white selection:bg-purple-500 selection:text-white" ref={containerRef}>
      
      {/* Dynamic Background Grid */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-500 opacity-20 blur-[100px]"></div>
        <div className="absolute right-0 bottom-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px]"></div>
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5 + 0.2
            }}
            animate={{ 
              y: [null, Math.random() * -100],
              opacity: [null, 0],
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20 pb-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-left space-y-6"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium">
              <Sparkles size={16} />
              <span>AI-Powered Career Quest</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold leading-tight">
              Level Up Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-gradient-x">
                Career Journey
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg text-gray-400 max-w-xl leading-relaxed">
              Embark on a personalized adventure to discover your dream role. Equip yourself with AI insights, unlock new skills, and conquer the job market.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
              <Link to="/register">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-lg shadow-lg shadow-purple-500/25 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative flex items-center gap-2">
                    Start Quest <ArrowRight size={20} />
                  </span>
                </motion.button>
              </Link>
              
              <Link to="/login">
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-bold text-lg backdrop-blur-sm hover:border-white/20 transition-colors"
                >
                  Continue Game
                </motion.button>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-6 pt-8 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-purple-400" />
                <span>5k+ Players</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy size={16} className="text-yellow-400" />
                <span>95% Success Rate</span>
              </div>
            </motion.div>
          </motion.div>

          {/* 3D Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <Tilt options={defaultTiltOptions} className="relative z-10">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 to-blue-500/30 rounded-3xl blur-2xl animate-pulse"></div>
                <div className="relative h-full w-full bg-[#1e293b]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center gap-6 group">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <Gamepad2 size={64} className="text-white" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold text-white">Career Mode</h3>
                    <div className="flex items-center justify-center gap-2">
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold border border-green-500/30">ONLINE</span>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold border border-blue-500/30">LVL 1</span>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <motion.div 
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-6 -right-6 p-4 bg-[#0f172a] border border-purple-500/30 rounded-2xl shadow-xl"
                  >
                    <Brain className="text-purple-400" size={32} />
                  </motion.div>
                  
                  <motion.div 
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-6 -left-6 p-4 bg-[#0f172a] border border-blue-500/30 rounded-2xl shadow-xl"
                  >
                    <Target className="text-blue-400" size={32} />
                  </motion.div>
                </div>
              </div>
            </Tilt>
          </motion.div>
        </div>
      </section>

      {/* Features "Quest Log" Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your <span className="text-purple-400">Quest</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Unlock powerful tools to guide your journey. Each feature is designed to help you level up your career stats.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <LayoutDashboard size={32} />,
                title: "Command Center",
                desc: "Your personal dashboard to track progress and stats.",
                color: "from-blue-500 to-cyan-500",
                delay: 0
              },
              {
                icon: <Lightbulb size={32} />,
                title: "AI Oracle",
                desc: "Consult the AI for personalized career guidance.",
                color: "from-purple-500 to-pink-500",
                delay: 0.1
              },
              {
                icon: <Map size={32} />,
                title: "Skill Tree",
                desc: "Visualize your path and unlock new abilities.",
                color: "from-green-500 to-emerald-500",
                delay: 0.2
              },
              {
                icon: <FileText size={32} />,
                title: "Resume Forge",
                desc: "Craft a legendary resume with AI enhancements.",
                color: "from-orange-500 to-red-500",
                delay: 0.3
              },
              {
                icon: <Target size={32} />,
                title: "Goal Tracker",
                desc: "Set targets and earn achievements.",
                color: "from-yellow-500 to-orange-500",
                delay: 0.4
              },
              {
                icon: <Sword size={32} />,
                title: "Skill Arena",
                desc: "Test your might with technical quizzes.",
                color: "from-indigo-500 to-violet-500",
                delay: 0.5
              }
            ].map((feature, idx) => (
              <Tilt key={idx} options={{ ...defaultTiltOptions, scale: 1.02 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: feature.delay }}
                  className="h-full bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group relative overflow-hidden"
                >
                  {/* Holographic Gradient on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.desc}
                  </p>
                  
                  <div className="mt-6 flex items-center text-sm font-medium text-gray-500 group-hover:text-white transition-colors">
                    <span>Unlock Feature</span>
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Roadmap Preview */}
      <section className="py-24 bg-black/20 relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Your <span className="text-blue-400">Adventure Map</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Don't wander aimlessly. Follow a proven path to success with our interactive career roadmaps. Track your progress from Novice to Master.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Discover", desc: "Identify your strengths", icon: <Scroll size={20} /> },
                  { title: "Learn", desc: "Master new technologies", icon: <Brain size={20} /> },
                  { title: "Build", desc: "Create portfolio projects", icon: <LayoutDashboard size={20} /> },
                  { title: "Achieve", desc: "Land your dream job", icon: <Trophy size={20} /> },
                ].map((step, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                      {step.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{step.title}</h4>
                      <p className="text-sm text-gray-400">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative w-full aspect-video bg-[#0f172a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden group">
                {/* Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                
                {/* Connecting Line (Snake Path) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 450" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="gradient-snake" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
                      <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
                      <stop offset="100%" stopColor="#ec4899" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                  
                  {/* Continuous Snake Path */}
                  <motion.path 
                    d="M100,225 C200,225 200,125 300,125 C400,125 400,325 500,325 C600,325 600,225 700,225" 
                    fill="none" 
                    stroke="url(#gradient-snake)" 
                    strokeWidth="6"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                  />
                </svg>

                {/* Nodes - Positioned on the path */}
                <div className="absolute inset-0">
                  {/* Node 1: Start (100, 225) -> 12.5%, 50% */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    className="absolute left-[12.5%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/50 z-10 border-4 border-[#0f172a]"
                  >
                    <User className="text-white" size={24} />
                  </motion.div>

                  {/* Node 2: Peak (300, 125) -> 37.5%, 27.8% */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="absolute left-[37.5%] top-[27.8%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-xl bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/50 z-10 border-4 border-[#0f172a]"
                  >
                    <Brain className="text-white" size={24} />
                  </motion.div>

                  {/* Node 3: Trough (500, 325) -> 62.5%, 72.2% */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 1.6 }}
                    className="absolute left-[62.5%] top-[72.2%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-xl bg-pink-600 flex items-center justify-center shadow-lg shadow-pink-500/50 z-10 border-4 border-[#0f172a]"
                  >
                    <Target className="text-white" size={24} />
                  </motion.div>

                  {/* Node 4: End (700, 225) -> 87.5%, 50% */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 2.4 }}
                    className="absolute left-[87.5%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-xl shadow-indigo-500/50 z-10 border-4 border-[#0f172a]"
                  >
                    <Trophy className="text-white" size={32} />
                  </motion.div>
                </div>
                
                {/* Floating Badge */}
                <motion.div 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-6 right-6 bg-[#0f172a]/90 backdrop-blur-md p-3 rounded-xl border border-white/10 shadow-xl flex items-center gap-3 z-20"
                >
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider">Status</div>
                    <div className="font-bold text-white text-sm">Level 5 Unlocked</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/20"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold mb-8"
          >
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Start?</span>
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-1 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
          >
            <div className="bg-[#0f172a] rounded-xl p-12">
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of players who have already discovered their true potential. The game of life is better with a guide.
              </p>
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-5 bg-white text-black rounded-xl font-bold text-xl shadow-lg shadow-white/20 hover:shadow-white/40 transition-shadow"
                >
                  Create Character
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
