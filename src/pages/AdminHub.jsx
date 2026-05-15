import React, { useState } from 'react';
import { ArrowLeft, Megaphone, AlertCircle, Calendar, Send, CheckCircle, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { createAnnouncement, createEvent, createCommunityUpdate, getSocialLinks, updateSocialLink, createSocialLink, createBayan } from '../services/api';
import { useMosque } from '../context/MosqueContext';
import { Instagram, Facebook, Youtube, Share2, Globe, Mic2, UserCircle, Image, Upload, Users } from 'lucide-react';

const AdminHub = () => {
  const navigate = useNavigate();
  const { selectedMosque } = useMosque();
  const [activeTab, setActiveTab] = useState('announcement');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' or 'error'

  // Form States
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'NORMAL',
    type: 'GENERAL',
    event_type: 'NIKAH',
    date: '',
    time: '',
    location: '',
    speaker: '',
    url: '',
  });

  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      priority: 'NORMAL',
      type: 'GENERAL',
      event_type: 'JANAZA',
      date: '',
      time: '',
      location: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    try {
      if (activeTab === 'announcement') {
        await createAnnouncement({
          mosque: selectedMosque.id,
          title: formData.title,
          content: formData.content,
          priority: formData.priority,
          type: formData.type,
        });
      } else if (activeTab === 'wafat') {
        const data = new FormData();
        data.append('mosque', selectedMosque.id);
        data.append('title', formData.title);
        data.append('type', 'DEATH');
        data.append('content', formData.content);
        if (imageFile) {
          data.append('image', imageFile);
        }
        await createCommunityUpdate(data);
      } else if (activeTab === 'event') {
        await createEvent({
          mosque: selectedMosque.id,
          title: formData.title,
          type: formData.event_type,
          date: formData.date,
          time: formData.time,
          location: formData.location,
          description: formData.content,
        });
      } else if (activeTab === 'bayan') {
        await createBayan({
          title: formData.title,
          description: formData.content,
          speaker: formData.speaker,
          date: formData.date,
          url: formData.url,
        });
      }

      setStatus('success');
      resetForm();
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-[#020617] pb-40">
      {/* ── Premium Header ── */}
      <header className="bg-slate-900 pt-20 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #10b981 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        
        <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
          <div className="flex items-center gap-5">
            <button onClick={() => navigate('/profile')} className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">Management Portal</h1>
              <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Mosque Administrative Hub</p>
            </div>
          </div>
          
          <button onClick={() => navigate('/admin/users')} className="h-14 px-8 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all">
            <Users size={18} /> Member Directory
          </button>
        </div>
      </header>

      <main className="w-full px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Sidebar / Tabs */}
          <div className="lg:col-span-3 space-y-4">
            <div className="premium-card p-3 space-y-1">
              {[
                { id: 'announcement', label: 'Alerts', icon: Megaphone, color: 'text-emerald-500' },
                { id: 'wafat', label: 'Death News', icon: AlertCircle, color: 'text-amber-500' },
                { id: 'event', label: 'Events', icon: Calendar, color: 'text-blue-500' },
                { id: 'bayan', label: 'Bayans', icon: Mic2, color: 'text-purple-500' },
              ].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} 
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-slate-950 text-white shadow-xl shadow-slate-900/20' : 'text-slate-400 hover:bg-slate-50'}`}>
                  <tab.icon size={18} className={activeTab === tab.id ? 'text-emerald-400' : tab.color} />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="premium-card bg-amber-500/5 border-amber-500/20 p-6">
              <ShieldAlert size={24} className="text-amber-500 mb-4" />
              <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest leading-relaxed">
                Administrative actions are logged and visible to all committee members.
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="lg:col-span-9">
            <form onSubmit={handleSubmit} className="premium-card space-y-10 p-10">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-8">
                <div>
                   <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                     Create {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                   </h2>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Fill in the details below</p>
                </div>
                {status === 'success' && <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest animate-reveal"><CheckCircle size={14} /> Published</div>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6 md:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Title / Subject</label>
                  <input name="title" required value={formData.title} onChange={handleInputChange} placeholder={activeTab === 'wafat' ? "Full Name of Deceased" : "Enter a compelling title"} 
                    className="form-input h-18 text-lg font-bold" />
                </div>

                {activeTab === 'announcement' && (
                  <>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Priority Level</label>
                      <select name="priority" value={formData.priority} onChange={handleInputChange} className="form-input h-16 font-bold cursor-pointer">
                        <option value="NORMAL">Normal</option>
                        <option value="IMPORTANT">Important</option>
                        <option value="URGENT">Urgent (Emergency)</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Information Type</label>
                      <select name="type" value={formData.type} onChange={handleInputChange} className="form-input h-16 font-bold cursor-pointer">
                        <option value="GENERAL">General News</option>
                        <option value="EMERGENCY">Emergency Update</option>
                        <option value="RELIGIOUS">Religious / Fatwa</option>
                      </select>
                    </div>
                  </>
                )}

                {(activeTab === 'event' || activeTab === 'bayan') && (
                  <>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Scheduled Date</label>
                      <input type="date" name="date" required value={formData.date} onChange={handleInputChange} className="form-input h-16 font-bold" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Time / Duration</label>
                      <input type="text" name="time" required value={formData.time} onChange={handleInputChange} placeholder="e.g. 8:30 PM (After Isha)" className="form-input h-16 font-bold" />
                    </div>
                  </>
                )}

                {activeTab === 'event' && (
                  <div className="space-y-3 md:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Event Venue</label>
                    <input name="location" required value={formData.location} onChange={handleInputChange} placeholder="Specific Masjid or Hall name" className="form-input h-16 font-bold" />
                  </div>
                )}

                {activeTab === 'bayan' && (
                  <>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Speaker / Molana</label>
                      <input name="speaker" required value={formData.speaker} onChange={handleInputChange} placeholder="Name of the Scholar" className="form-input h-16 font-bold" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Media Link (URL)</label>
                      <input name="url" value={formData.url} onChange={handleInputChange} placeholder="YouTube or SoundCloud Link" className="form-input h-16 font-bold" />
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Detailed Content</label>
                <textarea name="content" required rows={8} value={formData.content} onChange={handleInputChange} 
                  placeholder="Provide comprehensive details about this update..." className="form-input p-6 font-medium leading-relaxed" />
              </div>

              {activeTab === 'wafat' && (
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Upload Portrait (Optional)</label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl cursor-pointer hover:bg-slate-50 transition-all group">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload size={24} className="text-slate-300 group-hover:text-emerald-500 transition-colors mb-3" />
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{imageFile ? imageFile.name : 'Drag and drop image here'}</p>
                      </div>
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    </label>
                  </div>
                </div>
              )}

              <button type="submit" disabled={isLoading} className="btn-action w-full h-20 text-xl shadow-2xl shadow-emerald-500/20 mt-12">
                {isLoading ? <Loader2 size={24} className="animate-spin" /> : <>Confirm & Publish Post <Send size={20} strokeWidth={3} /></>}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminHub;
