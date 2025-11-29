// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  Lightbulb, 
  LogOut, 
  Menu, 
  X,
  Sparkles,
  Map,
  FileText,
  History,
  Target,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../utils/cn';
import ThemeToggle from './ThemeToggle';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Recommendations', href: '/recommendations', icon: Lightbulb },
    { name: 'Roadmap', href: '/roadmap', icon: Map },
    { name: 'Resume Analyzer', href: '/resume-analyzer', icon: FileText },
    { name: 'Resume History', href: '/resume-history', icon: History },
    { name: 'Goals', href: '/goals', icon: Target },
    { name: 'Skill Quizzes', href: '/quiz', icon: Award },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary-600 text-white"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-screen w-64 bg-gradient-to-b from-primary-900 to-primary-800 text-white transition-transform duration-300',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 p-6 border-b border-primary-700 hover:bg-primary-800/50 transition-colors">
            <Sparkles className="text-secondary-400" size={32} />
            <h1 className="text-2xl font-bold">PathFinder AI</h1>
          </Link>

          {/* User info */}
          <div className="p-6 border-b border-primary-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary-400 to-accent-500 flex items-center justify-center text-white font-bold">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <div>
                <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
                <p className="text-sm text-primary-300">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-primary-700 text-white shadow-lg'
                      : 'text-primary-200 hover:bg-primary-700/50 hover:text-white'
                  )}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout button */}
          <div className="p-3 border-t border-primary-700 space-y-2">
            <div className="px-3">
              <ThemeToggle className="w-full flex justify-center bg-primary-800/50 hover:bg-primary-700 text-primary-200" />
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-3 rounded-lg text-primary-200 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
