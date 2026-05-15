import React, { useState } from 'react';
import { Search, SlidersHorizontal, Megaphone, ArrowLeft, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getHijriDate } from '../utils/dateUtils';

const data = [
  { id: 1, title: 'Jummah bayan timing changed', content: 'The Jummah bayan will start at 1:15 PM instead of 1:00 PM this week due to extreme heat.', type: 'RELIGIOUS', priority: 'NORMAL', time: '2h ago', ts: Date.now()-7.2e6 },
  { id: 2, title: 'Urgent: Water supply issue', content: 'Wudu area water supply is currently under maintenance. Please perform wudu at home if possible.', type: 'EMERGENCY', priority: 'URGENT', time: '5h ago', ts: Date.now()-1.8e7 },
  { id: 3, title: 'Community Meeting', content: 'Monthly community meeting will be held after Isha prayers on Sunday.', type: 'GENERAL', priority: 'IMPORTANT', time: '1d ago', ts: Date.now()-8.64e7 },
  { id: 4, title: 'Quran Class Registration', content: 'New batch starting from next week. Register your children at the office.', type: 'RELIGIOUS', priority: 'NORMAL', time: '2d ago', ts: Date.now()-1.728e8 },
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32">
      <header className="bg-white dark:bg-slate-900 pt-16 pb-12 px-6 border-b border-slate-100 dark:border-slate-800">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest mb-4">
          <ArrowLeft size={16} /> Back
        </button>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Updates</h1>
        <p className="text-slate-400 font-medium text-sm mt-1">{hijri.full}</p>
      </header>

      <main className="px-6 -mt-6 relative z-10 space-y-6 max-w-lg mx-auto">
        <div className="bg-white dark:bg-slate-900 p-2 rounded-[24px] border border-slate-100 dark:border-slate-800 shadow-soft flex items-center gap-3">
          <div className="flex-1 flex items-center gap-3 px-4">
            <Search size={18} className="text-slate-300" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search news..." className="bg-transparent border-none outline-none w-full text-sm font-bold text-slate-900 dark:text-white" />
          </div>
          <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400"><SlidersHorizontal size={18} /></button>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {['ALL', 'URGENT', 'RELIGIOUS', 'GENERAL'].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${tab === t ? 'bg-slate-900 dark:bg-brand-600 text-white' : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-400'}`}>{t}</button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map(a => (
            <div key={a.id} className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-brand-300 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${a.priority === 'URGENT' ? 'bg-red-500 animate-pulse' : 'bg-brand-400'}`} />
                  <span className={`text-[9px] font-black uppercase tracking-widest ${a.priority === 'URGENT' ? 'text-red-500' : 'text-slate-400'}`}>{a.type}</span>
                </div>
                <span className="text-[10px] font-bold text-slate-300">{a.time}</span>
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white leading-tight mb-2 group-hover:text-brand-600 transition-colors">{a.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{a.content}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Announcements;
