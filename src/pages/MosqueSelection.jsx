import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation, Search, Loader2, Star, ChevronRight, Compass } from 'lucide-react';
import { useMosque } from '../context/MosqueContext';
import { motion, AnimatePresence } from 'framer-motion';
import { getMosques, getNearestMosque } from '../services/api';

const FALLBACK_MOSQUES = [
  { id: 1, name: 'Chowk Masjid', address: 'Pernambut', type: 'JAMIYA' },
  { id: 2, name: 'Road Masjid', address: 'Pernambut', type: 'MARKAZ' },
  { id: 3, name: 'Lal Masjid', address: 'Pernambut', type: 'LOCAL' },
  { id: 4, name: 'Madina Masjid', address: 'Pernambut', type: 'LOCAL' },
];

const MosqueSelection = () => {
  const navigate = useNavigate();
  const { selectMosque } = useMosque();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [mosques, setMosques] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMosques = async () => {
      try {
        const response = await getMosques();
        setMosques(response.data);
      } catch (err) {
        setMosques(FALLBACK_MOSQUES);
      } finally { setLoading(false); }
    };
    fetchMosques();
  }, []);

  const handleSelect = (mosque) => {
    selectMosque(mosque);
    navigate('/home');
  };

  const handleDetectLocation = () => {
    setIsDetecting(true);
    if (!navigator.geolocation) {
      alert('Geolocation not supported');
      setIsDetecting(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await getNearestMosque(pos.coords.latitude, pos.coords.longitude);
          handleSelect(res.data);
        } catch (err) {
          if (mosques.length > 0) handleSelect(mosques[0]);
        } finally { setIsDetecting(false); }
      },
      () => {
        alert('Location detection failed');
        setIsDetecting(false);
      }
    );
  };

  const filtered = mosques.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (m.address || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-[#020617] pb-24">
      {/* ── Premium Explorer Header ── */}
      <div className="bg-[#020617] px-6 pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #10b981 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        
        <div className="w-full relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-[28px] border border-emerald-500/20 flex items-center justify-center text-emerald-500">
               <Compass size={32} className="animate-spin-slow" />
            </div>
          </motion.div>
          
          <h1 className="text-4xl font-black text-white tracking-tight mb-3">Mosque Explorer</h1>
          <p className="text-slate-400 font-medium max-w-sm mx-auto">Select your primary masjid to personalize your community experience.</p>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#fcfcfd] dark:from-[#020617] to-transparent" />
      </div>

      <main className="w-full px-6 -mt-10 relative z-10">
        
        {/* Search & Location Bar */}
        <div className="space-y-4">
          <div className="premium-card p-3 flex items-center gap-3">
            <div className="flex-1 flex items-center gap-4 px-4 h-14">
               <Search size={20} className="text-slate-300" />
               <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search masjids in Pernambut..." 
                 className="bg-transparent border-none outline-none w-full text-base font-bold text-slate-900 dark:text-white placeholder:text-slate-300" />
            </div>
            <button onClick={handleDetectLocation} disabled={isDetecting} 
              className="h-14 px-6 bg-slate-950 dark:bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-emerald-600 transition-all disabled:opacity-50">
              {isDetecting ? <Loader2 className="animate-spin" size={16} /> : <Navigation size={16} fill="currentColor" />}
              <span className="hidden sm:inline">Near Me</span>
            </button>
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Available Masjids</h2>
            <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md uppercase">{filtered.length} Local Units</span>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-4">
              <Loader2 size={32} className="text-emerald-500 animate-spin" />
              <p className="text-slate-400 text-sm font-bold animate-pulse">Syncing Registry...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((mosque, idx) => (
                  <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                    key={mosque.id} onClick={() => handleSelect(mosque)}
                    className="premium-card group cursor-pointer hover:ring-2 hover:ring-emerald-500/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-emerald-500 transition-colors">
                           <MapPin size={24} />
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-slate-950 dark:text-white leading-none group-hover:text-emerald-500 transition-colors">{mosque.name}</h3>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{mosque.address || 'Pernambut Unit'}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-800" />
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                              <Star size={10} fill="currentColor" /> Active
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-300 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                        <ChevronRight size={20} strokeWidth={3} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filtered.length === 0 && (
                <div className="text-center py-20 bg-white dark:bg-slate-900/50 rounded-[40px] border border-dashed border-slate-200 dark:border-slate-800">
                  <MapPin size={40} className="text-slate-100 dark:text-slate-800 mx-auto mb-4" />
                  <p className="text-slate-400 font-bold">No masjid found matching your search</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Modern Footer Branding */}
      <footer className="mt-20 text-center pb-20 w-full">
        <div className="inline-flex items-center gap-2 text-[10px] font-black text-slate-300 dark:text-slate-800 uppercase tracking-[0.4em]">
          <Star size={12} fill="currentColor" /> Pernambut Digital Hub
        </div>
      </footer>
    </div>
  );
};

export default MosqueSelection;
