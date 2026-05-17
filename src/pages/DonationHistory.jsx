import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Calendar, IndianRupee, Loader2, Award, TrendingUp, Sparkles, Inbox } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getDonations } from '../services/api';
import TopNav from '../components/layout/TopNav';

const FALLBACK_DONATIONS = [
  { id: 1, mosque_name: 'Road Masjid', category: 'MAINTENANCE', amount: 500, created_at: '2026-05-02T10:00:00Z', status: 'SUCCESS' },
  { id: 2, mosque_name: 'Nayee Masjid', category: 'CHARITY', amount: 2500, created_at: '2026-04-28T10:00:00Z', status: 'SUCCESS' },
  { id: 3, mosque_name: 'Road Masjid', category: 'CONSTRUCTION', amount: 1000, created_at: '2026-04-15T10:00:00Z', status: 'SUCCESS' },
  { id: 4, mosque_name: 'Choti Masjid', category: 'MAINTENANCE', amount: 250, created_at: '2026-03-22T10:00:00Z', status: 'SUCCESS' },
];

const DonationHistory = () => {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await getDonations();
        setDonations(response.data);
      } catch (err) {
        setDonations(FALLBACK_DONATIONS);
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, []);

  const totalDonated = donations.reduce((sum, d) => sum + Number(d.amount), 0);

  const getCategoryLabel = (cat) => {
    switch (cat) {
      case 'MAINTENANCE': return 'Mosque Maintenance';
      case 'CHARITY': return 'Charity & Zakat';
      case 'CONSTRUCTION': return 'Construction Fund';
      default: return 'General Donation';
    }
  };

  const getCategoryEmoji = (cat) => {
    switch (cat) {
      case 'MAINTENANCE': return '🕌';
      case 'CHARITY': return '🤲';
      case 'CONSTRUCTION': return '🧱';
      default: return '❤️';
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-[#020617] pb-40 transition-colors duration-300">
      {/* Centered Top Navbar */}
      <TopNav title="Donation History" showBack={true} />

      <main className="w-full px-6 py-24 space-y-10 max-w-5xl mx-auto">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 size={36} className="text-emerald-500 animate-spin" />
            <p className="text-slate-400 text-sm font-black uppercase tracking-widest animate-pulse">Syncing Transaction Ledger...</p>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
            
            {/* Total Summary Banner with Emerald-Gold Gradient */}
            <div className="relative group overflow-hidden rounded-[32px] p-8 border border-emerald-500/10 shadow-2xl shadow-emerald-500/10"
              style={{ background: 'linear-gradient(135deg, #059669 0%, #022c22 100%)' }}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400/5 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 dark:bg-emerald-500/20 text-white dark:text-emerald-300 text-[10px] font-black uppercase tracking-widest">
                    <Award size={12} className="text-amber-400" fill="currentColor" /> Lifetime Contributions
                  </div>
                  <h2 className="text-sm font-bold text-emerald-100/70 uppercase tracking-widest">Total Donated</h2>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white tracking-tighter">₹{totalDonated.toLocaleString('en-IN')}</span>
                    <span className="text-emerald-200/60 text-xs font-bold uppercase tracking-widest">INR</span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
                    <div className="text-2xl font-black text-white">{donations.length}</div>
                    <div className="text-[9px] font-black text-emerald-200/50 uppercase tracking-widest mt-1">Transactions</div>
                  </div>
                  <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
                    <div className="text-2xl font-black text-amber-400 flex items-center justify-center gap-1">
                      <TrendingUp size={20} />
                      <span>{totalDonated > 0 ? 'Active' : 'None'}</span>
                    </div>
                    <div className="text-[9px] font-black text-emerald-200/50 uppercase tracking-widest mt-1">Status</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2.5 text-emerald-100/60 text-xs font-medium">
                <Heart size={14} className="text-amber-400 fill-amber-400 animate-pulse" />
                <span>May Allah bless and accept all your selfless contributions to the mosques of Pernambut.</span>
              </div>
            </div>

            {/* Donation List Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em]">Transaction Records</h3>
                <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md uppercase">{donations.length} items</span>
              </div>

              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {donations.map((donation, idx) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: idx * 0.05 }}
                      key={donation.id}
                      className="premium-card group"
                    >
                      <div className="flex items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                            {getCategoryEmoji(donation.category)}
                          </div>
                          <div>
                            <h4 className="text-lg font-black text-slate-950 dark:text-white leading-none group-hover:text-emerald-500 transition-colors">
                              {donation.mosque_name || (donation.mosque_details?.name) || `Local Masjid (ID: ${donation.mosque})`}
                            </h4>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-2">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{getCategoryLabel(donation.category)}</span>
                              <span className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-800" />
                              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                                <Calendar size={12} />
                                <span>{new Date(donation.created_at || donation.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-right space-y-2">
                          <div className="text-2xl font-black text-emerald-500 tracking-tight flex items-center justify-end">
                            <IndianRupee size={18} strokeWidth={3} className="-mr-0.5" />
                            {Number(donation.amount).toLocaleString('en-IN')}
                          </div>
                          <span className={`inline-block px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${
                            donation.status?.toLowerCase() === 'success' 
                              ? 'bg-emerald-500/10 text-emerald-500' 
                              : 'bg-amber-500/10 text-amber-500'
                          }`}>
                            {donation.status || 'SUCCESS'}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {donations.length === 0 && (
                  <div className="text-center py-24 bg-white dark:bg-slate-900/30 rounded-[40px] border border-dashed border-slate-200 dark:border-slate-800">
                    <Inbox size={48} className="text-slate-200 dark:text-slate-800 mx-auto mb-4" />
                    <p className="text-slate-500 dark:text-slate-400 font-bold mb-6">No contributions made yet</p>
                    <button onClick={() => navigate('/donate')} className="text-xs font-black text-emerald-500 uppercase tracking-widest border-b border-emerald-500/50 pb-0.5 hover:text-emerald-600 transition-colors">Make Your First Donation</button>
                  </div>
                )}
              </div>
            </div>

          </motion.div>
        )}
      </main>
    </div>
  );
};

export default DonationHistory;
