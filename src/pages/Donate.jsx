import React, { useState } from 'react';
import { Heart, QrCode, CheckCircle, Shield, ArrowLeft, Copy, MapPin, IndianRupee } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMosque } from '../context/MosqueContext';
import { useNavigate } from 'react-router-dom';
import { getHijriDate } from '../utils/dateUtils';

const UPI_ID = 'pernambut.connect@okaxis';

const Donate = () => {
  const { selectedMosque } = useMosque();
  const navigate = useNavigate();
  const hijri = getHijriDate();
  
  const [selectedCategory, setSelectedCategory] = useState('MAINTENANCE');
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);

  const categories = [
    { id: 'MAINTENANCE', label: 'Maintenance', icon: '🕌' },
    { id: 'CHARITY', label: 'Zakat', icon: '🤲' },
    { id: 'CONSTRUCTION', label: 'Construction', icon: '🧱' },
  ];

  const suggestedAmounts = [100, 500, 1000, 2000, 5000];

  const handlePayWithApp = () => {
    const currentCat = categories.find(c => c.id === selectedCategory);
    const label = currentCat ? currentCat.label : 'Donation';
    const payeeName = encodeURIComponent(selectedMosque?.name || 'Pernambut Mosque');
    const note = encodeURIComponent(`Donation - ${label}`);
    const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${payeeName}&am=${amount}&cu=INR&tn=${note}`;
    window.location.href = upiUrl;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32">
      <header className="bg-white dark:bg-slate-900 pt-16 pb-12 px-6 border-b border-slate-100 dark:border-slate-800">
        <button onClick={() => step === 1 ? navigate(-1) : setStep(1)} className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest mb-4 hover:text-brand-600 transition-colors">
          <ArrowLeft size={16} /> {step === 1 ? 'Back' : 'Change Amount'}
        </button>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          {step === 3 ? 'Thank You!' : 'Support Mosque'}
        </h1>
        <p className="text-slate-400 font-medium text-sm mt-1">{hijri.full}</p>
      </header>

      <div className="px-6 -mt-6 relative z-10 max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div key="form" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }} className="space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 border border-slate-100 dark:border-slate-800 shadow-soft">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shadow-sm">
                    <Heart size={24} className="fill-brand-600/10" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Contributing to</p>
                    <p className="text-base font-black text-slate-900 dark:text-white leading-tight">{selectedMosque?.name || 'Selected Mosque'}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Category</label>
                    <div className="grid grid-cols-3 gap-2">
                      {categories.map(c => (
                        <button key={c.id} onClick={() => setSelectedCategory(c.id)} className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${selectedCategory === c.id ? 'border-brand-600 bg-brand-50/50' : 'border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30'}`}>
                          <span className="text-xl">{c.icon}</span>
                          <span className={`text-[10px] font-black uppercase ${selectedCategory === c.id ? 'text-brand-600' : 'text-slate-400'}`}>{c.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Amount (₹)</label>
                    <div className="relative">
                      <IndianRupee size={24} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                      <input type="number" placeholder="0" value={amount} onChange={e => setAmount(e.target.value)} className="w-full pl-12 pr-6 py-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl text-4xl font-black outline-none focus:ring-4 focus:ring-brand-600/10 focus:border-brand-600 transition-all text-slate-900 dark:text-white" />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {suggestedAmounts.map(amt => (
                        <button key={amt} onClick={() => setAmount(amt.toString())} className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${amount === amt.toString() ? 'bg-brand-600 text-white shadow-vivid' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border border-slate-100 dark:border-slate-700'}`}>₹{amt}</button>
                      ))}
                    </div>
                  </div>

                  <button onClick={() => amount > 0 && setStep(2)} disabled={!amount} className="w-full bg-brand-600 text-white font-black py-5 rounded-2xl shadow-vivid hover:-translate-y-1 transition-all disabled:opacity-50 text-base mt-4">Continue to Payment</button>
                </div>
              </div>
            </motion.div>
          ) : step === 2 ? (
            <motion.div key="pay" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }} className="space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 border border-slate-100 dark:border-slate-800 shadow-soft text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Scan QR with UPI App</p>
                <div className="bg-white p-4 rounded-3xl border border-slate-100 inline-block mb-6 shadow-inner">
                  <img src={`https://chart.googleapis.com/chart?chs=280x280&cht=qr&chl=${encodeURIComponent(`upi://pay?pa=${UPI_ID}&pn=${selectedMosque?.name || 'Pernambut Mosque'}&am=${amount}&cu=INR`)}&choe=UTF-8`} alt="QR" className="w-48 h-48 mx-auto" />
                </div>
                <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">₹{Number(amount).toLocaleString('en-IN')}</h2>
                <p className="text-[10px] font-black text-brand-600 uppercase tracking-[0.2em]">{categories.find(c => c.id === selectedCategory)?.label}</p>
                
                <div className="mt-8 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <div className="text-left">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">UPI ID</p>
                    <p className="text-xs font-black text-slate-700 dark:text-slate-300">{UPI_ID}</p>
                  </div>
                  <button onClick={handleCopy} className="px-4 py-2 bg-white dark:bg-slate-700 rounded-xl border border-slate-100 dark:border-slate-600 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button onClick={handlePayWithApp} className="bg-slate-900 dark:bg-slate-800 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg"><QrCode size={20} /> Open UPI App</button>
                <button onClick={() => setStep(3)} className="bg-green-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-green-600/20"><CheckCircle size={20} /> I've Paid</button>
              </div>
            </motion.div>
          ) : (
             <motion.div key="success" initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} className="bg-white dark:bg-slate-900 rounded-[32px] p-12 text-center shadow-soft border border-slate-100 dark:border-slate-800">
                <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner"><CheckCircle size={48} /></div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3">Accepted! 🤲</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-8">May Allah accept your donation of <span className="font-black text-slate-900 dark:text-white">₹{amount}</span> and reward you manifold in this life and the hereafter.</p>
                <button onClick={() => navigate('/home')} className="w-full bg-brand-600 text-white font-black py-5 rounded-2xl shadow-vivid">Back to Community</button>
             </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-center gap-2 text-slate-300 text-[9px] font-black uppercase tracking-[0.3em]">
          <Shield size={12} /> SECURE CRYPTOGRAPHIC PAYMENT
        </div>
      </div>
    </div>
  );
};

export default Donate;
