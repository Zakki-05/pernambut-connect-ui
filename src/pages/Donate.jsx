import React, { useState, useEffect } from 'react';
import { Heart, QrCode, CheckCircle, Shield, ArrowLeft, Copy, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMosque } from '../context/MosqueContext';

// ========== CONFIGURATION ==========
// ⚠️ REPLACE THIS with your real UPI ID before going live
const UPI_ID = 'pernambut.connect@okaxis';
// ====================================

const Donate = () => {
  const { selectedMosque } = useMosque();
  const [selectedCategory, setSelectedCategory] = useState('MAINTENANCE');
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState(1); // 1 = form, 2 = payment, 3 = success
  const [copied, setCopied] = useState(false);

  const categories = [
    { id: 'MAINTENANCE', label: 'Mosque Maintenance', icon: '🕌' },
    { id: 'CHARITY', label: 'Zakat / Charity', icon: '🤲' },
    { id: 'CONSTRUCTION', label: 'Construction Fund', icon: '🧱' },
  ];

  const suggestedAmounts = [100, 250, 500, 1000, 2500, 5000];

  const getUpiUrl = () => {
    const payeeName = encodeURIComponent(selectedMosque?.name || 'Pernambut Mosque');
    const note = encodeURIComponent(`Donation - ${categories.find(c => c.id === selectedCategory)?.label}`);
    return `upi://pay?pa=${UPI_ID}&pn=${payeeName}&am=${amount}&cu=INR&tn=${note}`;
  };

  const getQrImageUrl = () => {
    // Uses Google Charts API to generate a QR code image from the UPI URL
    const data = encodeURIComponent(getUpiUrl());
    return `https://chart.googleapis.com/chart?chs=280x280&cht=qr&chl=${data}&choe=UTF-8`;
  };

  const handleProceed = () => {
    if (!amount || Number(amount) <= 0) return;
    setStep(2);
  };

  const handlePayWithApp = (app) => {
    const upiUrl = getUpiUrl();
    // Intent URLs for specific apps on mobile
    const intents = {
      gpay: `gpay://upi/${upiUrl.replace('upi://', '')}`,
      phonepe: `phonepe://pay?${upiUrl.split('?')[1]}`,
      paytm: `paytmmp://pay?${upiUrl.split('?')[1]}`,
      generic: upiUrl,
    };
    window.location.href = intents[app] || upiUrl;
  };

  const handleCopyUpiId = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDone = () => {
    setStep(3);
    setTimeout(() => {
      setStep(1);
      setAmount('');
    }, 4000);
  };

  return (
    <div className="pb-24 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-700 via-primary-600 to-emerald-500 px-6 pt-12 pb-10 rounded-b-[36px] text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-6 -mb-6"></div>
        
        {step === 2 && (
          <button onClick={() => setStep(1)} className="flex items-center text-white/80 text-sm mb-3 hover:text-white">
            <ArrowLeft size={16} className="mr-1" /> Back
          </button>
        )}
        <h1 className="text-2xl font-bold mb-1">
          {step === 1 ? 'Support Your Mosque' : step === 2 ? 'Complete Payment' : 'Thank You! 🤲'}
        </h1>
        <p className="text-white/70 text-sm">
          {step === 1 ? 'Every contribution makes a difference' : step === 2 ? `Paying ₹${amount} via UPI` : 'May Allah reward you abundantly'}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {/* ========== STEP 1: SELECT CATEGORY & AMOUNT ========== */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="px-6 -mt-6"
          >
            <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
              {/* Mosque Name */}
              <div className="flex items-center text-gray-800 font-semibold mb-5 border-b border-gray-100 pb-3">
                <Heart size={18} className="text-primary-500 mr-2" />
                {selectedMosque?.name || 'Selected Mosque'}
              </div>

              {/* Category Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">What would you like to support?</label>
                <div className="flex flex-col space-y-2">
                  {categories.map((cat) => (
                    <div 
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedCategory === cat.id 
                        ? 'border-primary-500 bg-primary-50 shadow-sm' 
                        : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-xl mr-3">{cat.icon}</span>
                        <span className={`text-sm font-medium ${selectedCategory === cat.id ? 'text-primary-700' : 'text-gray-600'}`}>
                          {cat.label}
                        </span>
                      </div>
                      {selectedCategory === cat.id && <CheckCircle size={20} className="text-primary-600" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Amount Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Enter Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">₹</span>
                  <input 
                    type="number" 
                    placeholder="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full text-3xl font-bold border-2 border-gray-200 rounded-xl p-4 pl-12 outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-gray-800"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {suggestedAmounts.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setAmount(amt.toString())}
                      className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        amount === amt.toString()
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'border-2 border-gray-100 text-gray-600 hover:border-primary-200 hover:bg-primary-50'
                      }`}
                    >
                      ₹{amt.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Proceed Button */}
              <button 
                onClick={handleProceed}
                disabled={!amount || Number(amount) <= 0}
                className="w-full bg-primary-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-primary-700 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                Proceed to Pay ₹{amount || '0'}
              </button>

              <div className="flex items-center justify-center mt-4 text-gray-400 text-xs">
                <Shield size={12} className="mr-1" /> 100% Secure &middot; UPI Powered
              </div>
            </div>
          </motion.div>
        )}

        {/* ========== STEP 2: QR CODE + PAY BUTTONS ========== */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="px-6 -mt-6"
          >
            {/* QR Code Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center mb-4">
              <p className="text-sm font-medium text-gray-500 mb-4">Scan this QR code with any UPI app</p>
              <div className="bg-gray-50 rounded-2xl p-4 inline-block border-2 border-dashed border-gray-200 mb-4">
                <img 
                  src={getQrImageUrl()} 
                  alt="UPI QR Code" 
                  className="w-56 h-56 mx-auto"
                />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">₹{Number(amount).toLocaleString('en-IN')}</div>
              <p className="text-sm text-gray-500 mb-4">{categories.find(c => c.id === selectedCategory)?.label}</p>
              
              {/* Copy UPI ID */}
              <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between">
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">UPI ID</p>
                  <p className="text-sm font-semibold text-gray-800">{UPI_ID}</p>
                </div>
                <button 
                  onClick={handleCopyUpiId}
                  className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 flex items-center hover:bg-gray-50 transition-colors"
                >
                  {copied ? <><CheckCircle size={14} className="mr-1 text-green-500"/> Copied!</> : <><Copy size={14} className="mr-1"/> Copy</>}
                </button>
              </div>
            </div>

            {/* Pay with App Buttons */}
            <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100 mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-4 text-center">Or pay directly with your app</p>
              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => handlePayWithApp('generic')}
                  className="flex items-center justify-center w-full py-3.5 bg-primary-600 text-white rounded-xl font-bold text-base hover:bg-primary-700 transition-all shadow-md"
                >
                  <QrCode size={20} className="mr-2" /> Open UPI App
                </button>

                <div className="grid grid-cols-3 gap-3">
                  <button 
                    onClick={() => handlePayWithApp('gpay')}
                    className="flex flex-col items-center p-3 rounded-xl border-2 border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-all"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-1.5">
                      <span className="text-lg font-black text-blue-600">G</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-700">GPay</span>
                  </button>
                  <button 
                    onClick={() => handlePayWithApp('phonepe')}
                    className="flex flex-col items-center p-3 rounded-xl border-2 border-gray-100 hover:border-purple-300 hover:bg-purple-50 transition-all"
                  >
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-1.5">
                      <span className="text-lg font-black text-purple-600">P</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-700">PhonePe</span>
                  </button>
                  <button 
                    onClick={() => handlePayWithApp('paytm')}
                    className="flex flex-col items-center p-3 rounded-xl border-2 border-gray-100 hover:border-sky-300 hover:bg-sky-50 transition-all"
                  >
                    <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center mb-1.5">
                      <span className="text-lg font-black text-sky-600">₹</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-700">Paytm</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Done Button */}
            <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
              <button 
                onClick={handleDone}
                className="w-full py-3.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all flex items-center justify-center"
              >
                <CheckCircle size={18} className="mr-2" /> I've Completed the Payment
              </button>
            </div>
          </motion.div>
        )}

        {/* ========== STEP 3: SUCCESS ========== */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="px-6 -mt-6"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={40} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">JazakAllahu Khairan!</h2>
              <p className="text-gray-500 mb-2">Your donation of <span className="font-bold text-gray-800">₹{Number(amount).toLocaleString('en-IN')}</span> has been noted.</p>
              <p className="text-sm text-gray-400">May Allah accept your contribution</p>
              
              <div className="mt-6 bg-gray-50 rounded-xl p-4 text-left">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Mosque</span>
                  <span className="font-medium text-gray-800">{selectedMosque?.name}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Category</span>
                  <span className="font-medium text-gray-800">{categories.find(c => c.id === selectedCategory)?.label}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Amount</span>
                  <span className="font-bold text-green-600">₹{Number(amount).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Donate;
