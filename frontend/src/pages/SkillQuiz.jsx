import React, { useState, useEffect } from 'react';
import { Award, BookOpen, CheckCircle, Brain } from 'lucide-react';
import api from '../services/api';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import QuizModal from '../components/QuizModal';

const SkillQuiz = () => {
  const { user } = useAuth();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState(null);

  useEffect(() => {
    if (user?._id) {
      fetchSkills();
    }
  }, [user]);

  const fetchSkills = async () => {
    try {
      const res = await api.get(`/skills/user/${user._id}`);
      setSkills(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching skills:', error);
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Skill Verification 📝</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Test your knowledge and earn badges for your skills
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : skills.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <Brain size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">No skills added yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Add skills to your profile to take quizzes!</p>
            <a href="/profile" className="text-primary-600 hover:text-primary-700 font-medium">Go to Profile &rarr;</a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <div 
                key={skill._id}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform">
                    <BookOpen size={24} />
                  </div>
                  <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-semibold rounded-full uppercase tracking-wider border border-primary-200 dark:border-primary-700">
                    {skill.proficiencyLevel || 'Beginner'}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{skill.skillName}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                  Verify your proficiency in {skill.skillName} with a quick AI-generated quiz.
                </p>

                <button
                  onClick={() => setSelectedSkill(skill.skillName)}
                  className="w-full btn-gradient text-white py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Award size={18} /> Take Quiz
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedSkill && (
          <QuizModal 
            skill={selectedSkill} 
            onClose={() => setSelectedSkill(null)} 
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default SkillQuiz;
