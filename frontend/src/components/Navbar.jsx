// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-primary-900 via-primary-800 to-secondary-900 text-white px-6 py-4 shadow-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Sparkles className="text-secondary-400" size={28} />
          <span className="text-2xl font-bold">PathFinder AI</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link 
            to="/" 
            className="hover:text-secondary-400 transition-colors font-medium"
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            className="hover:text-secondary-400 transition-colors font-medium"
          >
            Dashboard
          </Link>
          <ThemeToggle />
          <Link 
            to="/login" 
            className="bg-gradient-to-r from-secondary-400 to-accent-500 px-6 py-2 rounded-lg font-semibold hover:from-secondary-500 hover:to-accent-600 transition-all duration-200 shadow-md"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
