import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMosque } from '../context/MosqueContext';
import { 
  MapPin, Bell, Clock, ChevronRight, AlertCircle, 
  Calendar, Heart, Users, Megaphone, Star, Search
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getHijriDate } from '../utils/dateUtils';
import MasjidList from '../components/mosque/MasjidList';
import BayanSection from '../components/layout/BayanSection';

const Home = () => {
  const { selectedMosque } = useMosque();
  const navigate = useNavigate();
  const hijri = getHijriDate();
  const today = new Date();
  
  const dayName = today.toLocaleDateString('en-IN', { weekday: 'long' });
  const fullDate = today.toLocaleDateString('en-IN', { day: 'numeric', month: 'long' });

  const prayerTimes = [
    { name: 'Fajr', time: '04:52', active: false },
    { name: 'Dhuhr', time: '12:22', active: false },
    { name: 'Asr', time: '03:48', active: true },
    { name: 'Maghrib', time: '06:38', active: false },
    { name: 'Isha', time: '07:52', active: false },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32">
      {/* ── Clear Header ── */}
      <header className="bg-white dark:bg-slate-900 pt-16 pb-8 px-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-[10px] font-black text-brand-600 uppercase tracking-[0.2em] mb-1">{hijri.full}</p>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{dayName}</h1>
            <p className="text-slate-400 font-medium text-sm mt-0.5">{fullDate}</p>
          </div>
          <button onClick={() => navigate('/profile')} className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700 relative">
            <Bell size={22} />
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-brand-600 border-4 border-white dark:border-slate-900 rounded-full" />
          </button>
        </div>

        {selectedMosque && (
          <button onClick={() => navigate('/select-mosque')} className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 group transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center text-brand-600 shadow-sm"><MapPin size={18} /></div>
              <div className="text-left">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Mosque</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedMosque.name}</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-300 group-hover:text-brand-600 transition-colors" />
          </button>
        )}
      </header>

      <main className="px-6 py-8 space-y-8 max-w-lg mx-auto">
        
        {/* ── Prayer Times Grid ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-black text-slate-900 dark:text-white">Prayer Timings</h2>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400"><Clock size={14} /> Pernambut</div>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {prayerTimes.map(p => (
              <div key={p.name} className={`flex flex-col items-center py-3 rounded-2xl border transition-all ${p.active ? 'bg-brand-600 border-brand-600 shadow-vivid text-white scale-105' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400'}`}>
                <span className={`text-[9px] font-black uppercase mb-1 ${p.active ? 'text-white/70' : 'text-slate-400'}`}>{p.name}</span>
                <span className={`text-sm font-black ${p.active ? 'text-white' : 'text-slate-900 dark:text-slate-200'}`}>{p.time}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Announcements (Horizontal Scroll) ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-black text-slate-900 dark:text-white">Announcements</h2>
            <button onClick={() => navigate('/announcements')} className="text-brand-600 text-xs font-bold">View All</button>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
            {[1, 2].map(i => (
              <div key={i} onClick={() => navigate('/announcements')} className="min-w-[280px] bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm cursor-pointer hover:border-brand-300 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-black text-red-500 uppercase">Urgent Update</span>
                </div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white leading-snug mb-2">Jummah Bayan timing changed to 1:15 PM this week.</h3>
                <p className="text-xs text-slate-500 font-medium line-clamp-2">The mosque committee has decided to adjust timings due to the ongoing heatwave...</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Quick Action Grid ── */}
        <section>
          <h2 className="text-base font-black text-slate-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { l: 'Donate',     s: 'Charity',    i: Heart,     c: 'text-brand-600 bg-brand-50/50', p: '/donate' },
              { l: 'Wafat',      s: 'Death News', i: BookOpen,   c: 'text-slate-600 bg-slate-100',   p: '/death-news' },
              { l: 'Events',     s: 'Gatherings', i: Calendar,   c: 'text-blue-600 bg-blue-50/50',   p: '/events' },
              { l: 'Community',  s: 'Directory',  i: Users,      c: 'text-indigo-600 bg-indigo-50/50', p: '/admin/users' },
            ].map(a => (
              <button key={a.l} onClick={() => navigate(a.p)} className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl hover:border-brand-300 hover:shadow-soft transition-all">
                <div className={`w-12 h-12 rounded-2xl ${a.c} flex items-center justify-center`}><a.i size={22} /></div>
                <div className="text-left">
                  <p className="text-sm font-black text-slate-900 dark:text-white leading-tight">{a.l}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{a.s}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ── Masjid Explorer ── */}
        <section className="bg-brand-600 rounded-[32px] p-8 text-white relative overflow-hidden shadow-vivid">
           <div className="relative z-10">
              <h3 className="text-xl font-black mb-2">Explore Masjids</h3>
              <p className="text-white/70 text-sm font-medium mb-6">Find and follow 23 local mosques in Pernambut area.</p>
              <button onClick={() => navigate('/select-mosque')} className="bg-white text-brand-600 px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 w-fit">
                Start Exploring <ArrowRight size={16} />
              </button>
           </div>
           <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        </section>

      </main>

      <MasjidList />
      <BayanSection />
    </div>
  );
};

const ArrowRight = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
);

const BookOpen = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);

export default Home;
