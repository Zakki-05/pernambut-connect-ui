import React, { useState } from 'react';
import { Heart, QrCode, CheckCircle, Shield, ArrowLeft, Copy, IndianRupee, MapPin } from 'lucide-react';
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
    const payeeName = encodeURIComponent(selectedMosque?.name || 'Pernambut Mosque');
    const note = encodeURIComponent(`Donation - ${selectedCategory}`);
    const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${payeeName}&am=${amount}&cu=INR&tn=${note}`;
    window.location.href = upiUrl;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-32">
      <header className="pt-16 pb-12 px-6 border-b border-slate-100 dark:border-slate-900">
        <button onClick={() => step === 1 ? navigate(-1) : setStep(1)} className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest mb-4 hover:text-blue-600 transition-colors">
          <ArrowLeft size={16} /> {step === 1 ? 'Back' : 'Change Amount'}
        </button>
        <h1 className="text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-none">
          {step === 3 ? 'Accepted! 🤲' : 'Support Community'}
        </h1>
        <p className="text-slate-500 font-bold text-sm mt-3 uppercase tracking-wider">{hijri.full}</p>
      </header>

      <div className="px-6 -mt-8 relative z-10 max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div key="form" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }} className="space-y-8">
              <div className="bg-white dark:bg-slate-900 rounded-[40px] p-8 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-900/5">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center shadow-inner border border-blue-100 dark:border-blue-800">
                    <Heart size={28} className="fill-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Your Donation to</p>
                    <p className="text-lg font-black text-slate-950 dark:text-white leading-tight">{selectedMosque?.name || 'Selected Mosque'}</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Select Category</label>
                    <div className="grid grid-cols-3 gap-3">
                      {categories.map(c => (
                        <button key={c.id} onClick={() => setSelectedCategory(c.id)} className={`flex flex-col items-center gap-3 p-5 rounded-3xl border-2 transition-all ${selectedCategory === c.id ? 'border-blue-600 bg-blue-50/30 dark:bg-blue-900/20' : 'border-slate-50 dark:border-slate-800'}`}>
                          <span className="text-2xl">{c.icon}</span>
                          <span className={`text-[10px] font-black uppercase tracking-wider ${selectedCategory === c.id ? 'text-blue-600' : 'text-slate-400'}`}>{c.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Amount (₹)</label>
                    <div className="relative">
                      <IndianRupee size={28} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
                      <input type="number" placeholder="0" value={amount} onChange={e => setAmount(e.target.value)} className="w-full pl-16 pr-8 py-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-3xl text-5xl font-black outline-none focus:ring-8 focus:ring-blue-600/5 focus:border-blue-600 transition-all text-slate-950 dark:text-white" />
                    </div>
                    <div className="flex flex-wrap gap-2.5 mt-5">
                      {suggestedAmounts.map(amt => (
                        <button key={amt} onClick={() => setAmount(amt.toString())} className={`px-5 py-3 rounded-2xl text-xs font-black transition-all ${amount === amt.toString() ? 'bg-slate-950 text-white shadow-xl' : 'bg-white dark:bg-slate-800 text-slate-400 border border-slate-100 dark:border-slate-700'}`}>₹{amt}</button>
                      ))}
                    </div>
                  </div>

                  <button onClick={() => amount > 0 && setStep(2)} disabled={!amount} className="w-full bg-blue-600 text-white font-black py-6 rounded-3xl shadow-xl shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-1 transition-all disabled:opacity-50 text-base mt-6">Continue to Checkout</button>
                </div>
              </div>
            </motion.div>
          ) : step === 2 ? (
            <motion.div key="pay" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }} className="space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-[40px] p-10 border border-slate-100 dark:border-slate-800 shadow-xl text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Scan QR Code</p>
                <div className="bg-white p-5 rounded-[40px] border border-slate-100 inline-block mb-8 shadow-inner">
                  <img src={`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${encodeURIComponent(`upi://pay?pa=${UPI_ID}&pn=${selectedMosque?.name}&am=${amount}&cu=INR`)}&choe=UTF-8`} alt="QR" className="w-56 h-56 mx-auto" />
                </div>
                <h2 className="text-5xl font-black text-slate-950 dark:text-white mb-3 tracking-tight">₹{Number(amount).toLocaleString('en-IN')}</h2>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-10">Donation Verified</p>
                
                <div className="mt-4 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-5 rounded-3xl border border-slate-100 dark:border-slate-700">
                  <div className="text-left">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Official UPI ID</p>
                    <p className="text-sm font-black text-slate-950 dark:text-white">{UPI_ID}</p>
                  </div>
                  <button onClick={handleCopy} className="px-5 py-2.5 bg-white dark:bg-slate-700 rounded-2xl border border-slate-100 dark:border-slate-600 text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">{copied ? 'Copied' : 'Copy'}</button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button onClick={handlePayWithApp} className="bg-slate-950 text-white font-black py-5 rounded-3xl flex items-center justify-center gap-3 shadow-xl"><QrCode size={20} /> Use Mobile App</button>
                <button onClick={() => setStep(3)} className="bg-green-600 text-white font-black py-5 rounded-3xl flex items-center justify-center gap-3 shadow-xl shadow-green-600/20"><CheckCircle size={20} /> I Have Paid</button>
              </div>
            </motion.div>
          ) : (
             <motion.div key="success" initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} className="bg-white dark:bg-slate-900 rounded-[48px] p-16 text-center shadow-xl border border-slate-100 dark:border-slate-800">
                <div className="w-28 h-28 bg-green-50 text-green-500 rounded-[40px] flex items-center justify-center mx-auto mb-10 shadow-inner"><CheckCircle size={56} strokeWidth={3} /></div>
                <h2 className="text-4xl font-black text-slate-950 dark:text-white mb-4 tracking-tight">JazakAllahu <br/> Khairan!</h2>
                <p className="text-slate-500 dark:text-slate-400 text-base font-bold leading-relaxed mb-10 px-4">May Allah accept your contribution of <span className="text-slate-950 dark:text-white">₹{amount}</span> and bless you manifold.</p>
                <button onClick={() => navigate('/home')} className="w-full bg-blue-600 text-white font-black py-6 rounded-3xl shadow-xl shadow-blue-600/30">Back to Community</button>
             </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-16 flex items-center justify-center gap-3 text-slate-300 text-[10px] font-black uppercase tracking-[0.4em]">
          <Shield size={14} /> Encrypted Gateway
        </div>
      </div>
    </div>
  );
};

export default Donate;
