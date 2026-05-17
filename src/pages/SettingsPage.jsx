import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, Bell, Moon, Sun, Globe, Shield, Info, 
  ChevronRight, Calendar, UserCheck, Mail, Lock, 
  Database, Trash2, LogOut, HelpCircle, Trash, AlertTriangle,
  Search, User, Monitor, Smartphone, Chrome, Laptop,
  Cpu, Zap, Eye, Type, Link, Fingerprint, Activity,
  Download, MessageSquare, ShieldCheck, Heart, Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import TopNav from '../components/layout/TopNav';

const SettingToggle = ({ label, description, enabled, onToggle, icon: Icon, color = "emerald" }) => {
  const colors = {
    emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10",
    amber: "bg-amber-50 text-amber-600 dark:bg-amber-500/10",
    indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10",
    rose: "bg-rose-50 text-rose-600 dark:bg-rose-500/10",
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-500/10"
  };

  const toggleColors = {
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    indigo: "bg-indigo-500",
    rose: "bg-rose-500",
    blue: "bg-blue-500"
  };

  return (
    <motion.div 
      layout
      className="flex items-center justify-between py-4 border-b border-slate-50 dark:border-slate-800 last:border-0"
    >
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
        <motion.span 
          animate={{ x: enabled ? 20 : 0 }}
          className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm"
        />
      </button>
    </motion.div>
  );
};

const SettingItem = ({ label, description, icon: Icon, onClick, color = "slate", danger = false, badge = null }) => {
  const colors = {
    slate: "bg-slate-50 text-slate-600 dark:bg-slate-800",
    rose: "bg-rose-50 text-rose-600 dark:bg-rose-500/10",
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-500/10",
    amber: "bg-amber-50 text-amber-600 dark:bg-amber-500/10",
    emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10"
  };

  return (
    <motion.button 
      layout
      onClick={onClick}
      className="w-full flex items-center justify-between py-4 border-b border-slate-50 dark:border-slate-800 last:border-0 group"
    >
      <div className="flex items-center gap-4 text-left">
        <div className={`w-10 h-10 rounded-xl ${colors[color]} flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
          <Icon size={18} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className={`font-bold text-sm ${danger ? 'text-rose-600' : 'text-slate-900 dark:text-slate-100'}`}>{label}</p>
            {badge && <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 text-[8px] font-black uppercase tracking-tighter">{badge}</span>}
          </div>
          {description && <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 mt-0.5">{description}</p>}
        </div>
      </div>
      <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-all" />
    </motion.button>
  );
};

const SettingsPage = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [profilePrivate, setProfilePrivate] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [dataSaver, setDataSaver] = useState(false);
  const [betaEnabled, setBetaEnabled] = useState(false);
  const [language, setLanguage] = useState(i18n.language || 'en');

  const handleLanguageChange = async (lng) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
    if (user) {
      try { await api.post('/update-language/', { language: lng }); } catch (err) {}
    }
  };

  const handleClearCache = () => {
    if (window.confirm(t('clear_cache_desc'))) {
      const keysToKeep = ['access_token', 'refresh_token', 'user', 'i18nextLng', 'theme'];
      Object.keys(localStorage).forEach(key => !keysToKeep.includes(key) && localStorage.removeItem(key));
      window.location.reload();
    }
  };

  const sessions = [
    { id: 1, device: 'iPhone 15 Pro', location: 'Pernambut, IN', browser: 'Safari', active: true, icon: Smartphone },
    { id: 2, device: 'Windows PC', location: 'Chennai, IN', browser: 'Chrome', active: false, icon: Laptop }
  ];

  const sections = [
    {
      id: 'appearance',
      title: t('appearance'),
      icon: Eye,
      items: [
        { type: 'toggle', label: 'Dark Mode', description: t('theme_description'), enabled: darkMode, onToggle: toggleDarkMode, icon: darkMode ? Moon : Sun, color: 'amber' },
        { type: 'toggle', label: t('high_contrast'), description: t('high_contrast_desc'), enabled: highContrast, onToggle: () => setHighContrast(!highContrast), icon: Zap, color: 'indigo' },
        { type: 'custom', label: t('font_size'), description: `${fontSize}px`, icon: Type, color: 'blue', render: () => (
          <div className="px-4 py-2">
            <input type="range" min="12" max="24" value={fontSize} onChange={(e) => setFontSize(e.target.value)} className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500" />
            <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest"><span>Small</span><span>Default</span><span>Large</span></div>
          </div>
        )}
      ]
    },
    {
      id: 'notifications',
      title: t('notifications'),
      icon: Bell,
      items: [
        { type: 'toggle', label: t('push_notifications'), description: t('push_desc'), enabled: pushEnabled, onToggle: () => setPushEnabled(!pushEnabled), icon: Bell, color: 'emerald' },
        { type: 'toggle', label: t('email_updates'), description: t('email_desc'), enabled: emailEnabled, onToggle: () => setEmailEnabled(!emailEnabled), icon: Mail, color: 'indigo' }
      ]
    },
    {
      id: 'security',
      title: t('security') + ' & ' + t('privacy'),
      icon: Shield,
      items: [
        { type: 'toggle', label: t('profile_visibility'), description: t('visibility_desc'), enabled: profilePrivate, onToggle: () => setProfilePrivate(!profilePrivate), icon: UserCheck, color: 'indigo' },
        { type: 'action', label: t('change_password'), description: "Update your security credentials", icon: Lock, color: 'amber', onClick: () => alert("Password reset sent to your email.") },
        { type: 'action', label: t('active_sessions'), description: t('session_desc'), icon: Activity, color: 'blue', onClick: () => alert("Managing sessions...") }
      ]
    },
    {
      id: 'connectivity',
      title: t('connected_accounts'),
      icon: Link,
      items: [
        { type: 'toggle', label: t('google_sync'), description: t('google_desc'), enabled: true, onToggle: () => {}, icon: Chrome, color: 'blue' },
        { type: 'toggle', label: '2FA Authentication', description: "Secure account with Fingerprint/OTP", enabled: false, onToggle: () => {}, icon: Fingerprint, color: 'emerald' }
      ]
    },
    {
      id: 'preferences',
      title: t('app_preferences'),
      icon: Monitor,
      items: [
        { type: 'toggle', label: t('data_saver'), description: t('data_saver_desc'), enabled: dataSaver, onToggle: () => setDataSaver(!dataSaver), icon: Download, color: 'amber' },
        { type: 'toggle', label: t('beta_features'), description: t('beta_desc'), enabled: betaEnabled, onToggle: () => setBetaEnabled(!betaEnabled), icon: Cpu, color: 'rose' }
      ]
    },
    {
      id: 'support',
      title: t('support') + ' & ' + t('data_storage'),
      icon: Info,
      items: [
        { type: 'action', label: t('clear_cache'), description: t('clear_cache_desc'), icon: Database, color: 'blue', onClick: handleClearCache },
        { type: 'action', label: t('help_center'), description: "FAQs and technical support", icon: HelpCircle, color: 'blue', onClick: () => window.open('mailto:support@pernambutconnects.com') },
        { type: 'action', label: t('report_issue'), description: t('feedback_desc'), icon: MessageSquare, color: 'amber', onClick: () => alert("Opening feedback form...") }
      ]
    }
  ];

  const filteredSections = useMemo(() => {
    if (!searchQuery) return sections;
    const query = searchQuery.toLowerCase();
    return sections.map(section => ({
      ...section,
      items: section.items.filter(item => 
        item.label.toLowerCase().includes(query) || 
        (item.description && item.description.toLowerCase().includes(query))
      )
    })).filter(section => section.items.length > 0);
  }, [searchQuery, sections]);

  return (
    <div className="pb-32 min-h-screen w-full bg-[#fcfcfd] dark:bg-[#020617] transition-all duration-300 overflow-x-hidden" style={{ fontSize: `${fontSize}px` }}>
      {/* Centered Top Navbar */}
      <TopNav title={t('settings')} showBack={true} />

      <main className="w-full px-6 py-24 space-y-8 max-w-7xl mx-auto">
        
        {!searchQuery && (
          <div className="relative group max-w-2xl mx-auto mb-10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder={t('search_settings')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-bold text-sm shadow-sm"
            />
          </div>
        )}
        
        {!searchQuery && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-[32px] p-8 shadow-xl shadow-emerald-500/10 border border-emerald-500/10"
            style={{ background: 'linear-gradient(135deg, #059669 0%, #022c22 100%)' }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            <div className="relative z-10 flex items-center gap-6">
              <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-xl overflow-hidden">
                {user?.profile_image ? <img src={user.profile_image} className="w-full h-full object-cover" /> : <User size={32} />}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-black text-white drop-shadow-sm">{user?.name || 'Community Member'}</h3>
                <p className="text-emerald-50/70 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5">{user?.email || 'zakkiadnan05@gmail.com'}</p>
                <div className="flex items-center gap-2 mt-4">
                  <span className="px-3 py-1 rounded-full bg-amber-400 text-[9px] font-black text-amber-950 uppercase tracking-widest shadow-lg shadow-amber-400/20 border border-amber-300">
                    <Star size={10} className="inline-block mr-1 fill-current" /> Gold Contributor
                  </span>
                  {user?.is_staff && (
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[9px] font-black text-white uppercase tracking-widest border border-white/20">
                      <Shield size={10} className="inline-block mr-1" /> Pro User
                    </span>
                  )}
                </div>
              </div>
              <button onClick={() => navigate('/profile')} className="w-10 h-10 rounded-xl bg-white text-slate-900 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.section>
        )}

        {/* Language Selection - Always Show if no search */}
        {!searchQuery && (
          <section className="premium-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600"><Globe size={20} /></div>
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white leading-tight">{t('change_language')}</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{t('select_language')}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[ { code: 'en', native: 'English', label: 'English' }, { code: 'ta', native: 'தமிழ்', label: 'Tamil' }, { code: 'ur', native: 'اردو', label: 'Urdu' } ].map((lang) => (
                <button key={lang.code} onClick={() => handleLanguageChange(lang.code)} className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${language === lang.code ? 'bg-emerald-50 border-emerald-500 dark:bg-emerald-500/5' : 'border-slate-50 dark:border-slate-800 hover:border-slate-100'}`}>
                  <span className={`text-sm font-black ${language === lang.code ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-900 dark:text-slate-300'}`}>{lang.native}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{lang.label}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        <AnimatePresence mode="popLayout">
          {filteredSections.map((section, idx) => (
            <motion.section 
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.05 }}
              className="premium-card"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center text-slate-600 dark:text-slate-400">
                  <section.icon size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white leading-tight">{section.title}</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Manage your preferences</p>
                </div>
              </div>
              
              <div className="space-y-1">
                {section.items.map((item, i) => (
                  <React.Fragment key={i}>
                    {item.type === 'toggle' && <SettingToggle {...item} />}
                    {item.type === 'action' && <SettingItem {...item} />}
                    {item.type === 'custom' && (
                      <div className="py-4 border-b border-slate-50 dark:border-slate-800 last:border-0">
                        <div className="flex items-center gap-4 mb-2">
                          <div className={`w-10 h-10 rounded-xl bg-${item.color}-50 text-${item.color}-600 dark:bg-${item.color}-500/10 flex items-center justify-center`}>
                            <item.icon size={18} />
                          </div>
                          <div>
                            <p className="font-bold text-sm text-slate-900 dark:text-slate-100">{item.label}</p>
                            <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">{item.description}</p>
                          </div>
                        </div>
                        {item.render()}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.section>
          ))}
        </AnimatePresence>

        {/* Danger Zone */}
        {!searchQuery && (
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
              <SettingItem label={t('logout')} description="Sign out from this device" icon={LogOut} onClick={logout} color="rose" />
              <SettingItem label={t('delete_account')} description={t('delete_desc')} icon={Trash2} onClick={() => alert("Contact support for deletion.")} color="rose" danger />
            </div>
          </section>
        )}

        <div className="pt-6">
          <button onClick={() => navigate('/profile')} className="btn-action w-full uppercase tracking-[0.2em] text-[10px] font-black group">
            <Zap size={14} className="group-hover:animate-pulse" />
            {t('save_changes')}
          </button>
          <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest mt-8 flex items-center justify-center gap-2">
            Made with <Heart size={10} className="text-rose-500 fill-rose-500" /> for Pernambut
          </p>
        </div>

      </main>
    </div>
  );
};

export default SettingsPage;


