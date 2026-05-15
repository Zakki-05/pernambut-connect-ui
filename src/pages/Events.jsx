import React, { useState } from 'react';
import { Calendar, MapPin, Clock, ArrowLeft, Heart, Users, Mic2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getHijriDate } from '../utils/dateUtils';

const allEvents = [
  { id: 1, title: 'Nikah: Abdullah & Fatima',        type: 'NIKAH',   date: 'May 25', time: '10:00 AM', location: 'Road Masjid' },
  { id: 2, title: 'Monthly Registry Meeting',        type: 'MEETING', date: 'May 28', time: '08:30 PM', location: 'Jamiya Masjid' },
  { id: 3, title: 'Grand Bayan by Mufti Tariq',    type: 'BAYAN',   date: 'Jun 2',  time: 'After Maghrib', location: 'Chowk Masjid' },
];

const Events = () => {
  const [filter, setFilter] = useState('upcoming');
  const navigate = useNavigate();
  const hijri = getHijriDate();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-32">
      <header className="pt-16 pb-12 px-6 border-b border-slate-100 dark:border-slate-900">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] mb-6">
          <ArrowLeft size={16} /> Back
        </button>
        <h1 className="text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-none">Programs</h1>
        <p className="text-slate-500 font-bold text-sm mt-3 uppercase tracking-wider">{hijri.full}</p>
      </header>

      <main className="px-6 -mt-8 relative z-10 space-y-8 max-w-lg mx-auto">
        <div className="bg-white dark:bg-slate-900 p-2 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-950/5 flex gap-2">
          {['upcoming', 'completed'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.25em] rounded-[24px] transition-all ${filter === f ? 'bg-slate-950 text-white shadow-xl' : 'text-slate-400 hover:text-blue-600'}`}>{f}</button>
          ))}
        </div>

        <div className="space-y-6">
          {allEvents.map(ev => (
            <div key={ev.id} className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm group hover:border-blue-400 transition-all">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-3xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-blue-600 shadow-inner group-hover:scale-105 transition-transform border border-slate-100 dark:border-slate-700">
                  {ev.type === 'NIKAH' ? <Heart size={28} strokeWidth={2.5} /> : ev.type === 'MEETING' ? <Users size={28} strokeWidth={2.5} /> : <Mic2 size={28} strokeWidth={2.5} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] bg-blue-50 px-3 py-1 rounded-xl">{ev.type}</span>
                    <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest">{ev.date}</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-950 dark:text-white leading-tight mb-6 group-hover:text-blue-600 transition-colors">{ev.title}</h3>
                  
                  <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2.5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                      <Clock size={14} className="text-blue-500" /> {ev.time}
                    </div>
                    <div className="flex items-center gap-2.5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                      <MapPin size={14} className="text-blue-500" /> {ev.location}
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
