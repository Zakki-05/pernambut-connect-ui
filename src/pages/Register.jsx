import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, User, Lock, Eye, EyeOff, Loader2, ArrowRight, ShieldCheck, RotateCcw, ArrowLeft, CheckCircle } from 'lucide-react';
import { registerUser, verifyOtp, resendOtp } from '../services/api.js';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Shared input wrapper ─────────────────────────────────────── */
const Field = ({ label, icon: Icon, children }) => (
  <div>
    <label className="block text-[11px] font-black text-gray-500 dark:text-gray-500 uppercase tracking-widest mb-1.5">
      {label}
    </label>
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-600 pointer-events-none" size={16} />
      {children}
    </div>
  </div>
);

const inputCls = "w-full pl-10 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600";

const Register = () => {
  const [formData, setFormData] = useState({ name: '', username: '', email: '', password: '' });
  const [showPass, setShowPass]   = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otp, setOtp]             = useState('');
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const [timer, setTimer]         = useState(180);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    let id;
    if (isVerifying && timer > 0) id = setInterval(() => setTimer(p => p - 1), 1000);
    return () => clearInterval(id);
  }, [isVerifying, timer]);

  const fmt = s => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.username) return setError('Please fill all required fields');
    setLoading(true); setError('');
    try {
      await registerUser(formData);
      setIsVerifying(true); setTimer(180);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally { setLoading(false); }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!otp) return setError('Please enter the verification code');
    setLoading(true); setError('');
    try {
      const res = await verifyOtp(formData.email, otp);
      login(res.data.user, res.data.access, res.data.refresh);
      navigate('/select-mosque');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid or expired OTP');
    } finally { setLoading(false); }
  };

  const handleResend = async () => {
    setLoading(true); setError('');
    try { await resendOtp(formData.email); setTimer(180); }
    catch { setError('Failed to resend OTP'); }
    finally { setLoading(false); }
  };

  const ErrorBox = ({ msg }) => msg ? (
    <div className="px-4 py-3 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/40 text-red-600 dark:text-red-400 text-sm font-semibold">
      {msg}
    </div>
  ) : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0c1410] flex flex-col overflow-hidden">
      {/* Gradient hero */}
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-br from-brand-800 via-brand-700 to-teal-600 rounded-b-[60px]">
        <div className="absolute inset-0 bg-hero-pattern bg-pattern opacity-40" />
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute top-20 -left-10 w-32 h-32 bg-teal-400/20 rounded-full blur-xl" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 py-10">
        {/* Brand */}
        <div className="text-center mb-7">
          <div className="w-18 h-18 mx-auto mb-3 w-[72px] h-[72px] bg-white rounded-[24px] flex items-center justify-center shadow-xl shadow-black/20">
            <span className="text-brand-700 text-3xl font-black">ﺑ</span>
          </div>
          <h1 className="text-white text-2xl font-black">Create Account</h1>
          <p className="text-brand-200 text-sm mt-1">Join Pernambut Connect</p>
        </div>

        <AnimatePresence mode="wait">
          {!isVerifying ? (
            /* ── Step 1: Registration form ── */
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-4xl shadow-modal border border-gray-100 dark:border-gray-800 p-7"
            >
              <h2 className="text-gray-900 dark:text-white text-xl font-black mb-0.5">Your details</h2>
              <p className="text-gray-400 dark:text-gray-500 text-sm mb-5">All fields marked * are required</p>

              <ErrorBox msg={error} />

              <form onSubmit={handleRegister} className={`space-y-4 ${error ? 'mt-4' : ''}`}>
                <Field label="Full Name" icon={User}>
                  <input type="text" name="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="Abdul Rahman" className={inputCls} />
                </Field>
                <Field label="Username *" icon={User}>
                  <input type="text" name="username" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})}
                    placeholder="abdulrahman" className={inputCls} required />
                </Field>
                <Field label="Email *" icon={Mail}>
                  <input type="email" name="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="you@email.com" className={inputCls} required />
                </Field>
                <Field label="Password *" icon={Lock}>
                  <input type={showPass ? 'text' : 'password'} name="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
                    placeholder="Min. 8 characters" className={`${inputCls} pr-12`} required />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </Field>

                <button type="submit" disabled={loading}
                  className="w-full mt-2 bg-gradient-to-r from-brand-600 to-teal-500 text-white font-black py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-brand hover:-translate-y-0.5 hover:shadow-brand-sm transition-all disabled:opacity-60 disabled:translate-y-0">
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <>Create Account <ArrowRight size={16} /></>}
                </button>
              </form>

              <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-5">
                Already have an account?{' '}
                <Link to="/login" className="text-brand-600 dark:text-brand-400 font-bold hover:underline">Sign in</Link>
              </p>
            </motion.div>
          ) : (
            /* ── Step 2: OTP verification ── */
            <motion.div
              key="otp"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-4xl shadow-modal border border-gray-100 dark:border-gray-800 p-7"
            >
              <button onClick={() => setIsVerifying(false)} className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm font-semibold mb-6 transition-colors">
                <ArrowLeft size={15} /> Back
              </button>

              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck size={28} className="text-brand-600 dark:text-brand-400" />
                </div>
                <h2 className="text-gray-900 dark:text-white text-xl font-black">Verify your email</h2>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-1.5">
                  We sent a 6-digit code to<br />
                  <span className="font-bold text-gray-700 dark:text-gray-300">{formData.email}</span>
                </p>
              </div>

              <ErrorBox msg={error} />

              <form onSubmit={handleVerify} className={`space-y-5 ${error ? 'mt-4' : ''}`}>
                {/* OTP Input */}
                <div>
                  <label className="block text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 text-center">
                    Enter 6-digit code
                  </label>
                  <input
                    type="text" inputMode="numeric" maxLength={6}
                    value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="0  0  0  0  0  0"
                    className="w-full py-4 bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-center text-2xl font-black tracking-[0.5em] text-gray-900 dark:text-white"
                  />
                </div>

                {/* Timer */}
                <div className="text-center">
                  <p className="text-xs text-gray-400 dark:text-gray-600 mb-0.5">Code expires in</p>
                  <p className={`text-lg font-black ${timer < 60 ? 'text-red-500' : 'text-brand-600 dark:text-brand-400'}`}>
                    {fmt(timer)}
                  </p>
                </div>

                <button type="submit" disabled={loading || timer === 0}
                  className="w-full bg-gradient-to-r from-brand-600 to-teal-500 text-white font-black py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-brand hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:translate-y-0">
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <><CheckCircle size={16} /> Verify & Continue</>}
                </button>

                <button type="button" onClick={handleResend} disabled={loading || timer > 120}
                  className="w-full flex items-center justify-center gap-1.5 text-brand-600 dark:text-brand-400 font-bold text-sm disabled:opacity-40 hover:underline transition-all">
                  <RotateCcw size={13} /> Resend code
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Steps indicator */}
        <div className="flex items-center gap-2 mt-5">
          <div className={`w-2 h-2 rounded-full transition-all ${!isVerifying ? 'bg-white w-5' : 'bg-white/30'}`} />
          <div className={`w-2 h-2 rounded-full transition-all ${isVerifying ? 'bg-white w-5' : 'bg-white/30'}`} />
        </div>
        <p className="text-white/40 text-xs mt-3">{isVerifying ? 'Step 2 of 2 — Verification' : 'Step 1 of 2 — Registration'}</p>
      </div>
    </div>
  );
};

export default Register;
