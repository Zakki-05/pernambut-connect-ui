import React, { useEffect, useState } from 'react';
import { Mic2, Calendar, User, ExternalLink, PlayCircle } from 'lucide-react';
import { getBayans } from '../../services/api';
import { motion } from 'framer-motion';

export default function BayanSection() {
  const [bayan, setBayan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBayans()
      .then(res => {
        if (res.data.length > 0) {
          setBayan(res.data[0]); // Get the latest one
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching bayans:', err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading || !bayan) return null;

  return (
    <div className="mt-8 px-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center">
          <Mic2 size={20} className="mr-2 text-primary-600" /> Latest Bayan
        </h2>
        <span className="text-[10px] font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md uppercase">Featured</span>
      </div>

      <motion.div 
        whileHover={{ y: -4 }}
        className="bg-gradient-to-br from-primary-900 to-primary-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden"
      >
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-400/10 rounded-full -ml-12 -mb-12 blur-xl"></div>

        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-3">
            <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
              <User size={14} className="text-primary-100" />
            </div>
            <span className="text-xs font-medium text-primary-100">{bayan.speaker}</span>
          </div>

          <h3 className="text-xl font-bold mb-2 leading-tight">{bayan.title}</h3>
          
          <p className="text-sm text-primary-100/70 line-clamp-2 mb-4">
            {bayan.description || "Click to watch or listen to this inspiring lecture."}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center text-[10px] text-primary-200 font-medium">
              <Calendar size={12} className="mr-1" />
              {new Date(bayan.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>

            {bayan.url && (
              <a 
                href={bayan.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary-900 px-4 py-2 rounded-xl text-xs font-bold flex items-center shadow-lg hover:bg-primary-50 transition-colors"
              >
                <PlayCircle size={14} className="mr-1.5" />
                Listen Now
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
