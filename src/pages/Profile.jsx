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
      label: 'Admin',
      items: [
        { id: 'admin',   icon: Shield, label: 'Post Update',    desc: 'Mosque announcements', action: () => navigate('/admin-portal'), show: isAdmin },
        { id: 'members', icon: Users,  label: 'Members List',   desc: 'Community directory', action: () => navigate('/admin/users'), show: isAdmin },
      ].filter(i => i.show),
    },
    {
      label: 'Personal',
      items: [
        { id: 'mosque',  icon: MapPin,   label: 'My Mosque',    desc: selectedMosque?.name || 'Select yours', action: () => navigate('/select-mosque') },
        { id: 'history', icon: Heart,    label: 'Donations',    desc: 'Your contributions', action: () => navigate('/donate-history') },
        { id: 'settings',icon: Settings, label: 'Settings',     desc: 'App preferences', action: () => navigate('/settings') },
      ],
    },
  ].filter(g => g.items.length > 0);

  const initial = (editName?.[0] || 'U').toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32">
      {/* ── Clear Header ── */}
      <header className="bg-white dark:bg-slate-900 pt-16 pb-12 px-6 border-b border-slate-100 dark:border-slate-800 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-[10px] font-black text-brand-600 uppercase tracking-[0.2em] mb-4">{hijri.full}</p>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-[32px] bg-slate-900 dark:bg-brand-600 flex items-center justify-center text-white text-3xl font-black shadow-vivid">
              {initial}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{editName}</h1>
              <p className="text-slate-400 font-medium text-sm flex items-center gap-1.5 mt-1"><Mail size={14} /> {user?.email}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="px-6 -mt-6 relative z-10 max-w-lg mx-auto">
        {/* ── Profile Stats Card ── */}
        <div className="bg-white dark:bg-slate-900 rounded-[32px] p-6 border border-slate-100 dark:border-slate-800 shadow-soft grid grid-cols-3 gap-4 mb-8">
          {[{ v: '12', l: 'Days' }, { v: '₹4k', l: 'Given' }, { v: 'Verified', l: 'Status' }].map(s => (
            <div key={s.l} className="text-center">
              <p className="text-lg font-black text-slate-900 dark:text-white leading-none">{s.v}</p>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1.5">{s.l}</p>
            </div>
          ))}
        </div>

        {/* ── Menu Groups ── */}
        <div className="space-y-8">
          {menuGroups.map(group => (
            <div key={group.label}>
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-2">{group.label}</h2>
              <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
                {group.items.map((item, idx) => (
                  <button key={item.id} onClick={item.action} className={`w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${idx !== group.items.length - 1 ? 'border-b border-slate-50 dark:border-slate-800' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400"><item.icon size={20} /></div>
                      <div>
                        <p className="text-sm font-black text-slate-900 dark:text-white leading-none">{item.label}</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-wide">{item.desc}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-200 dark:text-slate-700" />
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* ── Sign Out ── */}
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-3 p-5 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-3xl font-black text-sm border border-red-100 dark:border-red-900/20 hover:bg-red-100 transition-all">
            <LogOut size={20} /> Sign Out from Account
          </button>
        </div>
      </main>

      {/* ── Edit Modal ── */}
      <AnimatePresence>
        {showEdit && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-end sm:items-center justify-center p-4" onClick={() => setShowEdit(false)}>
            <motion.div initial={{ y:100 }} animate={{ y:0 }} exit={{ y:100 }} onClick={e => e.stopPropagation()} className="w-full max-w-md bg-white dark:bg-slate-900 rounded-t-[40px] sm:rounded-[40px] p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Edit Profile</h2>
                <button onClick={() => setShowEdit(false)} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400"><X size={20} /></button>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Display Name</label>
                  <input type="text" value={editName} onChange={e => setEditName(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-4 text-sm font-bold outline-none focus:ring-4 focus:ring-brand-600/10 focus:border-brand-600 transition-all text-slate-900 dark:text-white" />
                </div>
              </div>
              <button onClick={() => setShowEdit(false)} className="w-full bg-brand-600 text-white font-black py-5 rounded-2xl mt-8 shadow-vivid flex items-center justify-center gap-2"><Check size={20} /> Save Changes</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
