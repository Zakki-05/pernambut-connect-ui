import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { loginWithEmail } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!email) return setError("Email is required");
    setLoading(true);
    setError('');
    try {
      const res = await loginWithEmail(email);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return setError("OTP is required");
    setLoading(true);
    setError('');
    try {
      const res = await loginWithEmail(email, otp);
      login(res.data.user, res.data.access);
      navigate('/select-mosque');
    } catch (err) {
      setError(err.response?.data?.error || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-[32px] shadow-2xl border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-primary-200 mb-4">
            <ShieldCheck className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-500">Sign in to Pernambut Connect</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium mb-6 text-center">
            {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleRequestOtp} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-primary-500 focus:bg-white transition-all text-gray-800"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Request OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Enter OTP</label>
              <input 
                type="text" 
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-4 text-center text-2xl tracking-widest bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-primary-500 focus:bg-white transition-all text-gray-800"
                placeholder="1234"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Verify & Login"}
            </button>
            <button 
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-gray-500 font-semibold text-sm hover:text-gray-900 transition-colors"
            >
              Back to Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
