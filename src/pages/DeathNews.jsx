import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, AlertCircle, BookOpen, Share2, X, Maximize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useMosque } from '../context/MosqueContext';
import { getCommunityUpdates } from '../services/api';

const DeathNews = () => {
  const navigate = useNavigate();
  const { selectedMosque } = useMosque();
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (selectedMosque?.id) {
      getCommunityUpdates(selectedMosque.id)
        .then(res => {
          const deathNews = res.data.filter(update => update.type === 'DEATH');
          setNewsList(deathNews);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Error fetching death news:', err);
          setIsLoading(false);
        });
    }
  }, [selectedMosque]);

  const isToday = (dateStr) => {
    const today = new Date().toISOString().split('T')[0];
    const itemDate = new Date(dateStr).toISOString().split('T')[0];
    return itemDate === today;
  };

  return (
    <div className="pb-24 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-700 via-primary-600 to-emerald-500 px-6 pt-12 pb-12 rounded-b-[40px] text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-10 -mb-10"></div>
        
        <div className="flex items-center mb-3">
          <button onClick={() => navigate('/')} className="p-2 -ml-2 mr-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft size={22} className="text-white" />
          </button>
          <h1 className="text-2xl font-bold">Wafat News</h1>
        </div>
        <div className="text-center py-2">
          <p className="text-white font-bold text-lg mb-1" dir="rtl">إِنَّا لِلَّٰهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ</p>
          <p className="text-white/70 text-xs italic tracking-widest uppercase">Inna lillahi wa inna ilayhi rajioon</p>
        </div>
      </div>

      {/* Urgent Banner if any today */}
      {newsList.some(d => isToday(d.created_at)) ? (
        <div className="px-6 -mt-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-red-100 rounded-2xl p-4 flex items-center shadow-lg"
          >
            <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <AlertCircle size={20} className="text-red-500" />
            </div>
            <div>
              <p className="text-sm text-gray-900 font-bold">New Janaza Today</p>
              <p className="text-xs text-gray-500">Please check details below for timings</p>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="px-6 -mt-6 relative z-10">
          <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center justify-between border border-gray-100">
             <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center mr-3">
                  <BookOpen size={20} className="text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Community News</p>
                  <p className="text-[11px] text-gray-400">Updates on local transitions</p>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Death News Cards */}
      <div className="px-6 mt-6 space-y-4">
        {newsList.map((news, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={news.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            {/* Top colored bar */}
            <div className={`h-1.5 ${isToday(news.created_at) ? 'bg-red-500' : 'bg-gray-300'}`}></div>

            <div className="p-5 pb-0">
              {/* Name & Badge */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{news.title}</h3>
                  <div className="flex items-center text-xs text-gray-400 mt-1">
                    <Clock size={12} className="mr-1" />
                    {new Date(news.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </div>
                </div>
                {isToday(news.created_at) && (
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-200 uppercase">New</span>
                )}
              </div>

              {/* Message Content */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-medium">
                  {news.content}
                </p>
              </div>
            </div>

            {news.image && (
              <div className="px-5 pt-4">
                <div 
                  className="relative w-full bg-gray-100 overflow-hidden group cursor-zoom-in rounded-xl border border-gray-100"
                  onClick={() => setSelectedImage(news.image.startsWith('http') ? news.image : `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'https://pernambut-connect-backend.onrender.com'}${news.image}`)}
                >
                  <img 
                    src={news.image.startsWith('http') ? news.image : `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'https://pernambut-connect-backend.onrender.com'}${news.image}`} 
                    alt={news.title}
                    className="w-full max-h-[400px] object-contain mx-auto transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-md p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Share2 size={16} className="text-white" />
                  </div>
                </div>
              </div>
            )}

            <div className="px-5 pb-5 pt-3">
              <div className="flex items-center text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                <AlertCircle size={10} className="mr-1" /> Verified Official News
              </div>
            </div>
          </motion.div>
        ))}

        {newsList.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <BookOpen size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-400">No death news posted yet.</p>
          </div>
        )}
        
        {isLoading && (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Dua Section */}
      <div className="px-6 mt-8 mb-6">
        <div className="bg-gray-900 rounded-2xl p-5 text-center shadow-xl">
          <p className="text-white/60 text-[10px] uppercase tracking-widest mb-3">Masnoon Dua for the Deceased</p>
          <div className="space-y-4">
            <div>
              <p className="text-white font-semibold text-base leading-relaxed" dir="rtl">
                اللهُـمِّ اغْفِـرْ لِحَيِّـنا وَمَيِّتِـنا وَشـاهِدِنا ، وَغائِبِـنا ، وَصَغيـرِنا وَكَبيـرِنا ، وَذَكَـرِنا وَأُنْثـانا
              </p>
            </div>
            <div className="h-[1px] bg-white/10 w-1/2 mx-auto"></div>
            <div>
              <p className="text-white font-semibold text-base leading-relaxed" dir="rtl">
                اَللّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ
              </p>
            </div>
          </div>
          <p className="mt-4 text-primary-400 text-[11px] italic italic">"O Allah, forgive our living and our dead..."</p>
        </div>
      </div>
      
      {/* Photo Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute top-10 right-6 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <X size={24} />
            </motion.button>
            
            <motion.img 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              src={selectedImage}
              alt="Wafat News Full Size"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            
            <div className="absolute bottom-10 left-0 right-0 text-center">
               <p className="text-white/50 text-xs">Pernambut Connect Official News</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DeathNews;
