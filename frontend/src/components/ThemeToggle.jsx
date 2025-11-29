import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-colors duration-200 
        ${theme === 'dark' 
          ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
          : 'bg-primary-100 text-primary-600 hover:bg-primary-200'} 
        ${className}`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;
