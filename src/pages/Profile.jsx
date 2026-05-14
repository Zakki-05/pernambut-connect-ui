import React, { useState } from 'react';
import { User, MapPin, Settings, LogOut, ChevronRight, Edit3, Heart, Phone, Calendar, Bell, BookOpen, Shield, X, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMosque } from '../context/MosqueContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
  const { user, login, logout } = useAuth();
  const { selectedMosque } = useMosque();
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editArea, setEditArea] = useState(user?.area || '');

  const handleLogout = () => {
    logout();
    localStorage.removeItem('selectedMosque');
    navigate('/login');
  };

  const handleSaveProfile = () => {
    const updatedUser = { ...user, name: editName, area: editArea };
    login(updatedUser, localStorage.getItem('token'));
    setShowEditModal(false);
  };

  const isAdmin = user?.is_staff || user?.is_superuser;

  const menuItems = [
    { id: 'admin', icon: Shield, label: 'Admin Portal', desc: 'Post alerts & community updates', color: 'bg-red-50 text-red-600', action: () => navigate('/admin-portal'), adminOnly: true },
    { id: 'mosque', icon: MapPin, label: 'Change Mosque', desc: selectedMosque?.name || 'Not selected', color: 'bg-primary-50 text-primary-600', action: () => navigate('/select-mosque') },
    { id: 'donations', icon: Heart, label: 'Donation History', desc: 'View past donations', color: 'bg-red-50 text-red-500', action: () => navigate('/donation-history') },
    { id: 'events', icon: Calendar, label: 'Events', desc: 'Upcoming events & gatherings', color: 'bg-blue-50 text-blue-500', action: () => navigate('/events') },
    { id: 'wafat', icon: BookOpen, label: 'Wafat / Death News', desc: 'Community announcements', color: 'bg-gray-100 text-gray-600', action: () => navigate('/death-news') },
    { id: 'announcements', icon: Bell, label: 'All Announcements', desc: 'Alerts & updates', color: 'bg-yellow-50 text-yellow-600', action: () => navigate('/announcements') },
    { id: 'settings', icon: Settings, label: 'Settings', desc: 'Theme, notifications, language', color: 'bg-purple-50 text-purple-500', action: () => navigate('/settings') },
  ].filter(item => !item.adminOnly || isAdmin);

  const stats = [
    { label: 'Donations', value: '4' },
    { label: 'Events', value: '2' },
    { label: 'Since', value: 'May 26' },
  ];

  return (
    <div className="pb-24 min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-primary-700 via-primary-600 to-emerald-500 px-6 pt-12 pb-20 rounded-b-[40px] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-10 -mb-10"></div>
        
        <div className="flex justify-between items-start relative z-10">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <button 
            onClick={() => {
              setEditName(user?.name || '');
              setEditArea(user?.area || '');
              setShowEditModal(true);
            }} 
            className="bg-white/20 p-2 rounded-full backdrop-blur-md"
          >
            <Edit3 size={18} />
          </button>
        </div>
      </div>

      {/* User Info Card — overlaps the header */}
      <div className="px-6 -mt-14">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 mt-[60px]"
        >
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center mr-4 shadow-md">
              <span className="text-white text-2xl font-bold">
                {(user?.name || 'G')[0].toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{user?.name || 'Guest User'}</h2>
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <Phone size={13} className="mr-1.5" />
                <span>{user?.phone || '+91 XXXXXXXXXX'}</span>
              </div>
              <div className="flex items-center text-gray-500 text-sm mt-0.5">
                <MapPin size={13} className="mr-1.5" />
                <span>{user?.area || 'Pernambut, TN'}</span>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex justify-around pt-4 border-t border-gray-100">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-lg font-bold text-gray-800">{stat.value}</p>
                <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Active Mosque */}
      <div className="px-6 mt-5">
        <div 
          onClick={() => navigate('/select-mosque')}
          className="bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl shadow-md p-4 text-white flex justify-between items-center cursor-pointer hover:shadow-lg transition-all"
        >
          <div className="flex items-center">
            <div className="bg-white/20 p-2 rounded-xl mr-3 backdrop-blur-sm">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-white/70 text-[10px] uppercase tracking-wider font-medium">Active Mosque</p>
              <h3 className="font-bold text-base">{selectedMosque?.name || 'None Selected'}</h3>
            </div>
          </div>
          <ChevronRight size={20} className="text-white/60" />
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-6 mt-6">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Quick Access</p>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {menuItems.map((item, index) => (
            <div 
              key={item.id}
              onClick={item.action}
              className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                index !== menuItems.length - 1 ? 'border-b border-gray-50' : ''
              }`}
            >
              <div className="flex items-center">
                <div className={`p-2.5 rounded-xl mr-3 ${item.color}`}>
                  <item.icon size={18} />
                </div>
                <div>
                  <span className="font-semibold text-gray-800 text-sm">{item.label}</span>
                  <p className="text-[11px] text-gray-400 mt-0.5">{item.desc}</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </div>
          ))}
        </div>
      </div>

      {/* App Info + Logout */}
      <div className="px-6 mt-6">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 bg-red-50 text-red-600 font-bold py-4 rounded-xl transition-colors hover:bg-red-100 border border-red-100"
        >
          <LogOut size={18} />
          <span>Log Out</span>
        </button>

        <div className="flex items-center justify-center text-gray-400 text-xs mt-4 mb-2">
          <Shield size={12} className="mr-1" /> Pernambut Connect v1.0.0
        </div>
      </div>

      {/* ===== EDIT PROFILE MODAL ===== */}
      <AnimatePresence>
        {showEditModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 400 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl relative overflow-hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
                <button onClick={() => setShowEditModal(false)} className="p-2 rounded-full hover:bg-gray-100">
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                  <input 
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full border-2 border-gray-200 rounded-xl p-3 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Area / Location</label>
                  <input 
                    type="text"
                    value={editArea}
                    onChange={(e) => setEditArea(e.target.value)}
                    placeholder="e.g. Main Bazaar, Pernambut"
                    className="w-full border-2 border-gray-200 rounded-xl p-3 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                  <input 
                    type="text"
                    value={user?.phone || ''}
                    disabled
                    className="w-full border-2 border-gray-100 rounded-xl p-3 bg-gray-50 text-gray-400 cursor-not-allowed"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">Phone number cannot be changed</p>
                </div>
              </div>

              <button 
                onClick={handleSaveProfile}
                className="w-full bg-primary-600 text-white font-bold py-4 rounded-xl mt-6 flex items-center justify-center hover:bg-primary-700 transition-colors shadow-md"
              >
                <Check size={18} className="mr-2" /> Save Changes
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
