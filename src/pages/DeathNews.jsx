import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, AlertCircle, BookOpen, X, Maximize2, Share2, Info, Star } from 'lucide-react';
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
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-[#020617] pb-40">
      {/* ── Production Header ── */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#020617]/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 px-6 py-6">
        <div className="w-full flex items-center justify-between">
          <button onClick={() => navigate('/home')} className="flex items-center gap-3 text-slate-400 hover:text-emerald-500 transition-colors group">
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:-translate-x-1 transition-transform">
              <ArrowLeft size={16} />
            </div>
            <span className="text-xs font-black uppercase tracking-widest">Back Home</span>
          </button>
          
          <div className="flex flex-col items-start">
             <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">Wafat Alerts</h1>
             <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">{hijri.full}</p>
          </div>
        </div>
      </header>

      <main className="w-full px-6 py-12 space-y-10">
        
        {/* Community Banner */}
        <section className="reveal">
          <div className="bg-slate-950 rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 text-left">
              <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-6">Inna lillahi wa inna ilayhi raji'oon</p>
              <h2 className="text-4xl font-black mb-8 leading-[1.3] tracking-tight" dir="rtl">
                إِنَّا لِلَّٰهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
              </h2>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                <Info size={14} className="text-emerald-500" /> Community News & Janaza Alerts
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] -mr-32 -mt-32" />
          </div>
        </section>

        {/* Content List */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2].map(n => <div key={n} className="h-64 w-full bg-slate-100 dark:bg-slate-900 animate-pulse rounded-[40px]" />)}
            </div>
          ) : newsList.length === 0 ? (
            <div className="premium-card text-center py-24 border-dashed">
              <BookOpen size={48} className="text-slate-200 dark:text-slate-800 mx-auto mb-6" />
              <p className="text-slate-400 font-black uppercase tracking-widest text-[11px]">No Recent Announcements</p>
            </div>
          ) : (
            newsList.map((news, idx) => (
              <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:idx*0.1 }}
                key={news.id} className="premium-card group relative">
                
                <div className="flex justify-between items-start mb-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                       <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[9px] font-black uppercase tracking-widest dark:text-white">Community Alert</span>
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                         <Clock size={12} className="text-emerald-500" /> {new Date(news.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                       </span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight leading-tight group-hover:text-emerald-500 transition-colors">{news.title}</h3>
                  </div>
                  <button className="p-3 text-slate-300 hover:text-emerald-500 transition-colors"><Share2 size={20} /></button>
                </div>

                <div className="bg-slate-50 dark:bg-[#0f172a] rounded-3xl p-8 border border-slate-100 dark:border-slate-800/50">
                  <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed font-semibold whitespace-pre-wrap">{news.content}</p>
                </div>

                {news.image && (
                  <div className="mt-8 relative rounded-[32px] overflow-hidden border border-slate-200 dark:border-slate-800 cursor-zoom-in group/img"
                    onClick={() => setSelectedImage(news.image)}>
                    <img src={news.image.startsWith('http') ? news.image : `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'https://pernambut-connect-backend.onrender.com'}${news.image}`} 
                      className="w-full max-h-[400px] object-cover group-hover/img:scale-105 transition-transform duration-700" alt="News Update" />
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-all">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                        <Maximize2 size={24} className="text-white" />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>

        {/* Masnoon Dua Footer */}
        <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[48px] p-12 text-center shadow-soft">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10">Masnoon Dua</div>
           <div className="space-y-10">
              <p className="text-slate-950 dark:text-white font-black text-3xl leading-loose tracking-widest" dir="rtl">اللّهُـمِّ اغْفِـرْ لِحَيِّـنا وَمَيِّتِـنا وَشـاهِدِنا ، وَغائِبِـنا</p>
              <div className="flex items-center justify-center gap-4">
                 <div className="h-px bg-slate-100 dark:bg-slate-800 flex-1 max-w-[80px]" />
                 <Star size={16} className="text-amber-500" fill="currentColor" />
                 <div className="h-px bg-slate-100 dark:bg-slate-800 flex-1 max-w-[80px]" />
              </div>
              <p className="text-slate-950 dark:text-white font-black text-3xl leading-loose tracking-widest" dir="rtl">اَللّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ</p>
           </div>
           <p className="mt-12 text-slate-400 text-xs font-black italic uppercase tracking-widest leading-relaxed max-w-xs mx-auto">"O Allah, forgive our living and our dead, those present and those absent..."</p>
        </section>

      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-slate-950/98 backdrop-blur-2xl flex items-center justify-center p-6">
            <button className="absolute top-10 right-10 p-5 bg-white/10 rounded-full text-white hover:rotate-90 transition-all duration-300"><X size={32} /></button>
            <motion.img initial={{ scale:0.9, y: 20 }} animate={{ scale:1, y: 0 }} src={selectedImage.startsWith('http') ? selectedImage : `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'https://pernambut-connect-backend.onrender.com'}${selectedImage}`} className="max-w-full max-h-[85vh] object-contain rounded-[40px] shadow-2xl border border-white/5" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DeathNews;
