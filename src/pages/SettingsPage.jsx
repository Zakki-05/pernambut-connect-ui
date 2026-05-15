import React, { useState, useEffect } from 'react';
import { ArrowLeft, Bell, Moon, Sun, Globe, Shield, Info, ChevronRight, Calendar, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const SettingToggle = ({ label, description, enabled, onToggle }) => (
  <div className="flex items-center justify-between py-3.5">
    <div className="flex-1 mr-4">
      <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">{label}</p>
      {description && <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{description}</p>}
    </div>
    <button
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-all duration-300 focus:outline-none ${enabled ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-700'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  </div>
);

const SettingsPage = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState(i18n.language || 'en');

  const handleLanguageChange = async (lng) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
    
    if (user) {
      try {
        await api.post('/update-language/', { language: lng });
      } catch (err) {
        console.error("Failed to update language on server", err);
      }
    }
  };

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'ur', name: 'Urdu', native: 'اردو' }
  ];

  return (
    <div className="pb-24 min-h-screen bg-[#fcfcfd] dark:bg-[#020617]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#020617]/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 px-6 py-6">
        <div className="w-full flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-500 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{t('settings')}</h1>
        </div>
      </header>

      <main className="w-full px-6 py-10 space-y-8">
        
        {/* Language Section */}
        <section className="premium-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              <Globe size={20} />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white leading-tight">{t('change_language')}</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{t('select_language')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
                  language === lang.code 
                  ? 'bg-emerald-50 border-emerald-500 dark:bg-emerald-500/5' 
                  : 'border-slate-50 dark:border-slate-800 hover:border-slate-100'
                }`}
              >
                <div className="flex flex-col items-start">
                   <span className={`text-sm font-black ${language === lang.code ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-900 dark:text-slate-300'}`}>{lang.native}</span>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{lang.name}</span>
                </div>
                {language === lang.code && <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50"></div>}
              </button>
            ))}
          </div>
        </section>

        {/* Theme Mode */}
        <section className="premium-card">
           <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-600">
              {darkMode ? <Moon size={20} /> : <Sun size={20} />}
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white leading-tight">Appearance</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Customize your view</p>
            </div>
          </div>
          <SettingToggle 
            label="Dark Mode"
            description="Toggle between light and dark visual experience"
            enabled={darkMode}
            onToggle={toggleDarkMode}
          />
        </section>

        {/* Other sections removed for brevity or kept minimal */}
        <button onClick={() => navigate('/profile')} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-900/20">
          {t('save_changes')}
        </button>

      </main>
    </div>
  );
};

export default SettingsPage;
