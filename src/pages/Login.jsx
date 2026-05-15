import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { loginWithEmail } from '../services/api';

const Login = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const { login }               = useAuth();
  const navigate                = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return setError('Please enter your credentials');
    setLoading(true); setError('');
    try {
      const res = await loginWithEmail(email, password);
      login(res.data.user, res.data.access, res.data.refresh);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] flex overflow-hidden">
      {/* ── Left Side: Branding & Community Focus (Desktop Only) ── */}
      <div className="hidden lg:flex w-1/2 bg-[#020617] relative p-16 flex-col justify-between">
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #10b981 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-black text-xl">ﺑ</div>
            <span className="text-white font-black text-xl tracking-tighter">Pernambut Connect</span>
          </div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h1 className="text-6xl font-black text-white leading-[1.1] tracking-tight mb-8">
              Empowering our <br />
              <span className="gradient-text">Community</span> <br />
              Digitally.
            </h1>
            <p className="text-slate-400 text-lg max-w-md font-medium leading-relaxed">
              Join thousands of community members in Pernambut. Stay connected with your local Masjid, track prayer times, and contribute to local causes.
            </p>
          </motion.div>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-8">
          {[
            { label: 'Verified Masjids', value: '23+', icon: CheckCircle2 },
            { label: 'Active Members', value: '5k+', icon: Sparkles },
          ].map(stat => (
            <div key={stat.label} className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <stat.icon className="text-emerald-500 mb-3" size={24} />
              <div className="text-2xl font-black text-white">{stat.value}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Decorative Light Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* ── Right Side: Auth Form ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 relative">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-black text-xl">ﺑ</div>
            <span className="dark:text-white font-black text-xl tracking-tighter">Pernambut Connect</span>
          </div>

          <div className="mb-10">
            <h2 className="text-4xl font-black text-slate-950 dark:text-white tracking-tight mb-3">Sign in</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Welcome back! Please enter your details.</p>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-widest">
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" size={18} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="name@email.com"
                  className="form-input pl-14 h-16 text-slate-900 dark:text-white font-bold" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Password</label>
                <Link to="/forgot" className="text-xs font-black text-emerald-500 hover:text-emerald-600">Forgot Password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" size={18} />
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••"
                  className="form-input pl-14 h-16 text-slate-900 dark:text-white font-bold" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-500 transition-colors">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-action w-full h-16 shadow-xl shadow-emerald-500/20 text-lg">
              {loading ? <Loader2 className="animate-spin" size={24} /> : <>Sign In <ArrowRight size={20} strokeWidth={3} /></>}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Don't have an account? <Link to="/register" className="text-emerald-500 font-black hover:underline ml-1">Create an account</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
