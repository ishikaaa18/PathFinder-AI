// src/layouts/DashboardLayout.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { Sparkles } from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-edu-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-brand-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="h-screen bg-white dark:bg-slate-950 transition-colors duration-300 flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-20 bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 sticky top-0 z-30 px-6 lg:px-10 flex items-center justify-between max-lg:hidden flex-shrink-0">
           <div className="flex items-center gap-4">
              <span className="text-slate-400 dark:text-slate-600 text-[9px] font-black uppercase tracking-[0.2em]">Dashboard Terminal</span>
           </div>
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 px-3 py-1.5 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">System Link: Active</span>
              </div>
           </div>
        </header>

        {/* Global Nav for Mobile */}
        <header className="h-20 flex lg:hidden items-center justify-end px-6 border-b border-slate-200 dark:border-white/5 flex-shrink-0">
           <div className="w-10 h-10 bg-brand-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Sparkles size={24} strokeWidth={2.5} />
           </div>
        </header>

        <main className="flex-1 overflow-y-auto no-scrollbar bg-slate-50/50 dark:bg-slate-900/10">
          <div className="p-6 lg:p-8 animate-edu-in h-fit">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
