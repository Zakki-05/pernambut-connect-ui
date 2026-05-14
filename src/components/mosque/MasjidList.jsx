import React from 'react';
import { MapPin, Clock, User } from 'lucide-react';
import { motion } from 'framer-motion';

const masjids = [
  {
    name: "Road Masjid",
    khutbah_time: "12:50 PM",
    location: "https://maps.google.com/?q=Road+Masjid+Pernambut",
    khateeb: "Hafiz Maleehur Rahman Omeri"
  },
  {
    name: "Nayee Masjid",
    khutbah_time: "12:45 PM",
    location: "https://maps.google.com/?q=Nayee+Masjid+Pernambut",
    khateeb: "Hafiz AbuBakar Zuhair Omeri"
  },
  {
    name: "Choti Masjid",
    khutbah_time: "12:40 PM",
    location: "https://maps.google.com/?q=Choti+Masjid+Pernambut",
    khateeb: "Hafiz Hafeezur Rahman Omeri Madani"
  },
  {
    name: "Masjid e Ihsaan",
    khutbah_time: "01:00 PM",
    location: "https://maps.google.com/?q=Masjid+e+Ihsaan+Pernambut",
    khateeb: "Dr. AbuBakar Ibrahim Omeri"
  }
];

export default function MasjidList() {
  return (
    <div className="mt-8 px-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Friday Khutbah (Jummah)</h2>
        <span className="bg-primary-100 text-primary-700 text-xs font-bold px-2 py-1 rounded-md">Weekly</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {masjids.map((m, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={index} 
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-primary-300 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-900">{m.name}</h3>
              <div className="flex items-center bg-primary-50 text-primary-700 text-xs font-semibold px-2 py-1 rounded-md">
                <Clock size={12} className="mr-1" />
                {m.khutbah_time}
              </div>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-3">
              <User size={14} className="mr-2 text-primary-500" />
              <span>Khateeb: <span className="font-medium text-gray-800">{m.khateeb}</span></span>
            </div>
            
            <a 
              href={m.location} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-2 bg-gray-50 hover:bg-primary-50 text-primary-600 text-sm font-medium rounded-lg transition-colors border border-transparent hover:border-primary-200"
            >
              <MapPin size={16} className="mr-2" />
              Get Directions
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
