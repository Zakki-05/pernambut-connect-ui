import React, { useState } from 'react';
import { ArrowLeft, Bell, Moon, Sun, Globe, Shield, Info, ChevronRight, ToggleLeft, ToggleRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const SettingToggle = ({ label, description, enabled, onToggle }) => (
  <div className="flex items-center justify-between py-4">
    <div className="flex-1 mr-4">
      <p className="font-medium text-gray-800">{label}</p>
      {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
    </div>
    <button onClick={onToggle} className="text-primary-600">
      {enabled ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-gray-300" />}
    </button>
  </div>
);

const SettingsPage = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [janazaAlerts, setJanazaAlerts] = useState(true);
  const [eventReminders, setEventReminders] = useState(true);
  const [language, setLanguage] = useState('English');

  return (
    <div className="pb-24 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-700 via-primary-600 to-emerald-500 px-6 pt-12 pb-10 rounded-b-[40px] text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-10 -mt-10"></div>
        <div className="flex items-center">
          <button onClick={() => navigate('/profile')} className="p-2 -ml-2 mr-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft size={22} className="text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
        </div>
      </div>

      <div className="px-6 mt-6">
        {/* Notifications Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5">
          <div className="flex items-center mb-2">
            <Bell size={18} className="text-primary-600 mr-2" />
            <h2 className="font-bold text-gray-800">Notifications</h2>
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

        {/* Appearance Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5">
          <div className="flex items-center mb-2">
            {darkMode ? <Moon size={18} className="text-primary-600 mr-2" /> : <Sun size={18} className="text-primary-600 mr-2" />}
            <h2 className="font-bold text-gray-800">Appearance</h2>
          </div>
          <div className="divide-y divide-gray-50">
            <SettingToggle 
              label="Dark Mode"
              description="Reduce eye strain in low light"
              enabled={darkMode}
              onToggle={toggleDarkMode}
            />
          </div>
        </div>

        {/* Language Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5">
          <div className="flex items-center mb-4">
            <Globe size={18} className="text-primary-600 mr-2" />
            <h2 className="font-bold text-gray-800">Language</h2>
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

        {/* About Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-5">
          <div className="flex items-center p-5 pb-3">
            <Info size={18} className="text-primary-600 mr-2" />
            <h2 className="font-bold text-gray-800">About</h2>
          </div>
          <div className="divide-y divide-gray-50">
            <div className="flex items-center justify-between px-5 py-3.5">
              <span className="text-sm text-gray-600">App Version</span>
              <span className="text-sm font-semibold text-gray-800">1.0.0</span>
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

        {/* Security */}
        <div className="flex items-center justify-center text-gray-400 text-xs py-4">
          <Shield size={12} className="mr-1" /> Your data is stored securely
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
