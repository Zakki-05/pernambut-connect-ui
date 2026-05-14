import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMosque } from '../context/MosqueContext';
import { MapPin, Bell, Clock, ChevronRight, AlertCircle, Calendar, Heart, Users, BookOpen, Star, Megaphone, X, CheckCheck, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MasjidList from '../components/mosque/MasjidList';
import BayanSection from '../components/layout/BayanSection';

const Home = () => {
  const { selectedMosque } = useMosque();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const notifications = [
    { id: 1, title: 'Janaza Alert', message: 'Janab Abdul Kareem Sahab has passed away. Janaza at Road Masjid at 2:30 PM today.', time: '10 min ago', type: 'URGENT', read: false },
    { id: 2, title: 'Water Supply Update', message: 'Wudu area water supply restored. Thank you for your patience.', time: '1h ago', type: 'ALERT', read: false },
    { id: 3, title: 'Jummah Reminder', message: 'Tomorrow is Jummah. Khutbah at Road Masjid starts at 12:50 PM.', time: '3h ago', type: 'REMINDER', read: false },
    { id: 4, title: 'Event: Nikah Ceremony', message: 'Nikah of Abdullah & Fatima on May 10 at 10:00 AM. All are invited.', time: '5h ago', type: 'EVENT', read: true },
    { id: 5, title: 'New Announcement', message: 'Quran class registration is now open for children aged 5-12.', time: '1d ago', type: 'INFO', read: true },
  ];

  const getNotifColor = (type) => {
    switch(type) {
      case 'URGENT': return 'bg-red-500';
      case 'ALERT': return 'bg-yellow-500';
      case 'REMINDER': return 'bg-blue-500';
      case 'EVENT': return 'bg-pink-500';
      default: return 'bg-primary-500';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const prayerTimes = [
    { name: 'Fajr', time: '05:10 AM', current: false },
    { name: 'Dhuhr', time: '01:30 PM', current: true },
    { name: 'Asr', time: '04:45 PM', current: false },
    { name: 'Maghrib', time: '06:15 PM', current: false },
    { name: 'Isha', time: '08:00 PM', current: false },
  ];

  const recentAnnouncements = [
    { id: 1, title: 'Jummah bayan timing changed to 1:15 PM', priority: 'NORMAL', time: '2h ago' },
    { id: 2, title: 'Urgent: Water supply maintenance in Wudu area', priority: 'URGENT', time: '5h ago' },
    { id: 3, title: 'Quran class registration open for children', priority: 'NORMAL', time: '1d ago' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Nikah — Abdullah & Fatima', date: 'May 10', type: 'NIKAH', color: 'bg-pink-50 text-pink-700 border-pink-200' },
    { id: 2, title: 'Special Bayan by Mufti Tariq', date: 'May 12', type: 'BAYAN', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { id: 3, title: 'Monthly Community Meeting', date: 'May 15', type: 'MEETING', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  ];

  const communityStats = [
    { label: 'Members', value: '1,240+', icon: Users },
    { label: 'Mosques', value: '4', icon: Star },
    { label: 'Announcements', value: '56', icon: Megaphone },
  ];

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-700 via-primary-600 to-emerald-500 pt-12 pb-28 px-6 rounded-b-[40px] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-10 left-0 w-28 h-28 bg-white/5 rounded-full -ml-10"></div>
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-1">Assalamu Alaikum</p>
            <p className="text-primary-100 text-sm mb-2">{dateStr}</p>
            <div className="flex items-center">
              <MapPin size={16} className="mr-1.5" />
              <h1 className="text-lg font-bold">{selectedMosque?.name}</h1>
            </div>
          </div>
          <button 
            onClick={() => navigate('/notifications')} 
            className="bg-white/20 p-2.5 rounded-full cursor-pointer backdrop-blur-md relative hover:bg-white/30 transition-all active:scale-95"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-primary-600 flex items-center justify-center">
                <span className="text-[9px] font-bold text-white">{unreadCount}</span>
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Notification Panel */}
      <AnimatePresence>
        {showNotifications && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNotifications(false)}
              className="fixed inset-0 bg-black/30 z-40"
            />
            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="fixed top-0 left-0 right-0 z-50 mx-3 mt-3"
            >
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 max-h-[85vh] overflow-hidden">
                {/* Panel Header */}
                <div className="flex justify-between items-center px-6 pt-6 pb-4 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Notifications</h2>
                    <div className="flex items-center mt-0.5">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{unreadCount} New alerts</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => setShowNotifications(false)} className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all">
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Notification List */}
                <div className="overflow-y-auto max-h-[55vh] p-2 space-y-1">
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id}
                      onClick={() => { setShowNotifications(false); navigate('/notifications'); }}
                      className={`px-4 py-4 flex items-start rounded-2xl cursor-pointer transition-all ${!notif.read ? 'bg-primary-50/50 hover:bg-primary-100/50' : 'hover:bg-gray-50'}`}
                    >
                      <div className={`p-2 rounded-xl mr-4 flex-shrink-0 shadow-sm ${getNotifColor(notif.type).replace('bg-', 'text-').replace('-500', '-600')} ${getNotifColor(notif.type).replace('-500', '-50')}`}>
                        <Bell size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-0.5">
                          <h3 className={`text-sm font-bold truncate ${!notif.read ? 'text-gray-900' : 'text-gray-600'}`}>{notif.title}</h3>
                          <span className="text-[10px] text-gray-400 ml-2 font-medium">{notif.time}</span>
                        </div>
                        <p className="text-[12px] text-gray-500 line-clamp-2 leading-snug">{notif.message}</p>
                      </div>
                      {!notif.read && (
                        <div className="ml-2 w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Panel Footer */}
                <div className="p-4 bg-gray-50/50 border-t border-gray-100">
                  <button 
                    onClick={() => { setShowNotifications(false); navigate('/notifications'); }}
                    className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-2xl shadow-lg hover:bg-gray-800 transition-all flex items-center justify-center"
                  >
                    Open Notification Center
                    <ArrowLeft size={16} className="ml-2 rotate-180" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Prayer Times Card */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 -mt-20"
      >
        <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
          <div className="flex justify-between items-center mb-1">
            <h2 className="font-bold text-gray-800 flex items-center text-base">
              <Clock size={18} className="mr-2 text-primary-500" />
              Prayer Timings
            </h2>
            <span className="text-[10px] text-primary-600 font-bold bg-primary-50 px-2 py-0.5 rounded-md uppercase">Today</span>
          </div>
          <p className="text-xs text-gray-400 mb-4">Next: Asr at 04:45 PM</p>
          
          <div className="flex justify-between items-center">
            {prayerTimes.map((prayer) => (
              <div key={prayer.name} className={`flex flex-col items-center py-2 px-2 rounded-xl transition-all ${prayer.current ? 'bg-primary-50 shadow-sm' : ''}`}>
                <span className={`text-[10px] mb-1.5 font-semibold uppercase tracking-wider ${prayer.current ? 'text-primary-700' : 'text-gray-400'}`}>
                  {prayer.name}
                </span>
                <span className={`text-sm font-bold ${prayer.current ? 'text-primary-800' : 'text-gray-800'}`}>
                  {prayer.time.split(' ')[0]}
                </span>
                <span className={`text-[9px] ${prayer.current ? 'text-primary-500' : 'text-gray-400'}`}>
                  {prayer.time.split(' ')[1]}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center">
            <div className="text-xs text-gray-500">
              <span className="font-semibold text-gray-700">Jummah:</span> 01:00 PM
            </div>
            <div className="text-xs text-gray-500">
              <span className="font-semibold text-gray-700">Sunrise:</span> 06:05 AM
            </div>
          </div>
        </div>
      </motion.div>

      {/* Janaza / Death News Quick Access */}
      <div className="px-6 mt-5">
        <div 
          onClick={() => navigate('/death-news')}
          className="bg-gray-900 rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-gray-800 transition-colors shadow-md"
        >
          <div className="flex items-center">
            <div className="bg-red-500/20 p-2.5 rounded-xl mr-3">
              <AlertCircle size={22} className="text-red-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Wafat / Death News</h3>
              <p className="text-gray-400 text-xs mt-0.5">1 new Janaza alert today</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mr-2">NEW</span>
            <ChevronRight size={18} className="text-gray-500" />
          </div>
        </div>
      </div>

      {/* Community Stats */}
      <div className="px-6 mt-5">
        <div className="grid grid-cols-3 gap-3">
          {communityStats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm text-center">
              <stat.icon size={18} className="text-primary-500 mx-auto mb-1.5" />
              <p className="text-lg font-bold text-gray-800">{stat.value}</p>
              <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Announcements */}
      <div className="px-6 mt-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-bold text-gray-800">Latest Announcements</h2>
          <span onClick={() => navigate('/announcements')} className="text-primary-600 text-xs font-semibold flex items-center cursor-pointer">
            View All <ChevronRight size={14} className="ml-0.5" />
          </span>
        </div>

        <div className="space-y-2.5">
          {recentAnnouncements.map((ann) => (
            <div key={ann.id} onClick={() => navigate('/announcements')} className="bg-white p-3.5 rounded-xl shadow-sm border border-gray-100 flex items-start cursor-pointer hover:shadow-md transition-all">
              <div className={`w-2 h-2 rounded-full mt-1.5 mr-3 flex-shrink-0 ${ann.priority === 'URGENT' ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}></div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800 text-sm">{ann.title}</h3>
                <p className="text-[10px] text-gray-400 mt-1">{ann.time}</p>
              </div>
              {ann.priority === 'URGENT' && (
                <span className="text-[9px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-md ml-2">URGENT</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="px-6 mt-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-bold text-gray-800">Upcoming Events</h2>
          <span onClick={() => navigate('/events')} className="text-primary-600 text-xs font-semibold flex items-center cursor-pointer">
            View All <ChevronRight size={14} className="ml-0.5" />
          </span>
        </div>

        <div className="space-y-2.5">
          {upcomingEvents.map((event) => (
            <div key={event.id} onClick={() => navigate('/events')} className={`p-3.5 rounded-xl border shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md transition-all ${event.color}`}>
              <div className="flex items-center">
                <Calendar size={16} className="mr-3 opacity-70" />
                <div>
                  <h3 className="font-semibold text-sm">{event.title}</h3>
                  <p className="text-[10px] opacity-70 mt-0.5">{event.date}, 2026</p>
                </div>
              </div>
              <span className="text-[9px] font-bold opacity-60 bg-white/50 px-1.5 py-0.5 rounded-md">{event.type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="px-6 mt-6">
        <h2 className="text-base font-bold text-gray-800 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <div onClick={() => navigate('/donate')} className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 cursor-pointer hover:shadow-md transition-all">
            <Heart size={20} className="text-emerald-600 mb-2" />
            <h3 className="font-bold text-emerald-800 text-sm">Donate Now</h3>
            <p className="text-[10px] text-emerald-600 mt-1">Support your mosque via UPI</p>
          </div>
          <div onClick={() => navigate('/events')} className="bg-blue-50 border border-blue-100 rounded-xl p-4 cursor-pointer hover:shadow-md transition-all">
            <Calendar size={20} className="text-blue-600 mb-2" />
            <h3 className="font-bold text-blue-800 text-sm">Events & Bayans</h3>
            <p className="text-[10px] text-blue-600 mt-1">3 upcoming this week</p>
          </div>
          <div onClick={() => navigate('/death-news')} className="bg-gray-100 border border-gray-200 rounded-xl p-4 cursor-pointer hover:shadow-md transition-all">
            <BookOpen size={20} className="text-gray-600 mb-2" />
            <h3 className="font-bold text-gray-800 text-sm">Wafat Updates</h3>
            <p className="text-[10px] text-gray-500 mt-1">Janaza alerts & condolences</p>
          </div>
          <div onClick={() => navigate('/profile')} className="bg-purple-50 border border-purple-100 rounded-xl p-4 cursor-pointer hover:shadow-md transition-all">
            <Users size={20} className="text-purple-600 mb-2" />
            <h3 className="font-bold text-purple-800 text-sm">My Profile</h3>
            <p className="text-[10px] text-purple-600 mt-1">Settings & preferences</p>
          </div>
        </div>
      </div>
      
      {/* Friday Khutbah List */}
      <MasjidList />

      {/* Latest Bayan Section */}
      <BayanSection />

    </div>
  );
};

export default Home;
