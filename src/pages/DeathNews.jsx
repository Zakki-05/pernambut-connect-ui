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
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-32">
      <header className="pt-16 pb-12 px-6 border-b border-slate-100 dark:border-slate-900">
        <button onClick={() => navigate('/home')} className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] mb-6">
          <ArrowLeft size={16} /> Back
        </button>
        <h1 className="text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-none">Wafat Alerts</h1>
        <p className="text-slate-500 font-bold text-sm mt-3 uppercase tracking-wider">{hijri.full}</p>
        
        <div className="mt-10 bg-slate-950 rounded-[40px] p-10 shadow-2xl shadow-slate-950/20 relative overflow-hidden">
           <p className="text-white font-black text-3xl text-center mb-4 tracking-widest leading-loose" dir="rtl">إِنَّا لِلَّٰهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ</p>
           <p className="text-blue-500 text-[10px] text-center font-black uppercase tracking-[0.4em]">Official Janaza Registry</p>
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl -mr-10 -mt-10" />
        </div>
      </header>

      <main className="px-6 -mt-10 relative z-10 space-y-8 max-w-lg mx-auto">
        {isLoading ? (
          <div className="space-y-6">
            {[1, 2].map(n => <div key={n} className="skeleton h-56 w-full rounded-[48px]" />)}
          </div>
        ) : newsList.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 py-24 rounded-[48px] border border-slate-100 dark:border-slate-800 text-center shadow-sm">
            <BookOpen size={40} className="text-slate-100 mx-auto mb-6" />
            <p className="text-slate-400 font-black uppercase tracking-widest text-[11px]">No Recent Alerts</p>
          </div>
        ) : (
          newsList.map((news, idx) => (
            <div key={news.id} className="bg-white dark:bg-slate-900 rounded-[48px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden group hover:border-blue-400 transition-all">
              <div className="p-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-2xl font-black text-slate-950 dark:text-white leading-tight tracking-tight">{news.title}</h3>
                    <div className="flex items-center gap-2 text-[11px] font-black text-slate-300 uppercase tracking-widest mt-3">
                      <Clock size={14} className="text-blue-500" /> {new Date(news.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600"><AlertCircle size={24} strokeWidth={2.5} /></div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-6 border border-slate-50 dark:border-slate-800">
                  <p className="text-base text-slate-950 dark:text-slate-200 leading-relaxed font-bold whitespace-pre-wrap">{news.content}</p>
                </div>

                {news.image && (
                  <div className="mt-8 relative rounded-[32px] overflow-hidden border border-slate-100 dark:border-slate-800 cursor-zoom-in group"
                    onClick={() => setSelectedImage(news.image)}>
                    <img src={news.image.startsWith('http') ? news.image : `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'https://pernambut-connect-backend.onrender.com'}${news.image}`} 
                      className="w-full max-h-72 object-cover group-hover:scale-110 transition-transform duration-700" alt="Update" />
                    <div className="absolute inset-0 bg-slate-950/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <Maximize2 size={40} className="text-white drop-shadow-2xl" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}

        <div className="bg-white dark:bg-slate-900 rounded-[48px] p-10 border border-slate-100 dark:border-slate-800 text-center shadow-xl shadow-slate-950/5">
          <p className="text-blue-600 text-[10px] font-black uppercase tracking-[0.4em] mb-8">Masnoon Dua</p>
          <div className="space-y-8">
            <p className="text-slate-950 dark:text-white font-black text-3xl leading-loose tracking-widest" dir="rtl">اللّهُـمِّ اغْفِـرْ لِحَيِّـنا وَمَيِّتِـنا وَشـاهِدِنا</p>
            <div className="h-px bg-slate-100 dark:bg-slate-800 w-1/6 mx-auto" />
            <p className="text-slate-950 dark:text-white font-black text-3xl leading-loose tracking-widest" dir="rtl">اَللّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ</p>
          </div>
          <p className="mt-10 text-slate-400 text-xs font-black italic uppercase tracking-widest">"O Allah, forgive our living and our dead..."</p>
        </div>
      </main>

      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-slate-950/98 backdrop-blur-3xl flex items-center justify-center p-6">
            <button className="absolute top-10 right-10 p-5 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all"><X size={32} /></button>
            <motion.img initial={{ scale:0.8, rotate:-2 }} animate={{ scale:1, rotate:0 }} src={selectedImage.startsWith('http') ? selectedImage : `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'https://pernambut-connect-backend.onrender.com'}${selectedImage}`} className="max-w-full max-h-[80vh] object-contain rounded-[48px] shadow-2xl border border-white/5" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DeathNews;
