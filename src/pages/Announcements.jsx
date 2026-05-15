import React, { useState } from 'react';
import { Search, SlidersHorizontal, Megaphone, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getHijriDate } from '../utils/dateUtils';

const data = [
  { id: 1, title: 'Jummah timing adjusted', content: 'The Jummah bayan will start at 1:15 PM instead of 1:00 PM this week due to extreme heat.', type: 'RELIGIOUS', priority: 'NORMAL', time: '2h ago' },
  { id: 2, title: 'Critical: Water maintenance', content: 'Wudu area is under maintenance. Please perform wudu at home for Isha prayers.', type: 'EMERGENCY', priority: 'URGENT', time: '5h ago' },
  { id: 3, title: 'Monthly Meeting', content: 'Monthly community meeting after Isha on Sunday. All members are requested to attend.', type: 'GENERAL', priority: 'IMPORTANT', time: '1d ago' },
];

const Announcements = () => {
  const [tab, setTab] = useState('ALL');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const hijri = getHijriDate();

  const filtered = data.filter(a => (tab === 'ALL' || a.type === tab || (tab === 'URGENT' && a.priority === 'URGENT')) && a.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-32">
      <header className="pt-16 pb-12 px-6 border-b border-slate-100 dark:border-slate-900">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] mb-6">
          <ArrowLeft size={16} /> Back
        </button>
        <h1 className="text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-none">Community Feed</h1>
        <p className="text-slate-500 font-bold text-sm mt-3 uppercase tracking-wider">{hijri.full}</p>
      </header>

      <main className="px-6 -mt-8 relative z-10 space-y-8 max-w-lg mx-auto">
        <div className="bg-white dark:bg-slate-900 p-2.5 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-950/5 flex items-center gap-3">
          <div className="flex-1 flex items-center gap-4 px-5">
            <Search size={20} className="text-slate-300" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search notifications..." className="bg-transparent border-none outline-none w-full text-sm font-black text-slate-950 dark:text-white placeholder:text-slate-300" />
          </div>
          <button className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors"><SlidersHorizontal size={20} /></button>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
          {['ALL', 'URGENT', 'RELIGIOUS', 'GENERAL'].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${tab === t ? 'bg-slate-950 text-white shadow-xl' : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-400'}`}>{t}</button>
          ))}
        </div>

        <div className="space-y-6">
          {filtered.map(a => (
            <div key={a.id} className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-blue-300 transition-all">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${a.priority === 'URGENT' ? 'bg-red-600 animate-pulse' : 'bg-blue-600'}`} />
                  <span className={`text-[10px] font-black uppercase tracking-[0.25em] ${a.priority === 'URGENT' ? 'text-red-600' : 'text-slate-400'}`}>{a.type}</span>
                </div>
                <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest">{a.time}</span>
              </div>
              <h3 className="text-lg font-black text-slate-950 dark:text-white leading-tight mb-3 group-hover:text-blue-600 transition-colors">{a.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-bold leading-relaxed">{a.content}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Announcements;
