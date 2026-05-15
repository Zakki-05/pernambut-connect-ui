import React, { useState } from 'react';
import { Calendar, MapPin, Clock, ArrowLeft, Heart, Users, Mic2, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getHijriDate } from '../utils/dateUtils';

const allEvents = [
  { id: 1, title: 'Nikah of Abdullah & Fatima',      type: 'NIKAH',   date: 'May 25, 2026', time: '10:00 AM',       location: 'Road Masjid Main Hall',    upcoming: true  },
  { id: 2, title: 'Monthly Community Meeting',       type: 'MEETING', date: 'May 28, 2026', time: '08:30 PM',       location: 'Jamiya Masjid Library',    upcoming: true  },
  { id: 3, title: 'Special Bayan by Mufti Tariq',   type: 'BAYAN',   date: 'Jun 2, 2026',  time: 'After Maghrib',  location: 'Chowk Masjid Prayer Hall', upcoming: true  },
];

const Events = () => {
  const [filter, setFilter] = useState('upcoming');
  const navigate = useNavigate();
  const hijri = getHijriDate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32">
      <header className="bg-white dark:bg-slate-900 pt-16 pb-12 px-6 border-b border-slate-100 dark:border-slate-800">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest mb-4">
          <ArrowLeft size={16} /> Back
        </button>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Events</h1>
        <p className="text-slate-400 font-medium text-sm mt-1">{hijri.full}</p>
      </header>

      <main className="px-6 -mt-6 relative z-10 space-y-6 max-w-lg mx-auto">
        <div className="bg-white dark:bg-slate-900 p-1.5 rounded-[24px] border border-slate-100 dark:border-slate-800 shadow-soft flex gap-1">
          {['upcoming', 'past'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-[18px] transition-all ${filter === f ? 'bg-slate-900 dark:bg-brand-600 text-white shadow-vivid' : 'text-slate-400'}`}>{f}</button>
          ))}
        </div>

        <div className="space-y-4">
          {allEvents.map(ev => (
            <div key={ev.id} className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm group hover:border-brand-300 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-brand-600 shadow-inner">
                  {ev.type === 'NIKAH' ? <Heart size={24} /> : ev.type === 'MEETING' ? <Users size={24} /> : <Mic2 size={24} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-black text-brand-600 uppercase tracking-widest bg-brand-50 px-2 py-0.5 rounded-lg">{ev.type}</span>
                    <span className="text-[10px] font-bold text-slate-300">{ev.date.split(',')[0]}</span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white leading-tight mb-4 group-hover:text-brand-600 transition-colors">{ev.title}</h3>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <Clock size={12} className="text-brand-500" /> {ev.time}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <MapPin size={12} className="text-brand-500" /> Pernambut
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Events;
