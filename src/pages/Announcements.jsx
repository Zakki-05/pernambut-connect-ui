import React, { useState } from 'react';
import { Search, SlidersHorizontal, Megaphone, ArrowLeft, Clock, Share2, AlertCircle, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getHijriDate } from '../utils/dateUtils';

const data = [
  { id: 1, title: 'Jummah timing adjusted', content: 'The Jummah bayan will start at 1:15 PM instead of 1:00 PM this week due to extreme heat.', type: 'RELIGIOUS', priority: 'NORMAL', time: '2h ago', author: 'Masjid Committee' },
  { id: 2, title: 'Critical: Water maintenance', content: 'Wudu area is under maintenance. Please perform wudu at home for Isha prayers.', type: 'EMERGENCY', priority: 'URGENT', time: '5h ago', author: 'Maintenance Team' },
  { id: 3, title: 'Monthly Meeting', content: 'Monthly community meeting after Isha on Sunday. All members are requested to attend.', type: 'GENERAL', priority: 'IMPORTANT', time: '1d ago', author: 'Community Hub' },
  { id: 4, title: 'Quran Class Registration', content: 'New batch starting from next week. Register your children at the office.', type: 'RELIGIOUS', priority: 'NORMAL', time: '2d ago', author: 'Islamic School' },
];

const Announcements = () => {
  const [tab, setTab] = useState('ALL');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const hijri = getHijriDate();

  const filtered = data.filter(a => {
    const matchTab = tab === 'ALL' || a.type === tab || (tab === 'URGENT' && a.priority === 'URGENT');
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-[#020617] pb-40">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#020617]/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 px-6 py-6">
        <div className="w-full flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-3 text-slate-400 hover:text-emerald-500 transition-colors group">
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:-translate-x-1 transition-transform">
              <ArrowLeft size={16} />
            </div>
            <span className="text-xs font-black uppercase tracking-widest">Back</span>
          </button>
          
          <div className="flex flex-col items-start">
             <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">Community Feed</h1>
             <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{hijri.full}</p>
          </div>
        </div>
      </header>

      <main className="w-full px-6 py-12 space-y-10">
        
        {/* Search & Filter */}
        <div className="space-y-6">
          <div className="premium-card p-2 flex items-center gap-3 shadow-xl shadow-slate-900/5">
            <div className="flex-1 flex items-center gap-4 px-5 h-14">
              <Search size={20} className="text-slate-300" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Filter announcements..." 
                className="bg-transparent border-none outline-none w-full text-base font-bold text-slate-900 dark:text-white" />
            </div>
            <button className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400"><SlidersHorizontal size={20} /></button>
          </div>

          <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
            {['ALL', 'URGENT', 'RELIGIOUS', 'GENERAL'].map(t => (
              <button key={t} onClick={() => setTab(t)} className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${tab === t ? 'bg-slate-950 text-white shadow-xl shadow-slate-900/40' : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-400'}`}>{t}</button>
            ))}
          </div>
        </div>

        {/* Feed */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => (
              <motion.div layout initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:idx*0.05 }}
                key={item.id} className="premium-card group relative">
                
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${item.priority === 'URGENT' ? 'bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400' : 'bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400'}`}>
                      {item.priority === 'URGENT' ? <AlertCircle size={20} strokeWidth={2.5} /> : <Megaphone size={20} strokeWidth={2.5} />}
                    </div>
                    <div>
                      <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${item.priority === 'URGENT' ? 'text-red-500' : 'text-emerald-500'}`}>{item.type}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{item.time}</p>
                    </div>
                  </div>
                  <button className="p-3 text-slate-200 hover:text-emerald-500 transition-colors"><Share2 size={18} /></button>
                </div>

                <h3 className="text-xl font-black text-slate-950 dark:text-white leading-tight mb-4 group-hover:text-emerald-500 transition-colors">{item.title}</h3>
                <p className="text-base text-slate-500 dark:text-slate-400 font-bold leading-relaxed mb-8">{item.content}</p>
                
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[10px] font-black text-slate-400">P</div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Post by {item.author}</span>
                   </div>
                   <button className="text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:translate-x-1 transition-transform flex items-center gap-2">Read Detail <ChevronRight size={12} strokeWidth={3} /></button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Announcements;
