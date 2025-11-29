// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { Plus, X, GraduationCap, Code, Heart } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../layouts/DashboardLayout';

const Profile = () => {
  const { user } = useAuth();
  const [skills, setSkills] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [newSkill, setNewSkill] = useState('');
  const [newQualification, setNewQualification] = useState({ title: '', institution: '', year: '' });
  const [newInterest, setNewInterest] = useState('');

  useEffect(() => {
    if (user?._id) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user?._id) return;
    
    try {
      const [skillsRes, qualsRes, interestsRes] = await Promise.all([
        api.get(`/skills/user/${user._id}`).catch(() => ({ data: [] })),
        api.get(`/qualifications/user/${user._id}`).catch(() => ({ data: [] })),
        api.get(`/interests/user/${user._id}`).catch(() => ({ data: [] })),
      ]);
      setSkills(skillsRes.data || []);
      setQualifications(qualsRes.data || []);
      setInterests(interestsRes.data || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const addSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    try {
      const res = await api.post('/skills', { skillName: newSkill });
      setSkills([...skills, res.data]);
      setNewSkill('');
      toast.success('Skill added successfully! ✨');
    } catch (error) {
      console.error('Error adding skill:', error);
      toast.error('Failed to add skill');
    }
  };

  const deleteSkill = async (id) => {
    try {
      await api.delete(`/skills/${id}`);
      setSkills(skills.filter((s) => s._id !== id));
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  const addQualification = async (e) => {
    e.preventDefault();
    if (!newQualification.title.trim()) return;
    try {
      // Convert year to dateObtained if year is provided
      const qualificationData = {
        title: newQualification.title,
        institution: newQualification.institution,
      };
      
      if (newQualification.year) {
        // Create a date from the year (set to Jan 1 of that year)
        qualificationData.dateObtained = new Date(newQualification.year, 0, 1);
      }
      
      const res = await api.post('/qualifications', qualificationData);
      setQualifications([...qualifications, res.data]);
      setNewQualification({ title: '', institution: '', year: '' });
      toast.success('Qualification added successfully! 🎓');
    } catch (error) {
      console.error('Error adding qualification:', error);
      toast.error('Failed to add qualification');
    }
  };

  const deleteQualification = async (id) => {
    try {
      await api.delete(`/qualifications/${id}`);
      setQualifications(qualifications.filter((q) => q._id !== id));
    } catch (error) {
      console.error('Error deleting qualification:', error);
    }
  };

  const addInterest = async (e) => {
    e.preventDefault();
    if (!newInterest.trim()) return;
    try {
      const res = await api.post('/interests', { interestName: newInterest });
      setInterests([...interests, res.data]);
      setNewInterest('');
      toast.success('Interest added successfully! ❤️');
    } catch (error) {
      console.error('Error adding interest:', error);
      toast.error('Failed to add interest');
    }
  };

  const deleteInterest = async (id) => {
    try {
      await api.delete(`/interests/${id}`);
      setInterests(interests.filter((i) => i._id !== id));
    } catch (error) {
      console.error('Error deleting interest:', error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Profile</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Manage your skills, qualifications, and interests</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Skills Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                <Code className="text-primary-600 dark:text-primary-400" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Skills</h2>
            </div>

            <form onSubmit={addSkill} className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
                >
                  <Plus size={20} />
                </button>
              </div>
            </form>

            <div className="space-y-2">
              {skills.map((skill) => (
                <div
                  key={skill._id}
                  className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 px-4 py-3 rounded-lg"
                >
                  <span className="text-gray-700 dark:text-gray-200">{skill.skillName}</span>
                  <button
                    onClick={() => deleteSkill(skill._id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
              {skills.length === 0 && (
                <p className="text-gray-400 dark:text-gray-500 text-sm text-center py-4">No skills added yet</p>
              )}
            </div>
          </div>

          {/* Qualifications Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg flex items-center justify-center">
                <GraduationCap className="text-secondary-600 dark:text-secondary-400" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Qualifications</h2>
            </div>

            <form onSubmit={addQualification} className="mb-4 space-y-2">
              <input
                type="text"
                value={newQualification.title}
                onChange={(e) => setNewQualification({ ...newQualification, title: e.target.value })}
                placeholder="Degree/Certificate"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
              <input
                type="text"
                value={newQualification.institution}
                onChange={(e) =>
                  setNewQualification({ ...newQualification, institution: e.target.value })
                }
                placeholder="Institution"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  value={newQualification.year}
                  onChange={(e) => setNewQualification({ ...newQualification, year: e.target.value })}
                  placeholder="Year"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="bg-secondary-600 text-white px-4 py-2 rounded-lg hover:bg-secondary-700 transition"
                >
                  <Plus size={20} />
                </button>
              </div>
            </form>

            <div className="space-y-2">
              {qualifications.map((qual) => (
                <div
                  key={qual._id}
                  className="flex items-start justify-between bg-gray-50 dark:bg-gray-700/50 px-4 py-3 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-200">{qual.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{qual.institution}</p>
                    {qual.dateObtained && (
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {new Date(qual.dateObtained).getFullYear()}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteQualification(qual._id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
              {qualifications.length === 0 && (
                <p className="text-gray-400 dark:text-gray-500 text-sm text-center py-4">
                  No qualifications added yet
                </p>
              )}
            </div>
          </div>

          {/* Interests Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center">
                <Heart className="text-accent-600 dark:text-accent-400" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Interests</h2>
            </div>

            <form onSubmit={addInterest} className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="Add an interest"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="bg-accent-600 text-white px-4 py-2 rounded-lg hover:bg-accent-700 transition"
                >
                  <Plus size={20} />
                </button>
              </div>
            </form>

            <div className="space-y-2">
              {interests.map((interest) => (
                <div
                  key={interest._id}
                  className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 px-4 py-3 rounded-lg"
                >
                  <span className="text-gray-700 dark:text-gray-200">{interest.interestName}</span>
                  <button
                    onClick={() => deleteInterest(interest._id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
              {interests.length === 0 && (
                <p className="text-gray-400 dark:text-gray-500 text-sm text-center py-4">No interests added yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
