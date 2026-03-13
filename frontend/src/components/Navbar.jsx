// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 shadow-sm border-b border-edu-border dark:border-slate-800 transition-colors relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-brand-500 rounded-xl flex items-center justify-center text-white shadow-md flex-shrink-0">
            <Sparkles size={18} strokeWidth={2.5} fill="currentColor" />
          </div>
          <span className="text-base sm:text-xl font-extrabold tracking-tight uppercase">PathFinder AI</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden sm:flex items-center gap-4 md:gap-6">
          <Link 
            to="/" 
            className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-brand-500 transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-brand-500 transition-colors"
          >
            Dashboard
          </Link>
          <div className="h-6 w-[1.5px] bg-edu-border/10 dark:bg-white/10 mx-1" />
          <ThemeToggle />
          <Link 
            to="/login" 
            className="btn-edu text-[10px] py-2.5 px-5 shadow-none border-[1.5px] bg-transparent text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900"
          >
            Login
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="sm:hidden bg-white dark:bg-slate-950 border-t border-edu-border/10 dark:border-slate-800 px-4 py-4 space-y-2 animate-edu-in">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center px-4 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-500 transition-all"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setMobileOpen(false)}
            className="flex items-center px-4 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-500 transition-all"
          >
            Dashboard
          </Link>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="btn-edu w-full justify-center text-[11px] py-3"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
