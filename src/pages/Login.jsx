import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, Sparkles } from 'lucide-react';
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
    setLoading(true);
    setError('');
    try {
      const res = await loginWithEmail(email, password);
      login(res.data.user, res.data.access, res.data.refresh);
      navigate('/select-mosque');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f0a] flex flex-col overflow-hidden">

      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-br from-primary-800 via-primary-700 to-teal-600 rounded-b-[60px]" />
      <div className="absolute top-20 right-6 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      <div className="absolute top-10 left-10 w-24 h-24 bg-primary-400/20 rounded-full blur-xl" />
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '18px 18px' }}
      />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 py-12">

        {/* Brand */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-3xl flex items-center justify-center shadow-xl shadow-primary-900/30">
            <span className="text-primary-700 text-3xl font-black">ﺑ</span>
          </div>
          <h1 className="text-white text-3xl font-black tracking-tight drop-shadow-lg">Pernambut Connect</h1>
          <p className="text-primary-200 text-sm mt-1.5 font-medium">Your Muslim community hub</p>
        </div>

        {/* Card */}
        <div className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-4xl shadow-2xl border border-gray-100 dark:border-gray-800 p-7">
          <h2 className="text-gray-900 dark:text-gray-100 text-xl font-black mb-1">Welcome back</h2>
          <p className="text-gray-400 dark:text-gray-500 text-sm mb-6">Sign in to your account</p>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/40 text-red-600 dark:text-red-400 text-sm font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-600" size={17} />
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  placeholder="your@email.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:focus:border-primary-400 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-600" size={17} />
                <input
                  type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:focus:border-primary-400 transition-all"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-primary-600 to-teal-500 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 shadow-brand hover:shadow-brand-sm hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:translate-y-0 mt-2">
              {loading ? <Loader2 className="animate-spin" size={18} /> : <>Sign In <ArrowRight size={16} /></>}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-6">
            No account?{' '}
            <Link to="/register" className="text-primary-600 dark:text-primary-400 font-bold hover:underline">Create one</Link>
          </p>
        </div>

        <p className="mt-6 text-primary-300/60 text-xs font-medium">Community Platform • Pernambut, TN</p>
      </div>
    </div>
  );
};

export default Login;
