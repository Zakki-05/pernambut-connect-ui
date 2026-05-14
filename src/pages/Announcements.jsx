import React, { useState } from 'react';
import { Search, Filter, AlertCircle, Info, Bell, X, SlidersHorizontal, Clock, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Announcements = () => {
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [filterPriority, setFilterPriority] = useState('ALL');
  const navigate = useNavigate();

  const announcements = [
    { id: 1, title: 'Jummah bayan timing changed', content: 'The Jummah bayan will start at 1:15 PM instead of 1:00 PM this week due to extreme heat.', type: 'RELIGIOUS', priority: 'NORMAL', time: '2h ago', timestamp: Date.now() - 7200000 },
    { id: 2, title: 'Urgent: Water supply issue', content: 'Wudu area water supply is currently under maintenance. Please perform wudu at home if possible.', type: 'EMERGENCY', priority: 'URGENT', time: '5h ago', timestamp: Date.now() - 18000000 },
    { id: 3, title: 'Community Meeting', content: 'Monthly community meeting will be held after Isha prayers on Sunday. All members are requested to attend.', type: 'GENERAL', priority: 'IMPORTANT', time: '1d ago', timestamp: Date.now() - 86400000 },
    { id: 4, title: 'Quran Class Registration Open', content: 'New batch of Quran classes starting from next week. Register your children at the mosque office.', type: 'RELIGIOUS', priority: 'NORMAL', time: '2d ago', timestamp: Date.now() - 172800000 },
    { id: 5, title: 'Emergency: Road blocked near mosque', content: 'Due to construction work, the road near Choti Masjid is blocked. Use alternate routes for Isha prayer.', type: 'EMERGENCY', priority: 'URGENT', time: '3d ago', timestamp: Date.now() - 259200000 },
    { id: 6, title: 'Ramadan preparation meeting', content: 'A meeting to discuss Ramadan preparation will be held this Friday after Jummah prayer.', type: 'GENERAL', priority: 'IMPORTANT', time: '4d ago', timestamp: Date.now() - 345600000 },
  ];

  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'URGENT': return <AlertCircle className="text-red-500" size={18} />;
      case 'IMPORTANT': return <Info className="text-yellow-500" size={18} />;
      default: return <Bell className="text-blue-500" size={18} />;
    }
  };

  const getPriorityBorder = (priority) => {
    switch(priority) {
      case 'URGENT': return 'border-l-red-500';
      case 'IMPORTANT': return 'border-l-yellow-500';
      default: return 'border-l-blue-500';
    }
  };

  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'URGENT': return 'bg-red-100 text-red-700';
      case 'IMPORTANT': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  const getTypeBadge = (type) => {
    switch(type) {
      case 'EMERGENCY': return 'bg-red-50 text-red-600';
      case 'RELIGIOUS': return 'bg-purple-50 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  // Filter logic
  let filtered = announcements;

  // Tab filter (by type)
  if (activeTab !== 'ALL') {
    if (activeTab === 'URGENT') {
      filtered = filtered.filter(a => a.priority === 'URGENT');
    } else {
      filtered = filtered.filter(a => a.type === activeTab);
    }
  }

  // Priority filter from panel
  if (filterPriority !== 'ALL') {
    filtered = filtered.filter(a => a.priority === filterPriority);
  }

  // Search filter
  if (searchTerm.trim()) {
    filtered = filtered.filter(a =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Sort
  if (sortBy === 'oldest') {
    filtered = [...filtered].sort((a, b) => a.timestamp - b.timestamp);
  } else {
    filtered = [...filtered].sort((a, b) => b.timestamp - a.timestamp);
  }

  const clearFilters = () => {
    setFilterPriority('ALL');
    setSortBy('newest');
    setShowFilter(false);
  };

  const hasActiveFilters = filterPriority !== 'ALL' || sortBy !== 'newest';

  return (
    <div className="pb-24 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-700 via-primary-600 to-emerald-500 px-6 pt-12 pb-10 rounded-b-[40px] text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-10 -mt-10"></div>
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 mr-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft size={22} className="text-white" />
          </button>
          <h1 className="text-2xl font-bold">Announcements</h1>
        </div>
      </div>
      <div className="px-6 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-1">
          <div className="flex items-center bg-gray-50 rounded-xl px-4 py-2.5">
            <Search className="text-gray-400 mr-2" size={18} />
            <input 
              type="text" 
              placeholder="Search announcements..." 
              className="bg-transparent border-none outline-none w-full text-sm text-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="ml-2">
                <X size={16} className="text-gray-400" />
              </button>
            )}
            <button 
              onClick={() => setShowFilter(!showFilter)} 
              className={`ml-2 p-1 rounded-lg transition-colors ${hasActiveFilters ? 'bg-primary-100 text-primary-600' : 'text-gray-500'}`}
            >
              <SlidersHorizontal size={18} />
            </button>
          </div>
        </div>
      </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilter && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4 overflow-hidden"
            >
              {/* Priority Filter */}
              <div className="mb-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Priority</p>
                <div className="flex flex-wrap gap-2">
                  {['ALL', 'URGENT', 'IMPORTANT', 'NORMAL'].map(p => (
                    <button
                      key={p}
                      onClick={() => setFilterPriority(p)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        filterPriority === p 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-white border border-gray-200 text-gray-600'
                      }`}
                    >
                      {p === 'URGENT' && '🔴 '}{p === 'IMPORTANT' && '🟡 '}{p === 'NORMAL' && '⚪ '}{p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="mb-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Sort By</p>
                <div className="flex gap-2">
                  {[{ id: 'newest', label: 'Newest First' }, { id: 'oldest', label: 'Oldest First' }].map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSortBy(s.id)}
                      className={`flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        sortBy === s.id 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-white border border-gray-200 text-gray-600'
                      }`}
                    >
                      <Clock size={12} className="mr-1" /> {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear */}
              <button onClick={clearFilters} className="text-xs text-red-500 font-semibold">
                Reset All Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tabs */}
        <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-2">
          {['ALL', 'URGENT', 'GENERAL', 'RELIGIOUS', 'EMERGENCY'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab === 'URGENT' && '🔴 '}{tab}
            </button>
          ))}
        </div>


      {/* Results count */}
      <div className="px-6 mt-4 mb-2">
        <p className="text-xs font-medium text-gray-500">{filtered.length} announcement{filtered.length !== 1 ? 's' : ''} found</p>
      </div>

      {/* Announcements List */}
      <div className="px-6 space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Bell size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No announcements found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          filtered.map((ann, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              key={ann.id}
              className={`p-4 rounded-xl shadow-sm border-l-4 bg-white ${getPriorityBorder(ann.priority)}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2 flex-1 mr-2">
                  {getPriorityIcon(ann.priority)}
                  <h3 className="font-semibold text-gray-800 text-sm leading-tight">{ann.title}</h3>
                </div>
                <span className="text-[10px] text-gray-400 whitespace-nowrap">{ann.time}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                {ann.content}
              </p>
              <div className="flex items-center space-x-2 mt-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getPriorityBadge(ann.priority)}`}>
                  {ann.priority}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getTypeBadge(ann.type)}`}>
                  {ann.type}
                </span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Announcements;
