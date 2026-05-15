import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMosque } from '../context/MosqueContext';
import { 
  MapPin, Bell, Clock, ChevronRight, AlertCircle, 
  Calendar, Heart, Users, Megaphone, Star, ArrowRight, BookOpen, Search
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getHijriDate } from '../utils/dateUtils';
import MasjidList from '../components/mosque/MasjidList';
import BayanSection from '../components/layout/BayanSection';

import { useTranslation } from 'react-i18next';

const Home = () => {
  const { selectedMosque } = useMosque();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const hijri = getHijriDate();
  const today = new Date();
  
  const dayName = today.toLocaleDateString('en-IN', { weekday: 'long' });
  const fullDate = today.toLocaleDateString('en-IN', { day: 'numeric', month: 'long' });

  const prayerTimes = [
    { name: 'Fajr', time: selectedMosque?.fajr || '04:52', active: false },
    { name: 'Dhuhr', time: selectedMosque?.dhuhr || '12:22', active: false },
    { name: 'Asr', time: selectedMosque?.asr || '03:48', active: true },
    { name: 'Maghrib', time: selectedMosque?.maghrib || '06:38', active: false },
    { name: 'Isha', time: selectedMosque?.isha || '07:52', active: false },
  ];

  const quickActions = [
    { label: t('donate'),     sub: t('sadaqah_zakat'), icon: Heart,    color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400', path: '/donate' },
    { label: t('wafat'),      sub: t('janaza_news'),    icon: BookOpen, color: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400', path: '/death-news' },
    { label: t('gatherings'), sub: t('events'), icon: Calendar,   color: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400', path: '/events' },
    { label: t('members'),    sub: t('community_directory'), icon: Users,    color: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400', path: '/admin/users' },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-[#020617] pb-40">
      {/* ── Modern Navbar / Header ── */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#020617]/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 px-6 py-4">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-black">ﺑ</div>
            <h1 className="text-lg font-black tracking-tighter dark:text-white hidden sm:block">Pernambut Connect</h1>
          </div>
          
          <div className="flex items-center gap-4">
             <button className="p-2 text-slate-400 hover:text-emerald-500 transition-colors"><Search size={20} /></button>
             <button onClick={() => navigate('/notifications')} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 relative">
               <Bell size={18} />
               <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800" />
             </button>
             <button onClick={() => navigate('/profile')} className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                <Users size={18} />
             </button>
          </div>
        </div>
      </header>

      <main className="w-full px-6 lg:px-10 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* ── Left Column: Main Feed ── */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Welcome Section */}
          <section className="reveal">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">{hijri.full}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{dayName}</span>
                </div>
                <h2 className="text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                  {t('assalamu_alaikum')}, <br/>
                  <span className="gradient-text">{t('welcome_hub')}</span>
                </h2>
              </div>
              
              {selectedMosque && (
                <button onClick={() => navigate('/select-mosque')} className="flex items-center gap-4 p-4 pr-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-emerald-500 transition-all group shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600"><MapPin size={22} /></div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">{t('current_masjid')}</p>
                    <p className="text-sm font-black text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">{selectedMosque.name}</p>
                  </div>
                </button>
              )}
            </div>
          </section>

          {/* Quick Actions Grid */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, idx) => (
              <motion.button whileHover={{ y: -5 }} onClick={() => navigate(action.path)} key={action.label} 
                className="premium-card group text-left">
                <div className={`w-12 h-12 rounded-2xl ${action.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <action.icon size={24} />
                </div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white mb-1">{action.label}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{action.sub}</p>
              </motion.button>
            ))}
          </section>

          {/* Announcements Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                <Megaphone size={22} className="text-emerald-500" />
                {t('latest_updates')}
              </h3>
              <button onClick={() => navigate('/announcements')} className="text-emerald-500 text-sm font-black flex items-center gap-2 hover:gap-3 transition-all">
                {t('view_archive')} <ArrowRight size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map(i => (
                <div key={i} className="premium-card flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="badge bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg">Important</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">2 hours ago</span>
                    </div>
                    <h4 className="text-base font-black text-slate-900 dark:text-white leading-tight mb-3">Jummah Bayan timing changed to 1:15 PM this week.</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium line-clamp-2">The mosque committee has decided to adjust timings due to the ongoing heatwave in Pernambut area...</p>
                  </div>
                  <button className="mt-6 text-xs font-black text-emerald-500 border-b border-emerald-500/20 w-fit pb-0.5">{t('read_full_notice')}</button>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* ── Right Column: Utilities ── */}
        <aside className="lg:col-span-4 space-y-10">
          
          {/* Prayer Times Card */}
          <div className="bg-slate-950 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-black tracking-tight">{t('prayer_timings')}</h3>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Pernambut, Tamil Nadu</p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center"><Clock size={20} className="text-emerald-400" /></div>
              </div>
              
              <div className="space-y-4">
                {prayerTimes.map(p => (
                  <div key={p.name} className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${p.active ? 'bg-emerald-500 border-emerald-400 shadow-xl shadow-emerald-500/20' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
                    <span className={`text-sm font-black uppercase tracking-widest ${p.active ? 'text-white' : 'text-slate-400'}`}>{p.name}</span>
                    <div className="flex items-center gap-3">
                      <span className={`text-base font-black ${p.active ? 'text-white' : 'text-white/90'}`}>{p.time}</span>
                      {p.active && <span className="w-2 h-2 rounded-full bg-white animate-ping" />}
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-8 py-4 rounded-2xl bg-white/10 border border-white/5 text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all text-emerald-400">View Imsak/Iftar Timings</button>
            </div>
            {/* Decorative Orbs */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-[80px] -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-[80px] -ml-20 -mb-20" />
          </div>

          {/* Donation Progress / Banner */}
          <div className="bg-emerald-600 rounded-[40px] p-8 text-white shadow-xl shadow-emerald-600/20 group cursor-pointer relative overflow-hidden">
             <div className="relative z-10">
                <Star className="text-emerald-200 mb-6" size={24} fill="currentColor" />
                <h3 className="text-2xl font-black tracking-tight leading-tight mb-3">Support your <br/>local Masjid</h3>
                <p className="text-emerald-100/70 text-sm font-bold mb-8 leading-relaxed">Contribute to the maintenance and development of mosques in our area.</p>
                <div className="flex items-center gap-3 font-black text-sm">
                  Quick Donate <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </div>
             </div>
             <div className="absolute bottom-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <Heart size={120} fill="currentColor" />
             </div>
          </div>

        </aside>
      </main>

      <MasjidList />
      <BayanSection />
    </div>
  );
};

export default Home;
