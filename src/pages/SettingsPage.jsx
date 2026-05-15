import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Bell, Moon, Sun, Globe, Shield, Info, 
  ChevronRight, Calendar, UserCheck, Mail, Lock, 
  Database, Trash2, LogOut, HelpCircle, Trash, AlertTriangle 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const SettingToggle = ({ label, description, enabled, onToggle, icon: Icon, color = "emerald" }) => {
  const colors = {
    emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10",
    amber: "bg-amber-50 text-amber-600 dark:bg-amber-500/10",
    indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10",
    rose: "bg-rose-50 text-rose-600 dark:bg-rose-500/10"
  };

  const toggleColors = {
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    indigo: "bg-indigo-500",
    rose: "bg-rose-500"
  };

  return (
    <div className="flex items-center justify-between py-4 border-b border-slate-50 dark:border-slate-800 last:border-0">
      <div className="flex items-center gap-4">
        {Icon && (
          <div className={`w-10 h-10 rounded-xl ${colors[color]} flex items-center justify-center`}>
            <Icon size={18} />
          </div>
        )}
        <div className="flex-1">
          <p className="font-bold text-sm text-slate-900 dark:text-slate-100">{label}</p>
          {description && <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 mt-0.5">{description}</p>}
        </div>
      </div>
      <button
        onClick={onToggle}
        className={`relative w-11 h-6 rounded-full transition-all duration-300 focus:outline-none ${enabled ? toggleColors[color] : 'bg-slate-200 dark:bg-slate-800'}`}
      >
        <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );
};

const SettingItem = ({ label, description, icon: Icon, onClick, color = "slate", danger = false }) => {
  const colors = {
    slate: "bg-slate-50 text-slate-600 dark:bg-slate-800",
    rose: "bg-rose-50 text-rose-600 dark:bg-rose-500/10",
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-500/10"
  };

  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between py-4 border-b border-slate-50 dark:border-slate-800 last:border-0 group"
    >
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl ${colors[color]} flex items-center justify-center transition-colors group-hover:scale-110 duration-300`}>
          <Icon size={18} />
        </div>
        <div className="text-left">
          <p className={`font-bold text-sm ${danger ? 'text-rose-600' : 'text-slate-900 dark:text-slate-100'}`}>{label}</p>
          {description && <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 mt-0.5">{description}</p>}
        </div>
      </div>
      <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
    </button>
  );
};

const SettingsPage = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [profilePrivate, setProfilePrivate] = useState(false);
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

  const handleClearCache = () => {
    if (window.confirm(t('clear_cache_desc'))) {
      const keysToKeep = ['access_token', 'refresh_token', 'user', 'i18nextLng', 'theme'];
      Object.keys(localStorage).forEach(key => {
        if (!keysToKeep.includes(key)) {
          localStorage.removeItem(key);
        }
      });
      window.location.reload();
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm(t('confirm_delete'))) {
      alert("This feature is coming soon in the production version. Please contact support for immediate removal.");
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

      <main className="w-full px-6 py-10 space-y-8 max-w-2xl mx-auto">
        
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                  language === lang.code 
                  ? 'bg-emerald-50 border-emerald-500 dark:bg-emerald-500/5' 
                  : 'border-slate-50 dark:border-slate-800 hover:border-slate-100'
                }`}
              >
                <span className={`text-sm font-black ${language === lang.code ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-900 dark:text-slate-300'}`}>{lang.native}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{lang.name}</span>
                {language === lang.code && <div className="mt-2 w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>}
              </button>
            ))}
          </div>
        </section>

        {/* Appearance & Notifications */}
        <section className="premium-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-600">
              <Bell size={20} />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white leading-tight">{t('appearance')} & {t('notifications')}</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Preference settings</p>
            </div>
          </div>
          
          <div className="space-y-1">
            <SettingToggle 
              label={t('appearance')}
              description={t('theme_description')}
              enabled={darkMode}
              onToggle={toggleDarkMode}
              icon={darkMode ? Moon : Sun}
              color="amber"
            />
            <SettingToggle 
              label={t('push_notifications')}
              description={t('push_desc')}
              enabled={pushEnabled}
              onToggle={() => setPushEnabled(!pushEnabled)}
              icon={Bell}
              color="emerald"
            />
            <SettingToggle 
              label={t('email_updates')}
              description={t('email_desc')}
              enabled={emailEnabled}
              onToggle={() => setEmailEnabled(!emailEnabled)}
              icon={Mail}
              color="indigo"
            />
          </div>
        </section>

        {/* Privacy & Security */}
        <section className="premium-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600">
              <Shield size={20} />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white leading-tight">{t('privacy')} & {t('security')}</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Secure your account</p>
            </div>
          </div>
          
          <div className="space-y-1">
            <SettingToggle 
              label={t('profile_visibility')}
              description={t('visibility_desc')}
              enabled={profilePrivate}
              onToggle={() => setProfilePrivate(!profilePrivate)}
              icon={UserCheck}
              color="indigo"
            />
            <SettingItem 
              label={t('change_password')}
              description="Last changed 3 months ago"
              icon={Lock}
              onClick={() => alert("Redirecting to password reset...")}
            />
          </div>
        </section>

        {/* Data & Support */}
        <section className="premium-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600">
              <Info size={20} />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white leading-tight">{t('data_storage')} & {t('support')}</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Resources & Info</p>
            </div>
          </div>
          
          <div className="space-y-1">
            <SettingItem 
              label={t('clear_cache')}
              description={t('clear_cache_desc')}
              icon={Database}
              onClick={handleClearCache}
              color="blue"
            />
            <SettingItem 
              label={t('help_center')}
              description="Contact us or read FAQs"
              icon={HelpCircle}
              onClick={() => window.open('mailto:support@pernambutconnects.com')}
            />
            <SettingItem 
              label={t('about_app')}
              description="Version 2.4.0 (Build 2026.05)"
              icon={Info}
              onClick={() => alert("Pernambut Connects - Connecting our community.")}
            />
          </div>
        </section>

        {/* Danger Zone */}
        <section className="premium-card border-rose-100 dark:border-rose-900/30">
          <div className="flex items-center gap-3 mb-4 text-rose-600">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h2 className="text-lg font-black leading-tight">{t('danger_zone')}</h2>
              <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mt-0.5">Irreversible actions</p>
            </div>
          </div>
          
          <div className="space-y-1">
            <SettingItem 
              label={t('logout')}
              description="Sign out from this device"
              icon={LogOut}
              onClick={logout}
              color="rose"
            />
            <SettingItem 
              label={t('delete_account')}
              description={t('delete_desc')}
              icon={Trash2}
              onClick={handleDeleteAccount}
              color="rose"
              danger
            />
          </div>
        </section>

        <div className="pt-6">
          <button onClick={() => navigate('/profile')} className="btn-action w-full uppercase tracking-[0.2em] text-[10px] font-black">
            {t('save_changes')}
          </button>
        </div>

      </main>
    </div>
  );
};

export default SettingsPage;

