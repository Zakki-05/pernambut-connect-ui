import React, { useState } from 'react';
import { 
  MapPin, Settings, LogOut, ChevronRight, Edit3, Heart, 
  Calendar, Bell, BookOpen, Shield, X, Check, Users, Mail, BadgeCheck, Zap, User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMosque } from '../context/MosqueContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getHijriDate } from '../utils/dateUtils';
import TopNav from '../components/layout/TopNav';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { selectedMosque } = useMosque();
  const { user, logout }   = useAuth();
  const navigate           = useNavigate();
  const hijri              = getHijriDate();
  const { t }              = useTranslation();
  
  const [showEdit, setShowEdit] = useState(false);
  const [editName, setEditName] = useState(user?.name || 'Member');

  const handleLogout = () => { logout(); navigate('/login'); };
  const isAdmin = user?.email === 'zakkiadnan05@gmail.com';

  const menuGroups = [
    {
      label: 'Administrative Control',
      items: [
        { id: 'admin',   icon: Shield, label: 'Management Portal', desc: 'Administer mosque hub', action: () => navigate('/admin-portal'), show: isAdmin },
        { id: 'members', icon: Users,  label: 'Community Registry', desc: 'Manage user database', action: () => navigate('/admin/users'), show: isAdmin },
      ].filter(i => i.show),
    },
    {
      label: 'Preferences & Hub',
      items: [
        { id: 'mosque',  icon: MapPin,   label: 'Assigned Mosque',  desc: selectedMosque?.name || 'Set your location', action: () => navigate('/select-mosque') },
        { id: 'history', icon: Heart,    label: 'Contribution Log', desc: 'View donation history', action: () => navigate('/donation-history') },
        { id: 'settings',icon: Settings, label: 'App Configuration', desc: 'Notifications & Theme', action: () => navigate('/settings') },
      ],
    },
  ].filter(g => g.items.length > 0);

  const initial = (editName?.[0] || 'U').toUpperCase();
  const title = t('profile') || 'User Profile';

  return (
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-[#020617] pb-40 overflow-x-hidden">
      {/* Centered Top Navbar */}
      <TopNav title={title} showBack={true} />
      {/* ── Profile Header ── */}
      <header className="bg-white dark:bg-[#020617] pt-32 pb-16 px-6 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="relative group">
            <div className="w-32 h-32 rounded-[48px] bg-emerald-500 text-white flex items-center justify-center text-5xl font-black shadow-2xl shadow-emerald-500/30 transform group-hover:rotate-6 transition-transform duration-500">
              {initial}
            </div>
            <button onClick={() => setShowEdit(true)} className="absolute -bottom-2 -right-2 w-10 h-10 bg-white dark:bg-slate-800 rounded-2xl shadow-xl flex items-center justify-center text-slate-900 dark:text-white border border-slate-100 dark:border-slate-700 hover:scale-110 transition-transform">
              <Edit3 size={18} />
            </button>
          </div>
          
          <div className="text-center md:text-left space-y-4">
             <div>
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">{editName}</h1>
                  <BadgeCheck size={24} className="text-emerald-500" />
                </div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <p className="text-slate-500 dark:text-slate-400 font-bold text-sm flex items-center gap-2">
                    <Mail size={14} className="text-emerald-500" /> {user?.email}
                  </p>
                  <span className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-800 hidden sm:block" />
                  <p className="text-emerald-500 font-black text-[10px] uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-md">Verified Resident</p>
                </div>
             </div>
             
             <div className="flex items-center justify-center md:justify-start gap-6">
                <div className="text-center md:text-left">
                   <p className="text-lg font-black text-slate-900 dark:text-white">₹4,250</p>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Donated</p>
                </div>
                <div className="w-px h-8 bg-slate-100 dark:bg-slate-800" />
                <div className="text-center md:text-left">
                   <p className="text-lg font-black text-slate-900 dark:text-white">12</p>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Mosques Followed</p>
                </div>
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 mt-12 space-y-12">
        
        {/* Upgrade Banner */}
        <div className="bg-emerald-600 rounded-[40px] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xl shadow-emerald-600/20">
           <div className="relative z-10 text-center md:text-left">
              <h3 className="text-xl font-black mb-1">Become a Community Pillar</h3>
              <p className="text-emerald-100/70 text-sm font-bold">Support local mosque development and maintenance.</p>
           </div>
           <button onClick={() => navigate('/donate')} className="relative z-10 px-8 py-4 bg-white text-emerald-600 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-emerald-50 transition-colors">
              <Zap size={18} fill="currentColor" /> Donate Now
           </button>
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16" />
        </div>

        {/* Menu Groups */}
        <div className="space-y-10">
          {menuGroups.map(group => (
            <div key={group.label} className="reveal">
              <h2 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] mb-6 px-4">{group.label}</h2>
              <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
                {group.items.map((item, idx) => (
                  <button key={item.id} onClick={item.action} className={`w-full flex items-center justify-between p-7 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group ${idx !== group.items.length - 1 ? 'border-b border-slate-100 dark:border-slate-800/50' : ''}`}>
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-emerald-500 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 transition-all border border-slate-100 dark:border-slate-800">
                        <item.icon size={22} />
                      </div>
                      <div>
                        <p className="text-base font-black text-slate-950 dark:text-white leading-none">{item.label}</p>
                        <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest">{item.desc}</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-slate-200 dark:text-slate-700 group-hover:text-emerald-500 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Danger Zone */}
          <div className="pt-6">
            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-4 p-7 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-[32px] font-black text-sm border border-red-100 dark:border-red-900/20 hover:bg-red-600 hover:text-white transition-all shadow-sm">
              <LogOut size={20} /> Securely Sign Out
            </button>
          </div>
        </div>
      </main>

      {/* Edit Modal */}
      <AnimatePresence>
        {showEdit && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 bg-[#020617]/80 backdrop-blur-xl z-[200] flex items-center justify-center p-6" onClick={() => setShowEdit(false)}>
            <motion.div initial={{ scale:0.9, y: 20 }} animate={{ scale:1, y: 0 }} onClick={e => e.stopPropagation()} className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[48px] p-12 shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-12">
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Personal Identity</h2>
                  <button onClick={() => setShowEdit(false)} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-3xl text-slate-400 hover:text-red-500 transition-colors"><X size={24} /></button>
                </div>
                <div className="space-y-8">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1">Legal Full Name</label>
                    <div className="relative">
                       <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                       <input type="text" value={editName} onChange={e => setEditName(e.target.value)} className="form-input h-16 pl-14 text-base font-black text-slate-900 dark:text-white" />
                    </div>
                  </div>
                </div>
                <button onClick={() => setShowEdit(false)} className="btn-action w-full h-18 text-lg mt-12 shadow-2xl shadow-emerald-500/20">
                  <Check size={24} strokeWidth={3} /> Commit Changes
                </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
