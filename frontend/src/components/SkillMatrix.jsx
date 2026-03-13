import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip
} from 'recharts';

const SkillMatrix = ({ strengths = [], missingSkills = [] }) => {
  // combine and create a data set
  // We'll give strengths a high score (8-10) and missing skills a low score (3-5)
  // to visualize the gap
  
  const data = [
    ...strengths.slice(0, 3).map(s => ({
      subject: s.length > 15 ? s.substring(0, 12) + '...' : s,
      current: Math.floor(Math.random() * 2) + 8, // 8-9
      target: 10,
      fullMark: 10,
    })),
    ...missingSkills.slice(0, 3).map(s => ({
      subject: s.length > 15 ? s.substring(0, 12) + '...' : s,
      current: Math.floor(Math.random() * 2) + 3, // 3-4
      target: 9,
      fullMark: 10,
    }))
  ];

  if (data.length < 3) return null;

  return (
    <div className="w-full h-[300px] md:h-[400px] bg-white dark:bg-slate-900/50 rounded-[2rem] border border-slate-100 dark:border-slate-800 p-6 flex flex-col items-center">
      <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 self-start">Skill Comparison Chart</h3>
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#e2e8f0" strokeOpacity={0.1} />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 10]} 
              tick={false}
              axisLine={false}
            />
            <Radar
              name="Current Profile"
              dataKey="current"
              stroke="#6366f1"
              fill="#6366f1"
              fillOpacity={0.6}
            />
            <Radar
              name="Ideal Profile"
              dataKey="target"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.1}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                border: 'none', 
                borderRadius: '12px',
                fontSize: '10px',
                color: '#fff'
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-indigo-500" />
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">You</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500/30 border border-emerald-500" />
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Target</span>
        </div>
      </div>
    </div>
  );
};

export default SkillMatrix;
