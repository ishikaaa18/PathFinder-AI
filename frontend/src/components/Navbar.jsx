// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-6 py-4 shadow-sm border-b border-edu-border dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
           <div className="w-8 h-8 bg-brand-500 rounded-xl flex items-center justify-center text-white shadow-md">
              <Sparkles size={20} strokeWidth={2.5} fill="currentColor" />
           </div>
          <span className="text-xl font-extrabold tracking-tight uppercase">PathFinder AI</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link 
            to="/" 
            className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-brand-500 transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-brand-500 transition-colors"
          >
            Dashboard
          </Link>
          <div className="h-6 w-[1.5px] bg-edu-border/10 dark:bg-white/10 mx-2 hidden sm:block" />
          <ThemeToggle />
          <Link 
            to="/login" 
            className="btn-edu text-[10px] py-3 px-6 shadow-none border-[1.5px] bg-transparent text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
