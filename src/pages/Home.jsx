import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMosque } from '../context/MosqueContext';
import {
  MapPin, Bell, Clock, ChevronRight, AlertCircle,
  Calendar, Heart, Users, BookOpen, Star, Megaphone,
  X, ArrowRight, Sunrise, Moon, TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MasjidList from '../components/mosque/MasjidList';
import BayanSection from '../components/layout/BayanSection';

/* ── Helpers ─────────────────────────────────────────────── */
const prayerTimes = [
  { name: 'Fajr',    time: '05:10', period: 'AM', current: false },
  { name: 'Dhuhr',   time: '01:30', period: 'PM', current: false },
  { name: 'Asr',     time: '04:45', period: 'PM', current: true  },
  { name: 'Maghrib', time: '06:15', period: 'PM', current: false },
  { name: 'Isha',    time: '08:00', period: 'PM', current: false },
];

const announcements = [
  { id: 1, title: 'Jummah bayan timing changed to 1:15 PM',            priority: 'URGENT', time: '2h ago' },
  { id: 2, title: 'Urgent: Water supply maintenance in Wudu area',     priority: 'URGENT', time: '5h ago' },
  { id: 3, title: 'Quran class registration open for children',        priority: 'NORMAL', time: '1d ago' },
];

const events = [
  { id: 1, title: 'Nikah — Abdullah & Fatima',      date: 'May 10', type: 'NIKAH',   accent: 'from-pink-500 to-rose-500'   },
  { id: 2, title: 'Special Bayan by Mufti Tariq',  date: 'May 12', type: 'BAYAN',   accent: 'from-violet-500 to-purple-500' },
  { id: 3, title: 'Monthly Community Meeting',      date: 'May 15', type: 'MEETING', accent: 'from-blue-500 to-indigo-500'  },
];

const stats = [
  { label: 'Members',  value: '1,240+', icon: Users,     accent: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' },
  { label: 'Mosques',  value: '4',      icon: Star,      accent: 'text-amber-600   bg-amber-50   dark:bg-amber-900/20'   },
  { label: 'Posts',    value: '56',     icon: Megaphone, accent: 'text-blue-600    bg-blue-50    dark:bg-blue-900/20'    },
];

/* ── Component ───────────────────────────────────────────── */
const Home = () => {
  const { selectedMosque } = useMosque();
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);

  const today  = new Date();
  const dayStr = today.toLocaleDateString('en-IN', { weekday: 'long' });
  const dtStr  = today.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  const activePrayer = prayerTimes.find(p => p.current);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f0a] pb-24">

      {/* ╔══════════════════════════════════════════════════╗
          ║  HERO HEADER                                     ║
          ╚══════════════════════════════════════════════════╝ */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-teal-600 pt-12 pb-32 px-5">
        {/* Background orbs */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-10 -left-16 w-48 h-48 bg-primary-400/20 rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-teal-400/10 rounded-full blur-2xl" />

        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}
        />

        <div className="relative z-10 flex items-start justify-between">
          <div>
            <p className="text-primary-200 text-xs font-bold uppercase tracking-widest mb-1">Assalamu Alaikum</p>
            <h1 className="text-white text-2xl font-black leading-tight">{dayStr}</h1>
            <p className="text-primary-200 text-sm mt-0.5">{dtStr}</p>
            {selectedMosque && (
              <button
                onClick={() => navigate('/select-mosque')}
                className="flex items-center gap-1.5 mt-3 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
              >
                <MapPin size={12} /> {selectedMosque.name}
              </button>
            )}
          </div>

          <button
            onClick={() => navigate('/notifications')}
            className="relative w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition-all mt-1"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-primary-700 flex items-center justify-center">
              <span className="text-[9px] font-black text-white">3</span>
            </span>
          </button>
        </div>

        {/* Next prayer pill */}
        {activePrayer && (
          <div className="relative z-10 mt-5 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Next: {activePrayer.name} at {activePrayer.time} {activePrayer.period}
          </div>
        )}
      </div>

      {/* ╔══════════════════════════════════════════════════╗
          ║  PRAYER TIMES CARD (overlapping hero)           ║
          ╚══════════════════════════════════════════════════╝ */}
      <div className="px-4 -mt-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
                <Clock size={16} className="text-primary-600 dark:text-primary-400" />
              </div>
              <span className="font-bold text-gray-900 dark:text-gray-100 text-sm">Prayer Timings</span>
            </div>
            <span className="text-[10px] font-black text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-2.5 py-1 rounded-full uppercase tracking-wide">Today</span>
          </div>

          <div className="flex justify-between">
            {prayerTimes.map(p => (
              <div key={p.name} className={`flex flex-col items-center px-1.5 py-2 rounded-2xl transition-all ${p.current ? 'prayer-active' : ''}`}>
                <span className={`text-[9px] font-bold uppercase tracking-wider mb-1 ${p.current ? 'text-primary-700 dark:text-primary-300' : 'text-gray-400 dark:text-gray-600'}`}>
                  {p.name}
                </span>
                <span className={`text-sm font-black ${p.current ? 'text-primary-800 dark:text-primary-200' : 'text-gray-700 dark:text-gray-300'}`}>
                  {p.time}
                </span>
                <span className={`text-[9px] font-semibold ${p.current ? 'text-primary-500 dark:text-primary-400' : 'text-gray-400'}`}>
                  {p.period}
                </span>
                {p.current && <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-500 dark:bg-primary-400" />}
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-500"><span className="font-semibold text-gray-700 dark:text-gray-300">Jummah:</span> 01:00 PM</span>
            <span className="text-xs text-gray-500 dark:text-gray-500"><span className="font-semibold text-gray-700 dark:text-gray-300">Sunrise:</span> 06:05 AM</span>
          </div>
        </motion.div>
      </div>

      {/* ╔══════════════════════════════════════════════════╗
          ║  DEATH NEWS ALERT BANNER                        ║
          ╚══════════════════════════════════════════════════╝ */}
      <div className="px-4 mt-4">
        <button
          onClick={() => navigate('/death-news')}
          className="w-full flex items-center justify-between bg-gray-900 dark:bg-gray-950 border border-gray-800 rounded-2xl p-4 hover:bg-gray-800 dark:hover:bg-gray-900 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center">
              <AlertCircle size={20} className="text-red-400" />
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-sm">Wafat / Death News</p>
              <p className="text-gray-500 text-xs mt-0.5">1 new Janaza alert today</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">NEW</span>
            <ChevronRight size={16} className="text-gray-600 group-hover:text-gray-400 transition-colors" />
          </div>
        </button>
      </div>

      {/* ╔══════════════════════════════════════════════════╗
          ║  QUICK STATS                                    ║
          ╚══════════════════════════════════════════════════╝ */}
      <div className="px-4 mt-4 grid grid-cols-3 gap-3">
        {stats.map(s => (
          <div key={s.label} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-3 flex flex-col items-center text-center">
            <div className={`w-9 h-9 rounded-xl ${s.accent} flex items-center justify-center mb-2`}>
              <s.icon size={17} />
            </div>
            <p className="text-gray-900 dark:text-gray-100 font-black text-base leading-none">{s.value}</p>
            <p className="text-gray-400 dark:text-gray-600 text-[10px] font-semibold uppercase tracking-wide mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ╔══════════════════════════════════════════════════╗
          ║  ANNOUNCEMENTS                                  ║
          ╚══════════════════════════════════════════════════╝ */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-gray-900 dark:text-gray-100 font-black text-base">Announcements</h2>
          <button onClick={() => navigate('/announcements')} className="flex items-center gap-0.5 text-primary-600 dark:text-primary-400 text-xs font-bold hover:underline">
            View All <ChevronRight size={13} />
          </button>
        </div>
        <div className="space-y-2.5">
          {announcements.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              onClick={() => navigate('/announcements')}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 flex items-start gap-3 cursor-pointer hover:border-primary-200 dark:hover:border-primary-800 hover:shadow-sm transition-all group"
            >
              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${a.priority === 'URGENT' ? 'bg-red-500 animate-pulse' : 'bg-primary-400'}`} />
              <div className="flex-1 min-w-0">
                <p className="text-gray-800 dark:text-gray-200 font-semibold text-sm leading-snug">{a.title}</p>
                <p className="text-gray-400 dark:text-gray-600 text-[11px] mt-1 font-medium">{a.time}</p>
              </div>
              {a.priority === 'URGENT' && (
                <span className="flex-shrink-0 text-[9px] font-black text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 px-1.5 py-0.5 rounded-md border border-red-100 dark:border-red-800/40">
                  URGENT
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ╔══════════════════════════════════════════════════╗
          ║  UPCOMING EVENTS                                ║
          ╚══════════════════════════════════════════════════╝ */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-gray-900 dark:text-gray-100 font-black text-base">Upcoming Events</h2>
          <button onClick={() => navigate('/events')} className="flex items-center gap-0.5 text-primary-600 dark:text-primary-400 text-xs font-bold hover:underline">
            View All <ChevronRight size={13} />
          </button>
        </div>
        <div className="space-y-2.5">
          {events.map((ev, i) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => navigate('/events')}
              className="flex items-center gap-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 cursor-pointer hover:shadow-sm transition-all"
            >
              <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${ev.accent} flex-shrink-0 flex items-center justify-center shadow-md`}>
                <Calendar size={18} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-800 dark:text-gray-200 font-bold text-sm truncate">{ev.title}</p>
                <p className="text-gray-400 dark:text-gray-600 text-[11px] mt-0.5 font-medium">{ev.date}, 2026</p>
              </div>
              <span className="text-[9px] font-black text-gray-400 dark:text-gray-600 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-lg uppercase">
                {ev.type}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ╔══════════════════════════════════════════════════╗
          ║  QUICK ACTIONS                                  ║
          ╚══════════════════════════════════════════════════╝ */}
      <div className="px-4 mt-6">
        <h2 className="text-gray-900 dark:text-gray-100 font-black text-base mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Donate Now',    sub: 'Support via UPI',        icon: Heart,    bg: 'from-emerald-500 to-teal-500',   path: '/donate'      },
            { label: 'Events',        sub: '3 upcoming this week',   icon: Calendar, bg: 'from-blue-500 to-indigo-500',    path: '/events'      },
            { label: 'Wafat Updates', sub: 'Janaza alerts',          icon: BookOpen, bg: 'from-gray-700 to-gray-900',      path: '/death-news'  },
            { label: 'My Profile',    sub: 'Settings & preferences', icon: Users,    bg: 'from-violet-500 to-purple-600',  path: '/profile'     },
          ].map(a => (
            <button
              key={a.label}
              onClick={() => navigate(a.path)}
              className={`relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br ${a.bg} text-white text-left shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all`}
            >
              <a.icon size={22} className="mb-2.5 opacity-90" />
              <p className="font-black text-sm">{a.label}</p>
              <p className="text-white/70 text-[10px] mt-0.5 font-medium">{a.sub}</p>
              <div className="absolute -bottom-3 -right-3 w-14 h-14 bg-white/10 rounded-full" />
            </button>
          ))}
        </div>
      </div>

      {/* Masjid List & Bayan */}
      <MasjidList />
      <BayanSection />
    </div>
  );
};

export default Home;
