import React from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';

const Roadmap = ({ roadmap, onUpdateStatus }) => {
  if (!roadmap || roadmap.length === 0) return null;

  return (
    <div className="mt-6">
      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Career Roadmap</h4>
      <div className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-3 space-y-8">
        {roadmap.map((phase, index) => (
          <div key={index} className="mb-8 ml-6 relative">
            {/* Status Icon */}
            <span className="absolute -left-10 flex items-center justify-center w-8 h-8 bg-white dark:bg-gray-800 rounded-full ring-4 ring-white dark:ring-gray-800">
              {phase.status === 'completed' ? (
                <CheckCircle className="text-green-500 w-6 h-6" />
              ) : phase.status === 'in-progress' ? (
                <Clock className="text-blue-500 w-6 h-6" />
              ) : (
                <Circle className="text-gray-300 dark:text-gray-600 w-6 h-6" />
              )}
            </span>

            {/* Content */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <h5 className="text-md font-semibold text-gray-900 dark:text-white">{phase.phase}</h5>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  {phase.duration}
                </span>
              </div>
              
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 mb-3 space-y-1">
                {phase.topics.map((topic, idx) => (
                  <li key={idx}>{topic}</li>
                ))}
              </ul>

              {/* Status Controls */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => onUpdateStatus(index, 'pending')}
                  className={`text-xs px-3 py-1 rounded-full border ${
                    phase.status === 'pending' 
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600' 
                      : 'text-gray-500 dark:text-gray-400 border-transparent hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => onUpdateStatus(index, 'in-progress')}
                  className={`text-xs px-3 py-1 rounded-full border ${
                    phase.status === 'in-progress' 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700' 
                      : 'text-gray-500 dark:text-gray-400 border-transparent hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  In Progress
                </button>
                <button
                  onClick={() => onUpdateStatus(index, 'completed')}
                  className={`text-xs px-3 py-1 rounded-full border ${
                    phase.status === 'completed' 
                      ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700' 
                      : 'text-gray-500 dark:text-gray-400 border-transparent hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  Completed
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
