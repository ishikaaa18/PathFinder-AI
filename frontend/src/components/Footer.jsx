// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Github, Twitter, Linkedin, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-edu-border/5 dark:border-white/5 py-12 px-6 transition-colors duration-300 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-brand-500 rounded-xl flex items-center justify-center text-white shadow-sm ring-4 ring-brand-500/10 group-hover:ring-brand-500/20 transition-all">
                <Sparkles size={18} strokeWidth={2.5} />
              </div>
              <span className="text-base font-black tracking-tight uppercase dark:text-white">PathFinder AI</span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xs">
              Empowering professionals with AI-driven career intelligence. Navigate your growth trajectory with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Platform</h4>
              <nav className="flex flex-col gap-2">
                <Link to="/dashboard" className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-brand-500 transition-colors">Dashboard</Link>
                <Link to="/recommendations" className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-brand-500 transition-colors">Career Paths</Link>
                <Link to="/resume-analyzer" className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-brand-500 transition-colors">Resume AI</Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Company</h4>
              <nav className="flex flex-col gap-2">
                <a href="#" className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-brand-500 transition-colors">Intelligence Hub</a>
                <a href="#" className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-brand-500 transition-colors">API Docs</a>
                <a href="#" className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-brand-500 transition-colors">Privacy</a>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <span>© {new Date().getFullYear()} PathFinder AI</span>
            <span className="text-slate-200 dark:text-slate-800">•</span>
            <span className="flex items-center gap-1">Created with <Heart size={10} className="text-rose-500 fill-rose-500" /> by Team</span>
          </div>
          
          <div className="flex items-center gap-4">
            {[Github, Twitter, Linkedin].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-brand-500 hover:shadow-sm transition-all"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
