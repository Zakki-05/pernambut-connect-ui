import React, { useState } from 'react';
import {
  MapPin, Settings, LogOut, ChevronRight, Edit3, Heart,
  Phone, Calendar, Bell, BookOpen, Shield, X, Check, Users
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMosque } from '../context/MosqueContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
  const { selectedMosque } = useMosque();
  const { user, logout }   = useAuth();
  const navigate           = useNavigate();
  const [showEdit, setShowEdit] = useState(false);

  const [editName, setEditName] = useState(user?.name || 'Member');
  const [editArea, setEditArea] = useState(user?.area || 'Pernambut');

  const handleLogout = () => { logout(); navigate('/login'); };

  const isAdmin = user?.email === 'zakkiadnan05@gmail.com';

  const groups = [
    {
      label: 'Admin',
      items: [
        { id: 'admin',   icon: Shield, label: 'Admin Portal',        desc: 'Post alerts & updates',       color: 'text-red-500   bg-red-50   dark:bg-red-900/20',    action: () => navigate('/admin-portal'), show: isAdmin },
        { id: 'members', icon: Users,  label: 'Member Management',   desc: 'Manage users & roles',         color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20', action: () => navigate('/admin/users'),   show: isAdmin },
      ].filter(i => i.show),
    },
    {
      label: 'Community',
      items: [
        { id: 'mosque',  icon: MapPin,   label: 'Change Mosque',      desc: selectedMosque?.name || 'Not selected', color: 'text-primary-500 bg-primary-50 dark:bg-primary-900/20', action: () => navigate('/select-mosque') },
        { id: 'events',  icon: Calendar, label: 'Events',             desc: 'Upcoming gatherings',         color: 'text-blue-500  bg-blue-50  dark:bg-blue-900/20',  action: () => navigate('/events') },
        { id: 'wafat',   icon: BookOpen, label: 'Wafat / Death News', desc: 'Community announcements',     color: 'text-gray-500  bg-gray-100 dark:bg-gray-800',     action: () => navigate('/death-news') },
        { id: 'alerts',  icon: Bell,     label: 'Announcements',      desc: 'Alerts & updates',            color: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20', action: () => navigate('/announcements') },
        { id: 'donate',  icon: Heart,    label: 'Donation History',   desc: 'Past donations',              color: 'text-pink-500  bg-pink-50  dark:bg-pink-900/20',  action: () => navigate('/donation-history') },
      ],
    },
    {
      label: 'Account',
      items: [
        { id: 'settings', icon: Settings, label: 'Settings',  desc: 'Theme, notifications, language', color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20', action: () => navigate('/settings') },
        { id: 'logout',   icon: LogOut,   label: 'Log Out',   desc: 'Sign out of your account',       color: 'text-gray-500  bg-gray-100 dark:bg-gray-800',       action: handleLogout },
      ],
    },
  ].filter(g => g.items.length > 0);

  const initial = (editName?.[0] || user?.email?.[0] || 'U').toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f0a] pb-24">

      {/* ── Header ─────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-teal-600 px-6 pt-14 pb-24 rounded-b-[40px]">
        {/* decorative circles */}
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-400/10 rounded-full blur-xl" />
        {/* dot pattern */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}
        />

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-primary-200 text-[10px] font-black uppercase tracking-widest mb-1">My Profile</p>
            <h1 className="text-white text-2xl font-black">{editName}</h1>
          </div>
          <button
            onClick={() => setShowEdit(true)}
            className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition-all"
          >
            <Edit3 size={17} />
          </button>
        </div>
      </div>

      {/* ── Avatar card (overlapping header) ───────────────── */}
      <div className="px-5 -mt-16 relative z-10">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 p-5">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-700 flex items-center justify-center text-white text-2xl font-black shadow-md flex-shrink-0">
              {initial}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-gray-900 dark:text-white font-bold text-base truncate">{editName}</h2>
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                <Phone size={11} />
                <span className="truncate">{user?.email || '—'}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                <MapPin size={11} />
                <span>{editArea}</span>
              </div>
            </div>
            {isAdmin && (
              <span className="flex-shrink-0 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-[9px] font-black px-2 py-1 rounded-xl uppercase tracking-wide border border-primary-100 dark:border-primary-800/40">
                Admin
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="flex mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 divide-x divide-gray-100 dark:divide-gray-800 text-center">
            {[{ v: '4', l: 'Donations' }, { v: '2', l: 'Events' }, { v: 'May', l: 'Joined' }].map(s => (
              <div key={s.l} className="flex-1">
                <p className="text-gray-900 dark:text-white font-bold text-base">{s.v}</p>
                <p className="text-gray-400 dark:text-gray-500 text-[10px] uppercase tracking-wider font-semibold">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Active mosque banner */}
        <button
          onClick={() => navigate('/select-mosque')}
          className="w-full mt-4 bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl p-4 flex items-center justify-between text-white shadow-md shadow-primary-500/20"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <MapPin size={17} />
            </div>
            <div className="text-left">
              <p className="text-white/70 text-[10px] font-semibold uppercase tracking-wider">Active Mosque</p>
              <p className="font-bold text-sm">{selectedMosque?.name || 'None Selected'}</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-white/60" />
        </button>
      </div>

      {/* ── Menu Groups ────────────────────────────────────── */}
      <div className="px-5 mt-6 space-y-5">
        {groups.map(group => (
          <div key={group.label}>
            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-2 px-1">
              {group.label}
            </p>
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden divide-y divide-gray-50 dark:divide-gray-800">
              {group.items.map(item => (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.color}`}>
                      <item.icon size={17} />
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-gray-100 font-semibold text-sm">{item.label}</p>
                      <p className="text-gray-400 dark:text-gray-500 text-[11px] mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronRight size={15} className="text-gray-300 dark:text-gray-600" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-[11px] text-gray-300 dark:text-gray-700 mt-6 mb-2 flex items-center justify-center gap-1">
        <Shield size={10} /> Pernambut Connect v1.0.0
      </p>

      {/* ── Edit Profile Modal ─────────────────────────────── */}
      <AnimatePresence>
        {showEdit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
            onClick={() => setShowEdit(false)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 380 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-md bg-white dark:bg-gray-900 rounded-4xl p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Edit Profile</h2>
                <button onClick={() => setShowEdit(false)} className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500">
                  <X size={16} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1.5">Full Name</label>
                  <input type="text" value={editName} onChange={e => setEditName(e.target.value)}
                    className="w-full border border-gray-200 dark:border-gray-700 rounded-2xl p-3.5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 text-sm transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1.5">Area</label>
                  <input type="text" value={editArea} onChange={e => setEditArea(e.target.value)}
                    className="w-full border border-gray-200 dark:border-gray-700 rounded-2xl p-3.5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 text-sm transition-all"
                    placeholder="e.g. Main Bazaar, Pernambut"
                  />
                </div>
              </div>
              <button
                onClick={() => setShowEdit(false)}
                className="mt-5 w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md shadow-primary-500/20"
              >
                <Check size={16} /> Save Changes
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
