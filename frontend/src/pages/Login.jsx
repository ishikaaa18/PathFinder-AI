// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Sparkles, Eye, EyeOff, ShieldCheck, Zap } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (shouldRedirect && isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, shouldRedirect, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setShouldRedirect(false);

    try {
      await login(formData);
      toast.success('Access synchronized. Welcome back.');
      setShouldRedirect(true);
    } catch (err) {
      console.error('Login failed:', err);
      const errorMsg = err.response?.data?.message || 'Authentication failed. Please verify credentials.';
      setError(errorMsg);
      toast.error(errorMsg);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-edu-bg dark:bg-slate-950 flex items-center justify-center p-6 transition-colors duration-300">
      <div className="max-w-md w-full animate-edu-in space-y-10">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-brand-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-brand-500/20 border-[1.5px] border-edu-border">
              <Sparkles className="text-white" size={40} strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-edu-border dark:text-white uppercase tracking-tight">User <span className="text-brand-500 underline underline-offset-4 decoration-4">Login</span></h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-4">Welcome Back! Access Your Career Dashboard</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border-[1.5px] border-edu-border dark:border-slate-800 rounded-[3.5rem] p-10 shadow-2xl transition-colors">
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-8">
            {error && (
              <div className="bg-rose-50 dark:bg-rose-950/20 border-[1.5px] border-rose-500/30 text-rose-500 px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                <Zap size={14} fill="currentColor" /> {error}
              </div>
            )}

            <div className="space-y-3">
              <label htmlFor="email" className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950 border-[1.5px] border-edu-border dark:border-slate-800 rounded-2xl focus:border-brand-500 outline-none transition text-edu-border dark:text-white text-sm font-extrabold shadow-inner"
                placeholder="PRO-ID-001@VECTOR.NET"
                required
              />
            </div>

            <div className="space-y-3">
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
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950 border-[1.5px] border-edu-border dark:border-slate-800 rounded-2xl focus:border-brand-500 outline-none transition text-edu-border dark:text-white text-sm font-extrabold shadow-inner pr-14"
                  placeholder="••••••••••••"
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

            <button
              type="submit"
              disabled={loading}
              className="btn-edu w-full py-5 text-lg shadow-xl shadow-brand-500/10 group overflow-hidden"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  SIGNING IN...
                </>
              ) : (
                <>
                  <ShieldCheck size={20} className="group-hover:rotate-12 transition-transform" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center pt-8 border-t border-edu-border/5 dark:border-white/5">
            <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">
              New to the Network?{' '}
              <Link to="/register" className="text-brand-500 hover:underline underline-offset-4 decoration-2">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
