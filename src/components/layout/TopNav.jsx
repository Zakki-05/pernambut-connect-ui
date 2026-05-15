import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, Users, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TopNav = ({ title, showBack = false }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-[100] bg-white/80 dark:bg-[#020617]/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-[24px] shadow-2xl shadow-slate-900/5 transition-all duration-300">
      <div className="px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack ? (
            <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-500 transition-colors">
              <ArrowLeft size={18} />
            </button>
          ) : (
            <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-emerald-500/20">ﺑ</div>
          )}
          <h1 className="text-base font-black tracking-tighter dark:text-white truncate max-w-[120px] sm:max-w-none">
            {title || 'Pernambut Connect'}
          </h1>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
           <button className="p-2 text-slate-400 hover:text-emerald-500 transition-colors hidden sm:block"><Search size={18} /></button>
           <button onClick={() => navigate('/notifications')} className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 relative">
             <Bell size={16} />
             <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800" />
           </button>
           <button onClick={() => navigate('/profile')} className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <Users size={16} />
           </button>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
