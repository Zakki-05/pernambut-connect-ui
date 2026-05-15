import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMosque } from '../context/MosqueContext';
import { 
  MapPin, Bell, Clock, ChevronRight, AlertCircle, 
  Calendar, Heart, Users, Megaphone, Star, ArrowRight, BookOpen
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
    { name: 'Fajr', time: '04:52', status: 'Passed' },
    { name: 'Dhuhr', time: '12:22', status: 'Passed' },
    { name: 'Asr', time: '03:48', status: 'Active', active: true },
    { name: 'Maghrib', time: '06:38', status: 'Upcoming' },
    { name: 'Isha', time: '07:52', status: 'Upcoming' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-32">
      {/* ── Prime Header ── */}
      <header className="pt-16 pb-10 px-6 border-b border-slate-100 dark:border-slate-900">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.25em] mb-2">{hijri.full}</p>
            <h1 className="text-4xl font-black text-slate-950 dark:text-white leading-none tracking-tight">{dayName}</h1>
            <p className="text-slate-500 font-bold text-base mt-2">{fullDate}</p>
          </div>
          <button onClick={() => navigate('/profile')} className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-950 dark:text-white relative hover:scale-105 transition-transform">
            <Bell size={22} strokeWidth={2.5} />
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-blue-600 border-4 border-white dark:border-slate-950 rounded-full" />
          </button>
        </div>

        {selectedMosque && (
          <button onClick={() => navigate('/select-mosque')} className="w-full flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 group hover:border-blue-200 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-blue-600 shadow-sm border border-slate-100 dark:border-slate-700"><MapPin size={20} strokeWidth={2.5} /></div>
              <div className="text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Community Presence</p>
                <p className="text-sm font-black text-slate-950 dark:text-white">{selectedMosque.name}</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
          </button>
        )}
      </header>

      <main className="px-6 py-10 space-y-12 max-w-lg mx-auto">
        
        {/* ── Prayer Timings ── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black text-slate-950 dark:text-white">Prayer Schedule</h2>
            <div className="flex items-center gap-1.5 text-xs font-black text-slate-400 uppercase tracking-widest"><Clock size={14} /> Pernambut</div>
          </div>
          <div className="grid grid-cols-5 gap-2.5">
            {prayerTimes.map(p => (
              <div key={p.name} className={`flex flex-col items-center py-4 rounded-2xl border transition-all ${p.active ? 'bg-blue-600 border-blue-600 shadow-xl shadow-blue-600/20 text-white scale-105' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800'}`}>
                <span className={`text-[9px] font-black uppercase mb-1.5 tracking-wider ${p.active ? 'text-white/80' : 'text-slate-400'}`}>{p.name}</span>
                <span className={`text-sm font-black ${p.active ? 'text-white' : 'text-slate-950 dark:text-slate-100'}`}>{p.time}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Latest Alerts ── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black text-slate-950 dark:text-white">Announcements</h2>
            <button onClick={() => navigate('/announcements')} className="text-blue-600 text-xs font-black uppercase tracking-widest">View History</button>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6">
            {[1, 2].map(i => (
              <div key={i} onClick={() => navigate('/announcements')} className="min-w-[300px] bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm cursor-pointer hover:border-blue-300 transition-all">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                  <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Immediate Attention</span>
                </div>
                <h3 className="text-base font-black text-slate-950 dark:text-white leading-tight mb-3">Friday prayers will start promptly at 1:15 PM today.</h3>
                <p className="text-sm text-slate-500 font-bold leading-relaxed line-clamp-2">The mosque administration requests all members to arrive early for the sermon...</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Prime Quick Actions ── */}
        <section>
          <h2 className="text-lg font-black text-slate-950 dark:text-white mb-6">Quick Hub</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { l: 'Donate Now', s: 'Support Us',   i: Heart,    c: 'text-blue-600 bg-blue-50/50',   p: '/donate' },
              { l: 'Wafat News', s: 'Janaza Alerts',i: BookOpen, c: 'text-slate-900 bg-slate-50',     p: '/death-news' },
              { l: 'Events',     s: 'Community',    i: Calendar, c: 'text-indigo-600 bg-indigo-50/50', p: '/events' },
              { l: 'Members',    s: 'Directory',    i: Users,    c: 'text-blue-700 bg-blue-50/80',   p: '/admin/users' },
            ].map(a => (
              <button key={a.l} onClick={() => navigate(a.p)} className="flex items-center gap-4 p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[28px] hover:border-blue-400 hover:shadow-xl transition-all group">
                <div className={`w-12 h-12 rounded-2xl ${a.c} flex items-center justify-center group-hover:scale-110 transition-transform`}><a.i size={24} strokeWidth={2.5} /></div>
                <div className="text-left">
                  <p className="text-sm font-black text-slate-950 dark:text-white leading-none">{a.l}</p>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">{a.s}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ── Prime Banner ── */}
        <section className="bg-slate-950 rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl shadow-slate-900/40">
           <div className="relative z-10">
              <div className="flex items-center gap-2 text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-4">
                <Star size={12} fill="currentColor" /> Mosque Explorer
              </div>
              <h3 className="text-3xl font-black mb-3 tracking-tight">Connect with all <br/> local Masjids</h3>
              <p className="text-slate-400 text-sm font-bold mb-8 leading-relaxed">Follow and support 23 registered mosques in the Pernambut community.</p>
              <button onClick={() => navigate('/select-mosque')} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-3 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
                Explore Now <ArrowRight size={18} strokeWidth={3} />
              </button>
           </div>
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-20 -mt-20" />
           <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -ml-10 -mb-10" />
        </section>

      </main>

      <MasjidList />
      <BayanSection />
    </div>
  );
};

export default Home;
