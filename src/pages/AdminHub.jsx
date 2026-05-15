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
    <div className="pb-24 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-600 px-6 pt-12 pb-8 rounded-b-3xl text-white shadow-lg">
        <div className="flex items-center mb-4">
          <button onClick={() => navigate('/profile')} className="p-2 -ml-2 mr-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-2xl font-bold">Admin Hub</h1>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-red-100 text-sm">Send official announcements to the community</p>
          <button 
            onClick={() => navigate('/admin/users')}
            className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center transition-all backdrop-blur-md"
          >
            <Users size={14} className="mr-1.5" /> Manage Members
          </button>
        </div>
      </div>

      <div className="px-6 mt-6">
        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1 flex mb-6">
          <button
            onClick={() => setActiveTab('announcement')}
            className={`flex-1 flex items-center justify-center py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'announcement' ? 'bg-red-600 text-white shadow-md' : 'text-gray-500'
            }`}
          >
            <Megaphone size={16} className="mr-2" />
            Alert
          </button>
          <button
            onClick={() => setActiveTab('wafat')}
            className={`flex-1 flex items-center justify-center py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'wafat' ? 'bg-red-600 text-white shadow-md' : 'text-gray-500'
            }`}
          >
            <AlertCircle size={16} className="mr-2" />
            Wafat
          </button>
          <button
            onClick={() => setActiveTab('event')}
            className={`flex-1 flex items-center justify-center py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'event' ? 'bg-red-600 text-white shadow-md' : 'text-gray-500'
            }`}
          >
            <Calendar size={16} className="mr-2" />
            Event
          </button>
          <button
            onClick={() => setActiveTab('bayan')}
            className={`flex-1 flex items-center justify-center py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'bayan' ? 'bg-red-600 text-white shadow-md' : 'text-gray-500'
            }`}
          >
            <Mic2 size={16} className="mr-2" />
            Bayan
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            {activeTab === 'announcement' && 'Post New Announcement'}
            {activeTab === 'wafat' && 'Post Death News (Wafat)'}
            {activeTab === 'event' && 'Schedule New Event'}
            {activeTab === 'bayan' && 'Post Recorded Bayan'}
            <ShieldAlert size={18} className="ml-2 text-red-500" />
          </h2>

          <div className="space-y-4">
            {activeTab === 'bayan' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Lecture Title</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter Title"
                    className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none focus:border-red-500 transition-all text-gray-800"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center">
                      <UserCircle size={16} className="mr-2 text-primary-500" /> Speaker
                    </label>
                    <input
                      type="text"
                      name="speaker"
                      required
                      value={formData.speaker}
                      onChange={handleInputChange}
                      placeholder="Molana / Mufti Name"
                      className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none focus:border-red-500 text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date</label>
                    <input
                      type="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none focus:border-red-500 text-gray-800"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center">
                    <Globe size={16} className="mr-2 text-blue-500" /> Video/Audio Link (Optional)
                  </label>
                  <input
                    type="url"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    placeholder="https://youtube.com/..."
                    className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none focus:border-red-500 transition-all text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
                  <textarea
                    name="content"
                    rows={3}
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Brief description of the lecture topics"
                    className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none focus:border-red-500 transition-all text-gray-800"
                  ></textarea>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Title</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder={activeTab === 'wafat' ? 'Name of Deceased' : 'Enter Title'}
                    className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none focus:border-red-500 transition-all text-gray-800"
                  />
                </div>

            {activeTab === 'announcement' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Priority</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none focus:border-red-500 text-gray-800"
                  >
                    <option value="NORMAL">Normal</option>
                    <option value="IMPORTANT">Important</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none focus:border-red-500 text-gray-800"
                  >
                    <option value="GENERAL">General</option>
                    <option value="EMERGENCY">Emergency</option>
                    <option value="RELIGIOUS">Religious</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'event' && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Event Type</label>
                  <select
                    name="event_type"
                    value={formData.event_type}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none focus:border-red-500 text-gray-800"
                  >
                    <option value="NIKAH">Nikah</option>
                    <option value="BAYAN">Bayan</option>
                    <option value="LECTURE">Lecture</option>
                    <option value="MEETING">Meeting</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date</label>
                    <input
                      type="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none focus:border-red-500 text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Time</label>
                    <input
                      type="time"
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none focus:border-red-500 text-gray-800"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Location</label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Enter location"
                    className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none focus:border-red-500 text-gray-800"
                  />
                </div>
              </>
            )}

            {activeTab === 'wafat' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center">
                  <Image size={16} className="mr-2 text-primary-500" /> Photo (Optional)
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-100 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload size={24} className="text-gray-400 mb-2" />
                      <p className="text-xs text-gray-500">{imageFile ? imageFile.name : 'Click to upload photo'}</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  </label>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Details / Content</label>
              <textarea
                name="content"
                required
                rows={activeTab === 'wafat' ? 10 : 4}
                value={formData.content}
                onChange={handleInputChange}
                placeholder={activeTab === 'wafat' ? 'Paste the detailed death news format here...' : 'Enter detailed information'}
                className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none focus:border-red-500 transition-all text-gray-800"
              ></textarea>
            </div>
          </>
        )}
      </div>

          <AnimatePresence>
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-green-50 border border-green-200 rounded-xl p-3 mt-4 flex items-center text-green-700 text-sm"
              >
                <CheckCircle size={18} className="mr-2" /> Posted successfully!
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-50 border border-red-200 rounded-xl p-3 mt-4 flex items-center text-red-700 text-sm"
              >
                <AlertCircle size={18} className="mr-2" /> Error posting update.
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={isLoading || !selectedMosque}
            className="w-full bg-red-600 text-white font-bold py-4 rounded-xl mt-6 flex items-center justify-center hover:bg-red-700 transition-all shadow-lg disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            ) : (
              <Send size={18} className="mr-2" />
            )}
            Post
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-100 rounded-2xl text-xs text-gray-500 flex items-start">
          <ShieldAlert size={16} className="mr-2 flex-shrink-0 mt-0.5" />
          <p>This is an administrative portal. Posts made here will be visible to all members subscribed to your mosque. Please verify all information before posting.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHub;
