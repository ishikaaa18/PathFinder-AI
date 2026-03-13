// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { Plus, X, GraduationCap, Code, Heart, Trophy, Target, Star, Trash2 } from 'lucide-react';
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
      const qualificationData = {
        title: newQualification.title,
        institution: newQualification.institution,
      };
      
      if (newQualification.year) {
        qualificationData.dateObtained = new Date(newQualification.year, 0, 1);
      }
      
      const res = await api.post('/qualifications', qualificationData);
      setQualifications([...qualifications, res.data]);
      setNewQualification({ title: '', institution: '', year: '' });
      toast.success('Education details added! 🎓');
    } catch (error) {
      console.error('Error adding qualification:', error);
      toast.error('Failed to save details');
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
      toast.success('Interest registered! ❤️');
    } catch (error) {
      console.error('Error adding interest:', error);
      toast.error('Registry error');
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-brand-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-12 pb-20 animate-edu-in">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">My Profile</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-[10px] font-black uppercase tracking-widest">Manage Your Skills & Education</p>
          </div>
          <div className="w-12 h-12 bg-edu-yellow rounded-[1.5rem] flex items-center justify-center border border-edu-border dark:border-slate-800 shadow-xl">
             <Star size={24} className="text-edu-dark" fill="currentColor" />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Skills Section */}
          <div className="surface-edu bg-white dark:bg-slate-900 p-8 border-edu-border dark:border-slate-800 transition-colors shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-edu-blue rounded-2xl flex items-center justify-center border border-edu-border shadow-md">
                <Code className="text-edu-dark" size={24} />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-tight">My Skills</h2>
            </div>

            <form onSubmit={addSkill} className="mb-8">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="ADD SKILL"
                  className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-950 border-[1.5px] border-edu-border dark:border-slate-800 rounded-2xl focus:border-brand-500 outline-none text-sm font-semibold transition-all dark:text-white shadow-inner"
                />
                <button
                  type="submit"
                  className="bg-brand-500 text-white p-3 rounded-2xl hover:brightness-105 active:scale-95 transition-all shadow-lg border-[1.5px] border-edu-border"
                >
                  <Plus size={24} strokeWidth={3} />
                </button>
              </div>
            </form>

            <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
              {skills.map((skill) => (
                <div
                  key={skill._id}
                  className="flex items-center justify-between bg-edu-bg dark:bg-slate-950/50 p-4 rounded-2xl border-[1.5px] border-edu-border dark:border-slate-800 group transition-all hover:bg-edu-blue/10"
                >
                  <span className="text-slate-700 dark:text-slate-300 font-bold text-sm">{skill.skillName}</span>
                  <button
                    onClick={() => deleteSkill(skill._id)}
                    className="text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              {skills.length === 0 && (
                <div className="text-center py-10 opacity-20">
                   <p className="font-black text-[10px] uppercase tracking-widest text-slate-400">No skills added yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Qualifications Section */}
          <div className="surface-edu bg-white dark:bg-slate-900 p-8 border-edu-border dark:border-slate-800 transition-colors shadow-sm lg:col-span-1">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-edu-purple rounded-2xl flex items-center justify-center border border-edu-border shadow-md">
                <GraduationCap className="text-edu-dark" size={24} />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">Education</h2>
            </div>

            <form onSubmit={addQualification} className="mb-8 space-y-3">
              <input
                type="text"
                value={newQualification.title}
                onChange={(e) => setNewQualification({ ...newQualification, title: e.target.value })}
                placeholder="DEGREE / TITLE"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border-[1.5px] border-edu-border dark:border-slate-800 rounded-2xl focus:border-brand-500 outline-none text-sm font-semibold dark:text-white shadow-inner"
              />
              <input
                type="text"
                value={newQualification.institution}
                onChange={(e) =>
                  setNewQualification({ ...newQualification, institution: e.target.value })
                }
                placeholder="INSTITUTION"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border-[1.5px] border-edu-border dark:border-slate-800 rounded-2xl focus:border-brand-500 outline-none text-sm font-semibold dark:text-white shadow-inner"
              />
              <div className="flex gap-3">
                <input
                  type="number"
                  value={newQualification.year}
                  onChange={(e) => setNewQualification({ ...newQualification, year: e.target.value })}
                  placeholder="YEAR"
                  className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-950 border-[1.5px] border-edu-border dark:border-slate-800 rounded-2xl focus:border-brand-500 outline-none text-sm font-semibold dark:text-white shadow-inner"
                />
                <button
                  type="submit"
                  className="bg-brand-500 text-white p-3 rounded-2xl hover:brightness-105 transition-all shadow-lg border-[1.5px] border-edu-border"
                >
                  <Plus size={24} strokeWidth={3} />
                </button>
              </div>
            </form>

            <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
              {qualifications.map((qual) => (
                <div
                  key={qual._id}
                  className="bg-edu-bg dark:bg-slate-950/50 p-5 rounded-2xl border-[1.5px] border-edu-border dark:border-slate-800 relative group transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="font-extrabold text-edu-dark dark:text-slate-100 text-sm uppercase tracking-tight">{qual.title}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{qual.institution}</p>
                      {qual.dateObtained && (
                         <span className="inline-block mt-2 bg-edu-purple/30 text-edu-dark text-[8px] font-black px-2 py-0.5 rounded-full border border-edu-purple/50">
                            {new Date(qual.dateObtained).getFullYear()}
                         </span>
                      )}
                    </div>
                    <button
                      onClick={() => deleteQualification(qual._id)}
                      className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {qualifications.length === 0 && (
                <div className="text-center py-10 opacity-20 italic">
                   <p className="font-black text-[10px] uppercase tracking-widest text-slate-400">Registry Empty</p>
                </div>
              )}
            </div>
          </div>

          {/* Interests Section */}
          <div className="surface-edu bg-white dark:bg-slate-900 p-8 border-edu-border dark:border-slate-800 transition-colors shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-edu-yellow rounded-2xl flex items-center justify-center border border-edu-border shadow-md">
                <Heart className="text-edu-dark" size={24} />
              </div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Focus Vectors</h2>
            </div>

            <form onSubmit={addInterest} className="mb-8">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="ADD VECTOR"
                  className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-950 border-[1.5px] border-edu-border dark:border-slate-800 rounded-2xl focus:border-brand-500 outline-none text-sm font-black italic transition-all dark:text-white"
                />
                <button
                  type="submit"
                  className="bg-brand-500 text-white p-3 rounded-2xl hover:brightness-105 active:scale-95 transition-all shadow-lg border-[1.5px] border-edu-border"
                >
                  <Plus size={24} strokeWidth={3} />
                </button>
              </div>
            </form>

            <div className="flex flex-wrap gap-2 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
              {interests.map((interest) => (
                <div
                  key={interest._id}
                  className="flex items-center gap-3 bg-edu-yellow/20 px-4 py-2 rounded-2xl border-[1.5px] border-edu-border dark:border-slate-800 group shadow-sm transition-all hover:bg-edu-yellow/40"
                >
                  <span className="text-edu-dark dark:text-slate-300 font-black text-[10px] uppercase tracking-widest">{interest.interestName}</span>
                  <button
                    onClick={() => deleteInterest(interest._id)}
                    className="text-edu-dark/30 hover:text-rose-500"
                  >
                    <X size={14} strokeWidth={3} />
                  </button>
                </div>
              ))}
              {interests.length === 0 && (
                <div className="w-full text-center py-10 opacity-20 italic">
                   <p className="font-black text-[10px] uppercase tracking-widest text-slate-400">Registry Empty</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
