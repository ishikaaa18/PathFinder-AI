import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-3 rounded-2xl transition-all duration-300 flex items-center gap-3 font-black text-xs uppercase tracking-widest
        ${theme === 'dark' 
          ? 'bg-slate-900 text-yellow-500 border border-white/10 hover:bg-slate-800' 
          : 'bg-edu-bg text-edu-dark border border-edu-border hover:bg-slate-50'} 
        ${className}`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <>
          <Sun size={18} fill="currentColor" />
          <span>Day Mode</span>
        </>
      ) : (
        <>
          <Moon size={18} fill="currentColor" />
          <span>Dark Mode</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
