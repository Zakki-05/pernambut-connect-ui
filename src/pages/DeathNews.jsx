import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, AlertCircle, BookOpen, X, Maximize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useMosque } from '../context/MosqueContext';
import { getCommunityUpdates } from '../services/api';
import { getHijriDate } from '../utils/dateUtils';

const DeathNews = () => {
  const navigate = useNavigate();
  const { selectedMosque } = useMosque();
  const hijri = getHijriDate();
  
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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32">
      <header className="bg-white dark:bg-slate-900 pt-16 pb-12 px-6 border-b border-slate-100 dark:border-slate-800">
        <button onClick={() => navigate('/home')} className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest mb-4">
          <ArrowLeft size={16} /> Back
        </button>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Wafat News</h1>
        <p className="text-slate-400 font-medium text-sm mt-1">{hijri.full}</p>
        
        <div className="mt-8 bg-slate-900 dark:bg-brand-600 rounded-3xl p-6 shadow-vivid relative overflow-hidden">
           <p className="text-white font-black text-2xl text-center mb-1 tracking-widest" dir="rtl">إِنَّا لِلَّٰهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ</p>
           <p className="text-white/40 text-[9px] text-center font-black uppercase tracking-[0.3em]">Official Community Alerts</p>
           <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
        </div>
      </header>

      <main className="px-6 -mt-6 relative z-10 space-y-6 max-w-lg mx-auto">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2].map(n => <div key={n} className="skeleton h-48 w-full rounded-[32px]" />)}
          </div>
        ) : newsList.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 py-20 rounded-[32px] border border-slate-100 dark:border-slate-800 text-center">
            <BookOpen size={32} className="text-slate-200 mx-auto mb-4" />
            <p className="text-slate-500 font-bold">No recent alerts</p>
          </div>
        ) : (
          newsList.map((news, idx) => (
            <div key={news.id} className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden group hover:border-brand-300 transition-all">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">{news.title}</h3>
                    <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">
                      <Clock size={12} className="text-brand-500" /> {new Date(news.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </div>
                  </div>
                  <AlertCircle size={20} className="text-red-500" />
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-50 dark:border-slate-800">
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-bold whitespace-pre-wrap">{news.content}</p>
                </div>

                {news.image && (
                  <div className="mt-6 relative rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 cursor-zoom-in group"
                    onClick={() => setSelectedImage(news.image.startsWith('http') ? news.image : `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'https://pernambut-connect-backend.onrender.com'}${news.image}`)}>
                    <img src={news.image.startsWith('http') ? news.image : `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'https://pernambut-connect-backend.onrender.com'}${news.image}`} 
                      className="w-full max-h-64 object-cover group-hover:scale-105 transition-transform duration-500" alt="Update" />
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <Maximize2 size={32} className="text-white drop-shadow-xl" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}

        <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 border border-slate-100 dark:border-slate-800 text-center shadow-soft">
          <p className="text-brand-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">Masnoon Dua</p>
          <div className="space-y-6">
            <p className="text-slate-900 dark:text-white font-black text-2xl leading-relaxed tracking-wider" dir="rtl">اللّهُـمِّ اغْفِـرْ لِحَيِّـنا وَمَيِّتِـنا وَشـاهِدِنا ، وَغائِبِـنا</p>
            <div className="h-px bg-slate-100 dark:bg-slate-800 w-1/4 mx-auto" />
            <p className="text-slate-900 dark:text-white font-black text-2xl leading-relaxed tracking-wider" dir="rtl">اَللّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ</p>
          </div>
          <p className="mt-8 text-slate-400 text-xs font-bold italic">"O Allah, forgive our living and our dead..."</p>
        </div>
      </main>

      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-xl flex items-center justify-center p-4">
            <button className="absolute top-10 right-10 p-4 bg-white/10 rounded-full text-white"><X size={28} /></button>
            <motion.img initial={{ scale:0.9 }} animate={{ scale:1 }} src={selectedImage} className="max-w-full max-h-[85vh] object-contain rounded-3xl shadow-2xl border border-white/10" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DeathNews;
