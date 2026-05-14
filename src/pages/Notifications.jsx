import React, { useState, useEffect } from 'react';
import { ArrowLeft, Bell, X, CheckCheck, Info, AlertCircle, Heart, Calendar, MessageSquare, Trash2, SlidersHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useMosque } from '../context/MosqueContext';

const Notifications = () => {
  const navigate = useNavigate();
  const { selectedMosque } = useMosque();
  const [filter, setFilter] = useState('ALL');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for now, but structured for premium look
  const [notifications, setNotifications] = useState([
    { 
        id: 1, 
        title: 'Janaza Alert', 
        message: 'Janab Abdul Kareem Sahab has passed away. Janaza at Road Masjid at 2:30 PM today.', 
        time: '10 min ago', 
        type: 'URGENT', 
        read: false,
        icon: AlertCircle,
        color: 'text-red-600 bg-red-50'
    },
    { 
        id: 2, 
        title: 'Donation Received', 
        message: 'Your donation of ₹500 for Mosque Maintenance was successful. JazakAllah!', 
        time: '2h ago', 
        type: 'SUCCESS', 
        read: true,
        icon: Heart,
        color: 'text-emerald-600 bg-emerald-50'
    },
    { 
        id: 3, 
        title: 'Event Reminder', 
        message: 'Special Bayan by Mufti Tariq is starting in 1 hour at Masjid e Ihsaan.', 
        time: '3h ago', 
        type: 'EVENT', 
        read: false,
        icon: Calendar,
        color: 'text-blue-600 bg-blue-50'
    },
    { 
        id: 4, 
        title: 'Water Supply Restored', 
        message: 'Wudu area water supply maintenance is complete. You can now use the facilities.', 
        time: '5h ago', 
        type: 'INFO', 
        read: true,
        icon: Info,
        color: 'text-amber-600 bg-amber-50'
    },
    { 
        id: 5, 
        title: 'Welcome!', 
        message: 'Welcome to Pernambut Connect! Tap here to complete your profile.', 
        time: '1d ago', 
        type: 'SYSTEM', 
        read: true,
        icon: Bell,
        color: 'text-purple-600 bg-purple-50'
    },
  ]);

  useEffect(() => {
    // Simulate API load
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotif = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifs = filter === 'ALL' 
    ? notifications 
    : notifications.filter(n => filter === 'UNREAD' ? !n.read : n.type === filter);

  return (
    <div className="pb-24 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 mr-2 rounded-full hover:bg-gray-100 transition-colors">
              <ArrowLeft size={22} className="text-gray-700" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={markAllRead} className="p-2 rounded-full hover:bg-gray-100 text-primary-600" title="Mark all as read">
              <CheckCheck size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-1">
          {['ALL', 'UNREAD', 'URGENT', 'EVENT', 'SUCCESS'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                filter === f 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 mt-6">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white h-24 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifs.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell size={32} className="text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">No Notifications</h3>
                <p className="text-gray-500 text-sm mt-1">You're all caught up!</p>
              </div>
            ) : (
              <AnimatePresence>
                {filteredNotifs.map((notif, idx) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: idx * 0.05 }}
                    key={notif.id}
                    className={`relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group ${!notif.read ? 'ring-1 ring-primary-500/20' : ''}`}
                  >
                    {!notif.read && (
                        <div className="absolute top-0 left-0 bottom-0 w-1 bg-primary-600"></div>
                    )}
                    
                    <div className="p-4 flex items-start">
                      <div className={`p-2.5 rounded-xl mr-4 ${notif.color} flex-shrink-0 shadow-sm`}>
                        <notif.icon size={20} />
                      </div>
                      <div className="flex-1 min-w-0 pr-6">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className={`font-bold text-sm ${!notif.read ? 'text-gray-900' : 'text-gray-600'}`}>
                            {notif.title}
                          </h3>
                          <span className="text-[10px] text-gray-400 whitespace-nowrap">{notif.time}</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {notif.message}
                        </p>
                      </div>
                      
                      <button 
                        onClick={() => deleteNotif(notif.id)}
                        className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {!notif.read && (
                        <div className="absolute top-4 right-4 w-2 h-2 bg-primary-500 rounded-full group-hover:opacity-0 transition-opacity"></div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        )}
      </div>

      <div className="px-6 mt-8 text-center">
        <p className="text-[11px] text-gray-400">
          Showing notifications for <span className="font-bold">{selectedMosque?.name}</span>
        </p>
      </div>
    </div>
  );
};

export default Notifications;
