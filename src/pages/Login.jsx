import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Phone, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { loginWithPhone } from '../services/api';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect to home
  if (user) {
    return <Navigate to="/home" replace />;
  }

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (phoneNumber.length < 10) return;
    setIsLoading(true);
    setError('');
    
    try {
      // Step 1: Request OTP from backend
      await loginWithPhone(phoneNumber);
      setStep(2);
    } catch (err) {
      setError('Failed to send OTP. Is your backend running?');
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
      // Step 2: Send both phone and OTP to verify
      const response = await loginWithPhone(phoneNumber, otp);
      const { access, user: userData } = response.data;
      
      login({ ...userData, phone: phoneNumber }, access);
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
          {step === 1 ? 'Login with Phone' : 'Verify OTP'}
        </h2>

        {step === 1 ? (
          <form onSubmit={handleSendOtp}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500 transition-all">
                <span className="text-gray-500 font-medium mr-2 border-r border-gray-300 pr-2">+91</span>
                <Phone size={18} className="text-gray-400 mr-2" />
                <input 
                  type="tel" 
                  placeholder="Enter 10 digit number"
                  className="bg-transparent border-none outline-none w-full text-gray-800 font-medium"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  maxLength={10}
                  required
                />
              </div>
            </div>
            <button 
              type="submit"
              disabled={phoneNumber.length !== 10 || isLoading}
              className="w-full bg-primary-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center transition-colors hover:bg-primary-700 disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
            >
              {isLoading ? 'Sending...' : 'Send OTP'}
              {!isLoading && <ArrowRight size={18} className="ml-2" />}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div className="bg-primary-50 border border-primary-100 rounded-xl p-3 mb-6 flex items-center justify-center space-x-2">
              <span className="text-primary-600 text-xs font-bold uppercase tracking-wider">Demo OTP:</span>
              <span className="text-primary-800 font-extrabold tracking-widest">1 2 3 4</span>
            </div>
            <p className="text-sm text-gray-500 mb-6 text-center">
              We've sent a 4-digit code to +91 {phoneNumber}. 
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
      </motion.div>
    </div>
  );
};

export default Login;
