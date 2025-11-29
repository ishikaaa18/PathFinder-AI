import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Briefcase, BarChart2, MapPin } from 'lucide-react';
import api from '../services/api';

const MarketInsights = ({ role }) => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (role) {
      fetchInsights();
    } else {
      setLoading(false);
    }
  }, [role]);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      const res = await api.post('/insights/generate', { role });
      setInsights(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching insights:', err);
      setError('Failed to load market data');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error || !insights) return null;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm mt-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <BarChart2 className="text-primary-600 dark:text-primary-400" size={20} />
        Market Insights: {role}
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Salary Info */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-green-600 dark:text-green-400 font-semibold">
            <DollarSign size={18} /> Salary Range
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Entry Level</span>
              <span className="font-medium text-gray-900 dark:text-white">{insights.salary.entry}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Mid Level</span>
              <span className="font-medium text-gray-900 dark:text-white">{insights.salary.mid}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Senior Level</span>
              <span className="font-medium text-gray-900 dark:text-white">{insights.salary.senior}</span>
            </div>
          </div>
        </div>

        {/* Demand & Growth */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Current Demand</p>
              <p className={`text-lg font-bold ${
                insights.demandLevel === 'High' ? 'text-green-600' : 
                insights.demandLevel === 'Medium' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {insights.demandLevel}
              </p>
            </div>
            <TrendingUp size={24} className="text-gray-400" />
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">YoY Growth</p>
              <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                {insights.growth}
              </p>
            </div>
            <BarChart2 size={24} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Top Skills */}
      <div className="mt-6">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Top Skills in Demand</p>
        <div className="flex flex-wrap gap-2">
          {insights.topSkills.map((skill, i) => (
            <span key={i} className="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full border border-primary-100 dark:border-primary-800">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketInsights;
