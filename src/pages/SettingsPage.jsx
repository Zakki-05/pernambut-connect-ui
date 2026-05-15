import React, { useState, useEffect } from 'react';
import { ArrowLeft, Bell, Moon, Sun, Globe, Shield, Info, ChevronRight, Calendar, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const SettingToggle = ({ label, description, enabled, onToggle }) => (
  <div className="flex items-center justify-between py-3.5">
    <div className="flex-1 mr-4">
      <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">{label}</p>
      {description && <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{description}</p>}
    </div>
    <button
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-all duration-300 focus:outline-none ${enabled ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  </div>
);

const SettingsPage = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  
  // Load settings from localStorage or use defaults
  const getInitialSetting = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : defaultValue;
  };

  const [notifications, setNotifications] = useState(() => getInitialSetting('settings_notifications', true));
  const [janazaAlerts, setJanazaAlerts] = useState(() => getInitialSetting('settings_janaza', true));
  const [eventReminders, setEventReminders] = useState(() => getInitialSetting('settings_events', true));
  const [language, setLanguage] = useState(() => localStorage.getItem('settings_language') || 'English');
  
  const [prayerOffsets, setPrayerOffsets] = useState(() => 
    getInitialSetting('settings_prayer_offsets', { Fajr: 0, Dhuhr: 0, Asr: 0, Maghrib: 0, Isha: 0 })
  );

  const [privacy, setPrivacy] = useState(() => 
    getInitialSetting('settings_privacy', { publicProfile: false, mosqueActivity: true })
  );

  const [accessibility, setAccessibility] = useState(() => 
    getInitialSetting('settings_accessibility', { largeText: false, screenReader: true })
  );

  const [cacheSize, setCacheSize] = useState('12.4 MB');

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('settings_notifications', JSON.stringify(notifications));
    localStorage.setItem('settings_janaza', JSON.stringify(janazaAlerts));
    localStorage.setItem('settings_events', JSON.stringify(eventReminders));
    localStorage.setItem('settings_language', language);
    localStorage.setItem('settings_prayer_offsets', JSON.stringify(prayerOffsets));
    localStorage.setItem('settings_privacy', JSON.stringify(privacy));
    localStorage.setItem('settings_accessibility', JSON.stringify(accessibility));

    // Apply accessibility changes
    if (accessibility.largeText) {
      document.documentElement.style.fontSize = '115%';
    } else {
      document.documentElement.style.fontSize = '100%';
    }
  }, [notifications, janazaAlerts, eventReminders, language, prayerOffsets, privacy, accessibility]);

  const updatePrayerOffset = (prayer, delta) => {
    setPrayerOffsets(prev => ({
      ...prev,
      [prayer]: prev[prayer] + delta
    }));
  };

  const handleClearCache = () => {
    if (window.confirm('Are you sure you want to clear all app cache and local data? This will log you out.')) {
      localStorage.clear();
      window.location.href = '/login';
    }
  };

  return (
    <div className="pb-24 min-h-screen bg-gray-50 dark:bg-[#080c14]">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-700 via-primary-600 to-sky-400 px-6 pt-12 pb-10 rounded-b-[40px] text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-10 -mt-10" />
        <div className="flex items-center">
          <button onClick={() => navigate('/profile')} className="p-2 -ml-2 mr-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft size={22} className="text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
        </div>
      </div>

      <div className="px-6 mt-6">
        {/* Notifications Section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 mb-5">
          <div className="flex items-center mb-2">
            <Bell size={18} className="text-primary-600 mr-2" />
            <h2 className="font-bold text-gray-800 dark:text-gray-100">Notifications</h2>
          </div>
          <div className="divide-y divide-gray-50">
            <SettingToggle 
              label="Push Notifications"
              description="Receive alerts for announcements and events"
              enabled={notifications}
              onToggle={() => setNotifications(!notifications)}
            />
            <SettingToggle 
              label="Janaza Alerts"
              description="Get instant alerts for Janaza announcements"
              enabled={janazaAlerts}
              onToggle={() => setJanazaAlerts(!janazaAlerts)}
            />
            <SettingToggle 
              label="Event Reminders"
              description="Reminders 1 hour before events"
              enabled={eventReminders}
              onToggle={() => setEventReminders(!eventReminders)}
            />
          </div>
        </div>

        {/* Prayer Time Adjustments */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 mb-5">
          <div className="flex items-center mb-4">
            <Calendar size={18} className="text-primary-600 mr-2" />
            <h2 className="font-bold text-gray-800 dark:text-gray-100">Prayer Adjustments</h2>
          </div>
          <p className="text-[10px] text-gray-500 mb-4 italic">Adjust timing offsets if your local mosque varies from standard calculation.</p>
          <div className="space-y-3">
            {Object.keys(prayerOffsets).map((prayer) => (
              <div key={prayer} className="flex items-center justify-between py-1">
                <span className="text-sm font-medium text-gray-700">{prayer}</span>
                <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-100">
                  <button 
                    onClick={() => updatePrayerOffset(prayer, -1)}
                    className="w-8 h-8 flex items-center justify-center text-primary-600 font-bold hover:bg-white rounded-md transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-gray-800">{prayerOffsets[prayer]} min</span>
                  <button 
                    onClick={() => updatePrayerOffset(prayer, 1)}
                    className="w-8 h-8 flex items-center justify-center text-primary-600 font-bold hover:bg-white rounded-md transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Appearance Section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 mb-5">
          <div className="flex items-center mb-4">
            <Moon size={18} className="text-primary-600 mr-2" />
            <h2 className="font-bold text-gray-800 dark:text-gray-100">Theme Mode</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Light Mode Card */}
            <div 
              onClick={() => darkMode && toggleDarkMode()}
              className={`relative rounded-2xl p-4 border-2 transition-all cursor-pointer ${
                !darkMode 
                ? 'border-primary-500 bg-primary-50 ring-4 ring-primary-500/10' 
                : 'border-gray-100 bg-gray-50 hover:border-gray-200'
              }`}
            >
              <div className="bg-white rounded-lg shadow-sm p-3 mb-3 border border-gray-100">
                <div className="w-full h-2 bg-gray-100 rounded mb-2"></div>
                <div className="w-2/3 h-2 bg-gray-50 rounded"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Sun size={14} className={!darkMode ? 'text-primary-600 mr-2' : 'text-gray-400 mr-2'} />
                  <span className={`text-sm font-bold ${!darkMode ? 'text-primary-700' : 'text-gray-600'}`}>Light</span>
                </div>
                {!darkMode && <div className="w-2 h-2 bg-primary-600 rounded-full"></div>}
              </div>
            </div>

            {/* Dark Mode Card */}
            <div 
              onClick={() => !darkMode && toggleDarkMode()}
              className={`relative rounded-2xl p-4 border-2 transition-all cursor-pointer ${
                darkMode 
                ? 'border-primary-500 bg-primary-900/20 ring-4 ring-primary-500/10' 
                : 'border-gray-100 bg-gray-50 hover:border-gray-200'
              }`}
            >
              <div className="bg-slate-800 rounded-lg shadow-sm p-3 mb-3 border border-slate-700">
                <div className="w-full h-2 bg-slate-700 rounded mb-2"></div>
                <div className="w-2/3 h-2 bg-slate-600 rounded"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Moon size={14} className={darkMode ? 'text-primary-400 mr-2' : 'text-gray-400 mr-2'} />
                  <span className={`text-sm font-bold ${darkMode ? 'text-primary-400' : 'text-gray-600'}`}>Dark</span>
                </div>
                {darkMode && <div className="w-2 h-2 bg-primary-600 rounded-full"></div>}
              </div>
            </div>
          </div>
        </div>

        {/* Privacy & Visibility Section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 mb-5">
          <div className="flex items-center mb-2">
            <UserCheck size={18} className="text-primary-600 mr-2" />
            <h2 className="font-bold text-gray-800 dark:text-gray-100">Privacy & Visibility</h2>
          </div>
          <div className="divide-y divide-gray-50">
            <SettingToggle 
              label="Public Profile"
              description="Allow other members to find you"
              enabled={privacy.publicProfile}
              onToggle={() => setPrivacy(prev => ({ ...prev, publicProfile: !prev.publicProfile }))}
            />
            <SettingToggle 
              label="Show Mosque Activity"
              description="Show when you check into a masjid"
              enabled={privacy.mosqueActivity}
              onToggle={() => setPrivacy(prev => ({ ...prev, mosqueActivity: !prev.mosqueActivity }))}
            />
          </div>
        </div>

        {/* Language Section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 mb-5">
          <div className="flex items-center mb-4">
            <Globe size={18} className="text-primary-600 mr-2" />
            <h2 className="font-bold text-gray-800 dark:text-gray-100">Language</h2>
          </div>
          <div className="space-y-2">
            {['English', 'Tamil', 'Urdu'].map((lang) => (
              <div
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                  language === lang 
                  ? 'bg-primary-50 border-2 border-primary-500' 
                  : 'border-2 border-gray-100 hover:border-gray-200'
                }`}
              >
                <span className={`font-medium text-sm ${language === lang ? 'text-primary-700' : 'text-gray-600'}`}>{lang}</span>
                {language === lang && <div className="w-3 h-3 bg-primary-600 rounded-full"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Account & Security Section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 mb-5">
          <div className="flex items-center mb-4">
            <Shield size={18} className="text-primary-600 mr-2" />
            <h2 className="font-bold text-gray-800 dark:text-gray-100">Account & Security</h2>
          </div>
          <div className="divide-y divide-gray-50">
            <div className="flex items-center justify-between py-3.5 cursor-pointer hover:bg-gray-50">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">Change Password</p>
                <p className="text-[10px] text-gray-400">Update your account security</p>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </div>
            <div className="flex items-center justify-between py-3.5 cursor-pointer hover:bg-gray-50">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">Two-Factor Authentication</p>
                <p className="text-[10px] text-gray-400 text-red-500">Not configured</p>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </div>
          </div>
        </div>

        {/* Accessibility Section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 mb-5">
          <div className="flex items-center mb-2">
            <Globe size={18} className="text-primary-600 mr-2" />
            <h2 className="font-bold text-gray-800 dark:text-gray-100">Accessibility</h2>
          </div>
          <div className="divide-y divide-gray-50">
            <SettingToggle 
              label="Large Text"
              description="Make text easier to read"
              enabled={accessibility.largeText}
              onToggle={() => setAccessibility(prev => ({ ...prev, largeText: !prev.largeText }))}
            />
            <SettingToggle 
              label="Screen Reader Support"
              description="Optimized for accessibility tools"
              enabled={accessibility.screenReader}
              onToggle={() => setAccessibility(prev => ({ ...prev, screenReader: !prev.screenReader }))}
            />
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-5">
          <div className="flex items-center p-5 pb-3">
            <Info size={18} className="text-primary-600 mr-2" />
            <h2 className="font-bold text-gray-800 dark:text-gray-100">Support & Help</h2>
          </div>
          <div className="divide-y divide-gray-50">
            <div className="flex items-center justify-between px-5 py-3.5 cursor-pointer hover:bg-gray-50">
              <span className="text-sm text-gray-600">Help Center</span>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
            <div className="flex items-center justify-between px-5 py-3.5 cursor-pointer hover:bg-gray-50">
              <span className="text-sm text-gray-600">Contact Support</span>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
            <div className="flex items-center justify-between px-5 py-3.5 cursor-pointer hover:bg-gray-50">
              <span className="text-sm text-gray-600">Privacy Policy</span>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
            <div className="flex items-center justify-between px-5 py-3.5 cursor-pointer hover:bg-gray-50">
              <span className="text-sm text-gray-600">Terms of Service</span>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Data & Storage Section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 mb-5">
          <div className="flex items-center mb-4">
            <Info size={18} className="text-primary-600 mr-2" />
            <h2 className="font-bold text-gray-800 dark:text-gray-100">Data & Storage</h2>
          </div>
          <div className="divide-y divide-gray-50">
            <div className="flex items-center justify-between py-3.5">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">Cache Size</p>
                <p className="text-[10px] text-gray-400">Used for offline mosque timings</p>
              </div>
              <span className="text-xs font-bold text-gray-500">{cacheSize}</span>
            </div>
            <button 
              onClick={handleClearCache}
              className="w-full text-left py-3.5 text-sm font-bold text-red-500 hover:text-red-600 transition-colors"
            >
              Clear Cache & Data
            </button>
          </div>
        </div>

        {/* Security */}
        <div className="flex items-center justify-center text-gray-400 text-xs py-4">
          <Shield size={12} className="mr-1" /> Your data is stored securely
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
