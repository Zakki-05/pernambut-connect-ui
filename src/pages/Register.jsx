import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { registerUser } from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const navigate                = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return setError('Passwords do not match');
    setLoading(true); setError('');
    try {
      await registerUser({ 
        name: formData.name, 
        email: formData.email, 
        password: formData.password 
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] flex overflow-hidden">
      {/* ── Left Side: Branding (Desktop Only) ── */}
      <div className="hidden lg:flex w-1/2 bg-[#020617] relative p-16 flex-col justify-between">
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #10b981 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-black text-xl">ﺑ</div>
            <span className="text-white font-black text-xl tracking-tighter">Pernambut Connect</span>
          </div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-6xl font-black text-white leading-[1.1] tracking-tight mb-8">
              Join the <br />
              <span className="gold-text">Registry</span> <br />
              of Pernambut.
            </h1>
            <p className="text-slate-400 text-lg max-w-md font-medium leading-relaxed">
              Create an account to unlock full access to prayer schedules, mosque updates, and community donation programs. 
            </p>
          </motion.div>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-8">
          {[
            { label: 'Secure Access', value: '100%', icon: CheckCircle2 },
            { label: 'Cloud Hosted', value: 'Live', icon: Sparkles },
          ].map(stat => (
            <div key={stat.label} className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <stat.icon className="text-emerald-500 mb-3" size={24} />
              <div className="text-2xl font-black text-white">{stat.value}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* ── Right Side: Register Form ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 relative">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-4xl font-black text-slate-950 dark:text-white tracking-tight mb-3">Create account</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Be part of the Pernambut digital ecosystem.</p>
          </div>

          {error && (
            <div className="mb-8 p-4 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-widest">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" size={18} />
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required placeholder="John Doe"
                  className="form-input pl-14 h-16 text-slate-900 dark:text-white font-bold" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" size={18} />
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required placeholder="name@email.com"
                  className="form-input pl-14 h-16 text-slate-900 dark:text-white font-bold" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" size={18} />
                <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required placeholder="••••••••"
                  className="form-input pl-14 h-16 text-slate-900 dark:text-white font-bold" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" size={18} />
                <input type="password" value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} required placeholder="••••••••"
                  className="form-input pl-14 h-16 text-slate-900 dark:text-white font-bold" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-action w-full h-16 shadow-xl shadow-emerald-500/20 text-lg mt-4">
              {loading ? <Loader2 className="animate-spin" size={24} /> : <>Create Account <ArrowRight size={20} strokeWidth={3} /></>}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Already have an account? <Link to="/login" className="text-emerald-500 font-black hover:underline ml-1">Sign in instead</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
