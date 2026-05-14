import React, { useState } from 'react';
import { Calendar as CalendarIcon, MapPin, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Events = () => {
  const [filter, setFilter] = useState('upcoming');

  const events = [
    { id: 1, title: 'Nikah of Abdullah & Fatima', type: 'NIKAH', date: 'Oct 25, 2026', time: '10:00 AM', location: 'Main Hall', desc: 'All community members are invited.' },
    { id: 2, title: 'Monthly Community Meeting', type: 'MEETING', date: 'Oct 28, 2026', time: '08:30 PM', location: 'Mosque Library', desc: 'Discussion on upcoming winter drive and maintenance.' },
    { id: 3, title: 'Special Bayan by Mufti Tariq', type: 'BAYAN', date: 'Nov 02, 2026', time: 'After Maghrib', location: 'Main Prayer Hall', desc: 'Topic: Rights of neighbors in Islam.' },
  ];

  return (
    <div className="pb-24 min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-primary-700 via-primary-600 to-emerald-500 px-6 pt-12 pb-10 rounded-b-[40px] text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-10 -mt-10"></div>
        <h1 className="text-2xl font-bold mb-1">Events & Gatherings</h1>
        <p className="text-white/70 text-sm">Stay connected with your community</p>
      </div>

      <div className="px-6 -mt-5">
        <div className="bg-white rounded-xl shadow-lg p-2 flex justify-between">
          {['today', 'upcoming', 'past'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize ${
                filter === f ? 'bg-primary-50 text-primary-700' : 'text-gray-500'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 mt-8 space-y-4">
        {events.map((event, idx) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            key={event.id}
            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded-md">
                {event.type}
              </span>
              <div className="flex items-center text-gray-500 text-xs font-medium">
                <CalendarIcon size={14} className="mr-1" />
                {event.date}
              </div>
            </div>
            
            <h3 className="font-bold text-lg text-gray-900 mb-2">{event.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{event.desc}</p>
            
            <div className="flex flex-col space-y-2 mt-4 pt-4 border-t border-gray-50">
              <div className="flex items-center text-sm text-gray-700">
                <Clock size={16} className="text-gray-400 mr-2" />
                {event.time}
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <MapPin size={16} className="text-gray-400 mr-2" />
                {event.location}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Events;
