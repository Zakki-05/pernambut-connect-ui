import React, { useState } from 'react';
import { Calendar, MapPin, Clock, ArrowLeft, Heart, Users, Mic2, Star, ChevronRight, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getHijriDate } from '../utils/dateUtils';
import TopNav from '../components/layout/TopNav';

const allEvents = [
  { id: 1, title: 'Nikah Ceremony: Abdullah & Fatima', type: 'NIKAH',   date: 'May 25, 2026', time: '10:00 AM', location: 'Main Road Masjid', organizer: 'Rahman Family' },
  { id: 2, title: 'Monthly Community Shura',         type: 'MEETING', date: 'May 28, 2026', time: '08:30 PM', location: 'Jamiya Masjid Hall', organizer: 'Masjid Council' },
  { id: 3, title: 'Seerat-un-Nabi Bayan Session',   type: 'BAYAN',   date: 'Jun 2, 2026',  time: 'After Maghrib', location: 'Chowk Masjid', organizer: 'Dawat Hub' },
];

const Events = () => {
  const [filter, setFilter] = useState('upcoming');
  const navigate = useNavigate();
  const hijri = getHijriDate();

  return (
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-[#020617] pb-40">
      {/* Centered Top Navbar */}
      <TopNav title="Community Events" showBack={true} />

      <main className="w-full px-6 py-24 space-y-10 max-w-5xl mx-auto">
        
        {/* Toggle Filter */}
        <div className="bg-white dark:bg-slate-900 p-2 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-900/5 flex gap-2">
          {['upcoming', 'completed'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`flex-1 py-4 text-[11px] font-black uppercase tracking-[0.25em] rounded-[24px] transition-all ${filter === f ? 'bg-slate-950 text-white shadow-xl' : 'text-slate-400 hover:text-emerald-500'}`}>{f}</button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {allEvents.map((ev, idx) => (
              <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                key={ev.id} className="premium-card group">
                
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  <div className="w-20 h-20 rounded-[32px] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center text-emerald-500 shadow-inner group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                    <span className="text-xl font-black leading-none">{ev.date.split(',')[0].split(' ')[1]}</span>
                    <span className="text-[9px] font-black uppercase tracking-widest opacity-60">{ev.date.split(',')[0].split(' ')[0]}</span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-widest">{ev.type}</span>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <Star size={12} className="text-amber-500" fill="currentColor" /> Sponsored
                        </div>
                      </div>
                      <button className="p-3 text-slate-200 hover:text-emerald-500 transition-colors"><Share2 size={18} /></button>
                    </div>

                    <h3 className="text-2xl font-black text-slate-950 dark:text-white leading-tight mb-6 group-hover:text-emerald-500 transition-colors tracking-tight">{ev.title}</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800/50">
                      <div className="flex items-center gap-3 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                        <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400"><Clock size={16} /></div>
                        {ev.time}
                      </div>
                      <div className="flex items-center gap-3 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                        <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400"><MapPin size={16} /></div>
                        {ev.location}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500"><Users size={14} /></div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Organized by {ev.organizer}</p>
                   </div>
                   <button className="h-12 px-6 rounded-2xl bg-slate-950 text-white text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 transition-all flex items-center gap-2">Register Entry <ChevronRight size={14} strokeWidth={3} /></button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Suggest Event Card */}
        <div className="premium-card bg-emerald-500/5 border-dashed border-emerald-500/30 text-center py-12">
           <h4 className="text-lg font-black text-emerald-600 mb-2">Hosting an event?</h4>
           <p className="text-slate-500 text-sm font-bold mb-6">List your mosque program or community gathering on Pernambut Connect.</p>
           <button className="text-xs font-black text-emerald-500 uppercase tracking-widest border-b border-emerald-500/50 pb-0.5">Submit Event Proposal</button>
        </div>
      </main>
    </div>
  );
};

export default Events;
