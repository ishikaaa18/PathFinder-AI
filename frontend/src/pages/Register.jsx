// src/pages/Register.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Sparkles, Eye, EyeOff, ShieldCheck, Zap } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();

  useEffect(() => {
    if (shouldRedirect && isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, shouldRedirect, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShouldRedirect(false);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...registrationData } = formData;
      await register(registrationData);
      toast.success('Identity initialized. Welcome to PathFinder AI.');
      setShouldRedirect(true);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Registration failed. Please attempt again.';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-edu-bg dark:bg-slate-950 flex items-center justify-center p-4 sm:p-6 py-8 sm:py-12 transition-colors duration-300">
      <div className="max-w-md w-full animate-edu-in space-y-10">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-brand-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-brand-500/20 border-[1.5px] border-edu-border">
              <Sparkles className="text-white" size={40} strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-edu-border dark:text-white uppercase tracking-tight">Create <span className="text-brand-500 underline underline-offset-4 decoration-4">Account</span></h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-4">Join PathFinder AI to Start Your Career Journey</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border-[1.5px] border-edu-border dark:border-slate-800 rounded-[2.5rem] sm:rounded-[3.5rem] p-6 sm:p-10 shadow-2xl transition-colors">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-rose-50 dark:bg-rose-950/20 border-[1.5px] border-rose-500/30 text-rose-500 px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                <Zap size={14} fill="currentColor" /> {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-950 border-[1.5px] border-edu-border dark:border-slate-800 rounded-2xl focus:border-brand-500 outline-none transition text-edu-border dark:text-white text-sm font-extrabold shadow-inner"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-950 border-[1.5px] border-edu-border dark:border-slate-800 rounded-2xl focus:border-brand-500 outline-none transition text-edu-border dark:text-white text-sm font-extrabold shadow-inner"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="username" className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-6 py-3.5 bg-slate-50 dark:bg-slate-950 border-[1.5px] border-edu-border dark:border-slate-800 rounded-2xl focus:border-brand-500 outline-none transition text-edu-border dark:text-white text-sm font-extrabold shadow-inner"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-950 border-[1.5px] border-edu-border dark:border-slate-800 rounded-2xl focus:border-brand-500 outline-none transition text-edu-border dark:text-white text-sm font-extrabold shadow-inner"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-950 border-[1.5px] border-edu-border dark:border-slate-800 rounded-2xl focus:border-brand-500 outline-none transition text-edu-border dark:text-white text-sm font-extrabold shadow-inner pr-14"
                  minLength="6"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-6 flex items-center text-slate-300 dark:text-slate-700 hover:text-brand-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-950 border-[1.5px] border-edu-border dark:border-slate-800 rounded-2xl focus:border-brand-500 outline-none transition text-edu-border dark:text-white text-sm font-extrabold shadow-inner pr-14"
                  minLength="6"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-6 flex items-center text-slate-300 dark:text-slate-700 hover:text-brand-500 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-edu w-full py-5 text-lg shadow-xl shadow-brand-500/10 mt-6"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  CREATING ACCOUNT...
                </>
              ) : (
                <>
                  <ShieldCheck size={20} />
                  Register Now
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center pt-8 border-t border-edu-border/5 dark:border-white/5">
            <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">
              Already have an account?{' '}
              <Link to="/login" className="text-brand-500 hover:underline underline-offset-4 decoration-2">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
