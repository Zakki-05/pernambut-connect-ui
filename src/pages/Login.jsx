import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
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
    if (!email || !password) return setError('Please fill in all fields.');
    setLoading(true); setError('');
    try {
      const res = await loginWithEmail(email, password);
      login(res.data.user, res.data.access, res.data.refresh);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password.');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto mb-6 bg-slate-900 dark:bg-brand-600 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-vivid">
            ﺑ
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Pernambut Connect</h1>
          <p className="text-slate-400 font-medium text-sm mt-1">Community Digital Hub</p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 border border-slate-100 dark:border-slate-800 shadow-soft">
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-1">Welcome back</h2>
          <p className="text-slate-400 font-medium text-sm mb-8">Sign in to your account</p>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 text-red-600 text-[11px] font-black uppercase tracking-widest border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="name@email.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-brand-600/10 focus:border-brand-600 transition-all text-slate-900 dark:text-white" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-brand-600/10 focus:border-brand-600 transition-all text-slate-900 dark:text-white" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-brand-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 shadow-vivid hover:-translate-y-1 transition-all disabled:opacity-50 mt-4">
              {loading ? <Loader2 className="animate-spin" size={20} /> : <>Sign In <ArrowRight size={20} /></>}
            </button>
          </form>

          <p className="text-center text-sm font-medium text-slate-400 mt-8">
            No account? <Link to="/register" className="text-brand-600 font-black">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
