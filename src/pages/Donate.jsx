import React, { useState } from 'react';
import { Heart, QrCode, CheckCircle, Shield, ArrowLeft, Copy, MapPin, IndianRupee, Sparkles, CheckCircle2 } from 'lucide-react';
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
    { id: 'MAINTENANCE', label: 'Mosque Maintenance', sub: 'Utility & Repairs', icon: '🕌', color: 'text-emerald-500' },
    { id: 'CHARITY', label: 'Zakat & Sadaqah', sub: 'Welfare & Help', icon: '🤲', color: 'text-amber-500' },
    { id: 'CONSTRUCTION', label: 'Construction Fund', sub: 'Building Growth', icon: '🧱', color: 'text-blue-500' },
  ];

  const suggestedAmounts = [500, 1000, 2500, 5000];

  const handlePayWithApp = () => {
    const payeeName = encodeURIComponent(selectedMosque?.name || 'Pernambut Mosque');
    const note = encodeURIComponent(`Donation - ${selectedCategory}`);
    const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${payeeName}&am=${amount}&cu=INR&tn=${note}`;
    window.location.href = upiUrl;
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-[#020617] pb-40">
      {/* ── Progress Header ── */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#020617]/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 px-6 py-6">
        <div className="w-full flex items-center justify-between">
          <button onClick={() => step === 1 ? navigate(-1) : setStep(1)} className="flex items-center gap-3 text-slate-400 hover:text-emerald-500 transition-colors group">
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:-translate-x-1 transition-transform">
              <ArrowLeft size={16} />
            </div>
            <span className="text-xs font-black uppercase tracking-widest">{step === 1 ? 'Go Back' : 'Amount Selection'}</span>
          </button>
          
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-1.5 rounded-full transition-all duration-500 ${step >= s ? 'w-8 bg-emerald-500' : 'w-2 bg-slate-200 dark:bg-slate-800'}`} />
            ))}
          </div>
        </div>
      </header>

      <main className="w-full px-6 py-12">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div key="form" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }} className="space-y-10">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-6">Support Local Cause</div>
                <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-4">Select Contribution</h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Your support helps strengthen the {selectedMosque?.name || 'community'}.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {categories.map(c => (
                  <button key={c.id} onClick={() => setSelectedCategory(c.id)} className={`premium-card text-left flex flex-col items-start gap-4 ${selectedCategory === c.id ? 'border-emerald-500 ring-4 ring-emerald-500/5' : 'hover:border-slate-300'}`}>
                    <span className="text-3xl">{c.icon}</span>
                    <div>
                      <h3 className={`text-sm font-black transition-colors ${selectedCategory === c.id ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>{c.label}</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{c.sub}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="premium-card space-y-8">
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-4 ml-1">Enter Amount (INR)</label>
                  <div className="relative group">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-3">
                      <IndianRupee size={32} className="text-slate-300 dark:text-slate-600 group-focus-within:text-emerald-500 transition-colors" />
                      <div className="w-px h-8 bg-slate-200 dark:bg-slate-800" />
                    </div>
                    <input type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} 
                      className="form-input h-24 pl-24 text-4xl font-black text-slate-900 dark:text-white placeholder:text-slate-200 dark:placeholder:text-slate-800" />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {suggestedAmounts.map(amt => (
                    <button key={amt} onClick={() => setAmount(amt.toString())} className={`py-4 rounded-2xl text-sm font-black transition-all ${amount === amt.toString() ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-500 hover:border-slate-300'}`}>₹{amt}</button>
                  ))}
                </div>

                <button onClick={() => amount > 0 && setStep(2)} disabled={!amount} 
                  className="btn-action w-full h-18 text-xl shadow-2xl shadow-emerald-500/20 disabled:opacity-50 mt-4">
                  Continue to Payment
                </button>
              </div>
            </motion.div>
          ) : step === 2 ? (
            <motion.div key="pay" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }} className="space-y-8">
              <div className="premium-card text-center py-12 relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-8">Secure UPI Gateway</div>
                
                <div className="relative inline-block mb-10">
                   <div className="absolute inset-0 bg-emerald-500/5 rounded-[48px] blur-2xl scale-150" />
                   <div className="relative bg-white p-6 rounded-[48px] border border-slate-100 shadow-inner">
                     <img src={`https://chart.googleapis.com/chart?chs=280x280&cht=qr&chl=${encodeURIComponent(`upi://pay?pa=${UPI_ID}&pn=${selectedMosque?.name}&am=${amount}&cu=INR`)}&choe=UTF-8`} alt="QR" className="w-56 h-56 mx-auto rounded-3xl" />
                   </div>
                </div>

                <h2 className="text-5xl font-black text-slate-950 dark:text-white tracking-tighter mb-4">₹{Number(amount).toLocaleString('en-IN')}</h2>
                <p className="text-sm font-black text-emerald-500 uppercase tracking-[0.3em] mb-10">{selectedCategory} Fund</p>
                
                <div className="max-w-xs mx-auto flex items-center justify-between bg-slate-50 dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800">
                  <div className="text-left">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Official Address</p>
                    <p className="text-xs font-black text-slate-900 dark:text-slate-200">{UPI_ID}</p>
                  </div>
                  <button onClick={() => { navigator.clipboard.writeText(UPI_ID); setCopied(true); setTimeout(() => setCopied(false), 2000); }} 
                    className="p-3 bg-white dark:bg-slate-800 rounded-xl text-slate-500 hover:text-emerald-500 transition-colors shadow-sm">
                    {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={handlePayWithApp} className="flex items-center justify-center gap-3 h-18 rounded-[28px] bg-slate-950 text-white font-black text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl">
                  <QrCode size={22} /> Open Mobile App
                </button>
                <button onClick={() => setStep(3)} className="flex items-center justify-center gap-3 h-18 rounded-[28px] bg-emerald-500 text-white font-black text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-emerald-500/20">
                  <CheckCircle size={22} /> I've Completed Payment
                </button>
              </div>
            </motion.div>
          ) : (
             <motion.div key="success" initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} className="premium-card text-center py-20 px-10">
                <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-500 rounded-[40px] flex items-center justify-center mx-auto mb-10 shadow-inner">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12 }}>
                    <CheckCircle2 size={56} strokeWidth={3} />
                  </motion.div>
                </div>
                <h2 className="text-4xl font-black text-slate-950 dark:text-white mb-4 tracking-tight leading-tight">Contribution <br/> Successfully Received</h2>
                <p className="text-slate-500 dark:text-slate-400 text-lg font-bold leading-relaxed mb-12 max-w-sm mx-auto">
                  May Allah accept your donation of <span className="text-emerald-500">₹{amount}</span> and bless the community in Pernambut.
                </p>
                <button onClick={() => navigate('/home')} className="btn-action w-full h-18 text-lg">Return to Dashboard</button>
             </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-20 flex items-center justify-center gap-3 text-slate-300 dark:text-slate-700 text-[10px] font-black uppercase tracking-[0.4em]">
          <Shield size={14} /> Global Standard Security Protocol
        </div>
      </main>
    </div>
  );
};

export default Donate;
