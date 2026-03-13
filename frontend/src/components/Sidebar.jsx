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
  Award,
  BarChart2,
  BookOpen
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
    { name: 'Career Paths', href: '/recommendations', icon: Lightbulb },
    { name: 'Roadmap', href: '/roadmap', icon: Map },
    { name: 'Resume Checker', href: '/resume-analyzer', icon: FileText },
    { name: 'Resume History', href: '/resume-history', icon: History },
    { name: 'Goals', href: '/goals', icon: Target },
    { name: 'Skill Center', href: '/quiz', icon: Award },
    { name: 'Market Insights', href: '/market-insights', icon: BarChart2 },
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
        className="lg:hidden fixed top-[11px] left-4 z-[60] p-2.5 rounded-xl bg-slate-950 dark:bg-white text-white dark:text-slate-900 shadow-lg active:scale-95 transition-all"
        aria-label="Toggle Navigation"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
    <aside
      className={cn(
        'h-screen w-72 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-white/5 transition-transform duration-300 z-40',
        isMobileMenuOpen ? 'fixed translate-x-0' : 'max-lg:fixed max-lg:-translate-x-full lg:translate-x-0'
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="h-20 flex items-center px-8 border-b border-slate-200 dark:border-white/5">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-brand-500 rounded-xl flex items-center justify-center text-white shadow-sm">
              <Sparkles size={18} strokeWidth={2.5} />
            </div>
            <h1 className="text-sm font-black tracking-tight uppercase dark:text-white">PathFinder AI</h1>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto no-scrollbar">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-2.5 transition-all duration-200 rounded-xl text-xs font-bold',
                  isActive 
                    ? 'bg-slate-100 dark:bg-white/5 text-brand-500' 
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'
                )}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer info & Logout */}
        <div className="p-4 border-t border-slate-200 dark:border-white/5 space-y-4">
          <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-white/5 rounded-2xl">
            <div className="w-8 h-8 rounded-lg bg-edu-yellow flex items-center justify-center text-edu-dark font-black text-[10px]">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-black truncate dark:text-white">{user?.firstName} {user?.lastName}</p>
              <p className="text-[8px] text-slate-500 truncate">Pro Account</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <ThemeToggle className="flex-1 flex justify-center bg-slate-50 dark:bg-white/5 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-400" />
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all border border-slate-200 dark:border-white/10"
              title="Sign Out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;
