import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { loginWithEmail, loginWithGoogleApi } from '../services/api';
import { signInWithGoogle, handleRedirectResult } from '../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Check for redirect result on mount
  useEffect(() => {
    const checkRedirect = async () => {
      try {
        const result = await handleRedirectResult();
        if (result) {
          setIsLoading(true);
          const token = await result.user.getIdToken();
          const response = await loginWithGoogleApi(token);
          const { access, user: userData } = response.data;
          
          login({ ...userData }, access);
          navigate('/select-mosque');
        }
      } catch (err) {
        console.error("Redirect error:", err);
        setError('Google Sign-in failed after redirect. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    checkRedirect();
  }, [login, navigate]);

  // If already logged in, redirect to home
  if (user) {
    return <Navigate to="/home" replace />;
  }

  const handleGoogleLogin = async () => {
    setError('');
    try {
      // This will redirect the whole page to Google
      await signInWithGoogle();
    } catch (err) {
      console.error(err);
      setError('Could not initiate Google Sign-in.');
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setIsLoading(true);
    setError('');
    
    try {
      // Step 1: Request OTP from backend
      await loginWithEmail(email);
      setStep(2);
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Failed to send OTP. Is your backend running?';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length < 4) return;
    setIsLoading(true);
    setError('');
    
    try {
      // Step 2: Send both email and OTP to verify
      const response = await loginWithEmail(email, otp);
      const { access, user: userData } = response.data;
      
      login({ ...userData }, access);
      navigate('/select-mosque');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center px-6 pb-20">
      <div className="text-center mb-10">
        <div className="bg-primary-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg text-white">
          <span className="text-3xl font-bold">PC</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pernambut Connect</h1>
        <p className="text-gray-500 text-sm">Your Smart Community Platform</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
          {step === 1 ? 'Login with Email' : 'Verify OTP'}
        </h2>

        {step === 1 ? (
          <>
            <form onSubmit={handleSendOtp}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500 transition-all">
                  <Mail size={18} className="text-gray-400 mr-2" />
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="bg-transparent border-none outline-none w-full text-gray-800 font-medium"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button 
                type="submit"
                disabled={!email.includes('@') || isLoading}
                className="w-full bg-primary-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center transition-colors hover:bg-primary-700 disabled:opacity-70 disabled:cursor-not-allowed shadow-md mb-4"
              >
                {isLoading ? 'Sending...' : 'Send OTP'}
                {!isLoading && <ArrowRight size={18} className="ml-2" />}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
              <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-400">Or continue with</span></div>
            </div>

            <button 
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full bg-white border border-gray-200 text-gray-700 font-semibold py-3.5 rounded-xl flex items-center justify-center transition-all hover:bg-gray-50 shadow-sm active:scale-95"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 mr-3" alt="Google" />
              Sign in with Google
            </button>
          </>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div className="bg-primary-50 border border-primary-100 rounded-xl p-3 mb-6 flex items-center justify-center space-x-2">
              <span className="text-primary-600 text-xs font-bold uppercase tracking-wider">Demo OTP:</span>
              <span className="text-primary-800 font-extrabold tracking-widest">1 2 3 4</span>
            </div>
            <p className="text-sm text-gray-500 mb-6 text-center">
              We've sent a 4-digit code to {email}. 
              <button type="button" onClick={() => setStep(1)} className="text-primary-600 ml-1 font-medium">Edit</button>
            </p>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500 transition-all">
                <Lock size={18} className="text-gray-400 mr-3" />
                <input 
                  type="text" 
                  placeholder="Enter 4-digit OTP"
                  className="bg-transparent border-none outline-none w-full text-gray-800 tracking-widest text-xl font-bold text-center"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  maxLength={4}
                  required
                />
              </div>
            </div>
            <button 
              type="submit"
              disabled={otp.length !== 4 || isLoading}
              className="w-full bg-primary-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center transition-colors hover:bg-primary-700 disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
            >
              {isLoading ? 'Verifying...' : 'Verify & Login'}
            </button>
          </form>
        )}

        {error && (
          <p className="mt-4 text-center text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-100">
            {error}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
