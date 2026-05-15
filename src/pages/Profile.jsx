import React, { useState } from 'react';
import { 
  MapPin, Settings, LogOut, ChevronRight, Edit3, Heart, 
  Calendar, Bell, BookOpen, Shield, X, Check, Users, Mail 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMosque } from '../context/MosqueContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getHijriDate } from '../utils/dateUtils';

const Profile = () => {
  const { selectedMosque } = useMosque();
  const { user, logout }   = useAuth();
  const navigate           = useNavigate();
  const hijri              = getHijriDate();
  
  const [showEdit, setShowEdit] = useState(false);
  const [editName, setEditName] = useState(user?.name || 'Member');

  const handleLogout = () => { logout(); navigate('/login'); };
  const isAdmin = user?.email === 'zakkiadnan05@gmail.com';

  const menuGroups = [
    {
      label: 'Administrative Hub',
      items: [
        { id: 'admin',   icon: Shield, label: 'Post Update',    desc: 'Official alerts', action: () => navigate('/admin-portal'), show: isAdmin },
        { id: 'members', icon: Users,  label: 'Member Registry', desc: 'Directory management', action: () => navigate('/admin/users'), show: isAdmin },
      ].filter(i => i.show),
    },
    {
      label: 'Account & Community',
      items: [
        { id: 'mosque',  icon: MapPin,   label: 'My Mosque',    desc: selectedMosque?.name || 'Set preference', action: () => navigate('/select-mosque') },
        { id: 'history', icon: Heart,    label: 'Donation Hub', desc: 'Contribution history', action: () => navigate('/donate-history') },
        { id: 'settings',icon: Settings, label: 'Preferences',  desc: 'App configurations', action: () => navigate('/settings') },
      ],
    },
  ].filter(g => g.items.length > 0);

  const initial = (editName?.[0] || 'U').toUpperCase();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-32">
      {/* ── Prime Header ── */}
      <header className="pt-16 pb-12 px-6 border-b border-slate-100 dark:border-slate-900 relative">
        <div className="relative z-10">
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-6">{hijri.full}</p>
          <div className="flex items-center gap-8">
            <div className="w-24 h-24 rounded-[40px] bg-slate-950 dark:bg-blue-600 flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-slate-950/20">
              {initial}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight leading-none">{editName}</h1>
                <button onClick={() => setShowEdit(true)} className="p-2 text-slate-300 hover:text-blue-600 transition-colors"><Edit3 size={18} /></button>
              </div>
              <p className="text-slate-500 font-bold text-sm flex items-center gap-2"><Mail size={14} className="text-blue-500" /> {user?.email}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="px-6 -mt-8 relative z-10 max-w-lg mx-auto">
        {/* ── Prime Analytics ── */}
        <div className="bg-white dark:bg-slate-900 rounded-[40px] p-8 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-950/5 grid grid-cols-3 gap-6 mb-12">
          {[{ v: '12d', l: 'Loyalty' }, { v: '₹4.5k', l: 'Total' }, { v: 'Pro', l: 'Status' }].map(s => (
            <div key={s.l} className="text-center">
              <p className="text-xl font-black text-slate-950 dark:text-white leading-none">{s.v}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{s.l}</p>
            </div>
          ))}
        </div>

        {/* ── Menu Grid ── */}
        <div className="space-y-12">
          {menuGroups.map(group => (
            <div key={group.label}>
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6 px-4">{group.label}</h2>
              <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
                {group.items.map((item, idx) => (
                  <button key={item.id} onClick={item.action} className={`w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group ${idx !== group.items.length - 1 ? 'border-b border-slate-50 dark:border-slate-800' : ''}`}>
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all"><item.icon size={22} strokeWidth={2.5} /></div>
                      <div>
                        <p className="text-sm font-black text-slate-950 dark:text-white leading-none">{item.label}</p>
                        <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest">{item.desc}</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-slate-200 group-hover:text-blue-600 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* ── Danger Zone ── */}
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-4 p-6 bg-slate-950 text-white rounded-[32px] font-black text-sm shadow-xl shadow-slate-900/40 hover:bg-red-600 transition-all group">
            <LogOut size={20} className="group-hover:translate-x-1 transition-transform" /> Sign Out from Platform
          </button>
        </div>
      </main>

      {/* ── Edit Modal ── */}
      <AnimatePresence>
        {showEdit && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 bg-slate-950/60 backdrop-blur-xl z-50 flex items-end sm:items-center justify-center p-6" onClick={() => setShowEdit(false)}>
            <motion.div initial={{ y:100 }} animate={{ y:0 }} exit={{ y:100 }} onClick={e => e.stopPropagation()} className="w-full max-w-md bg-white dark:bg-slate-900 rounded-t-[48px] sm:rounded-[48px] p-10 shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight">Identity</h2>
                <button onClick={() => setShowEdit(false)} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-3xl text-slate-400 hover:text-red-500 transition-colors"><X size={24} /></button>
              </div>
              <div className="space-y-8">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Full Legal Name</label>
                  <input type="text" value={editName} onChange={e => setEditName(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl p-5 text-base font-black outline-none focus:ring-8 focus:ring-blue-600/5 focus:border-blue-600 transition-all text-slate-950 dark:text-white shadow-inner" />
                </div>
              </div>
              <button onClick={() => setShowEdit(false)} className="w-full bg-blue-600 text-white font-black py-6 rounded-3xl mt-10 shadow-xl shadow-blue-600/30 flex items-center justify-center gap-3">
                <Check size={24} strokeWidth={3} /> Save Identity
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
