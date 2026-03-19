// src/components/Roadmap.jsx
import React from 'react';
import { CheckCircle, Circle, Clock, Target, Calendar } from 'lucide-react';
import { cn } from '../utils/cn';

const Roadmap = ({ roadmap, onUpdateStatus }) => {
  if (!roadmap || roadmap.length === 0) return null;

  return (
    <div className="space-y-12 animate-edu-in">
      <div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-6 space-y-12">
        {roadmap.map((phase, index) => (
          <div key={index} className="ml-10 relative group">
            {/* Status Icon */}
            <span className={cn(
               "absolute -left-[54px] flex items-center justify-center w-10 h-10 rounded-xl border-2 z-10 transition-all duration-300 shadow-sm",
               phase.status === 'completed' 
                ? 'bg-emerald-500 border-emerald-500 text-white' 
                : phase.status === 'in-progress' 
                ? 'bg-brand-500 border-brand-500 text-white animate-pulse' 
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-600'
            )}>
              {phase.status === 'completed' ? <CheckCircle size={18} /> : 
               phase.status === 'in-progress' ? <Clock size={18} /> : <Circle size={18} />}
            </span>

            {/* Content Card */}
            <div className="bg-slate-50/50 dark:bg-slate-800/10 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 transition-all duration-300 group-hover:bg-white dark:group-hover:bg-slate-800/20 group-hover:shadow-md group-hover:border-brand-500/20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="space-y-1">
                  <h5 className="text-lg font-bold text-slate-900 dark:text-white transition-colors">
                    {phase.phase}
                  </h5>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <Calendar size={12} strokeWidth={2.5} />
                    {phase.duration}
                  </div>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {phase.topics.map((topic, idx) => (
                  <div key={idx} className="flex flex-col p-3 bg-white dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-800/50 group/item hover:border-brand-500/20 transition-all">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 flex-shrink-0" />
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover/item:text-slate-900 dark:group-hover/item:text-slate-200 transition-colors leading-snug">
                         {topic}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-3 ml-4 border-t border-slate-100 dark:border-slate-800/50 pt-2.5">
                      <a href={`https://github.com/search?q=${encodeURIComponent(topic)}`} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 dark:hover:text-white transition-colors">
                        GitHub ↗
                      </a>
                      <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' course tutorial')}`} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-brand-500 transition-colors">
                        Video ↗
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status Controls */}
              <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-100 dark:border-slate-800/50">
                <button
                  onClick={() => onUpdateStatus(index, 'pending')}
                  className={cn(
                    "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all",
                    phase.status === 'pending' 
                      ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white' 
                      : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                  )}
                >
                  Pending
                </button>
                <button
                  onClick={() => onUpdateStatus(index, 'in-progress')}
                  className={cn(
                    "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all",
                    phase.status === 'in-progress' 
                      ? 'bg-brand-500 text-white border-brand-500 shadow-md shadow-brand-500/20' 
                      : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                  )}
                >
                  Active
                </button>
                <button
                  onClick={() => onUpdateStatus(index, 'completed')}
                  className={cn(
                    "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all",
                    phase.status === 'completed' 
                      ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20' 
                      : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                  )}
                >
                  Passed
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
