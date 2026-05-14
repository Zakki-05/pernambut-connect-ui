import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation, Search, Loader2 } from 'lucide-react';
import { useMosque } from '../context/MosqueContext';
import { motion } from 'framer-motion';
import { getMosques, getNearestMosque } from '../services/api';

const FALLBACK_MOSQUES = [
  { id: 1, name: 'Road Masjid', address: 'Pernambut' },
  { id: 2, name: 'Nayee Masjid', address: 'Pernambut' },
  { id: 3, name: 'Choti Masjid', address: 'Pernambut' },
  { id: 4, name: 'Masjid e Ihsaan', address: 'Pernambut' },
];

const MosqueSelection = () => {
  const navigate = useNavigate();
  const { selectMosque } = useMosque();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [mosques, setMosques] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch mosques from backend on mount
  useEffect(() => {
    const fetchMosques = async () => {
      try {
        const response = await getMosques();
        setMosques(response.data);
      } catch (err) {
        console.error('Failed to fetch mosques from API, using fallback:', err);
        setMosques(FALLBACK_MOSQUES);
      } finally {
        setLoading(false);
      }
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
      alert('Geolocation is not supported by your browser.');
      setIsDetecting(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const response = await getNearestMosque(position.coords.latitude, position.coords.longitude);
          handleSelect(response.data);
        } catch (err) {
          console.error('Nearest mosque API failed, selecting first:', err);
          if (mosques.length > 0) handleSelect(mosques[0]);
        } finally {
          setIsDetecting(false);
        }
      },
      (err) => {
        console.error('Geolocation error:', err);
        alert('Could not detect location. Please select manually.');
        setIsDetecting(false);
      }
    );
  };

  const filteredMosques = mosques.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (m.address || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-700 via-primary-600 to-emerald-500 px-6 pt-12 pb-10 rounded-b-[40px] text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-10 -mt-10"></div>
        <h1 className="text-2xl font-bold mb-1">Welcome to Pernambut Connect</h1>
        <p className="text-white/70 text-sm">Select your local mosque to get started</p>
      </div>

      <div className="px-6 -mt-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-1 mt-[60px]"
        >
          <div className="flex items-center bg-gray-50 rounded-lg px-4 py-3">
            <Search className="text-gray-400 mr-3" size={20} />
            <input 
              type="text" 
              placeholder="Search by name or area..." 
              className="bg-transparent border-none outline-none w-full text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>
      </div>

      <div className="px-6 mt-8">
        <button 
          onClick={handleDetectLocation}
          disabled={isDetecting}
          className="w-full flex items-center justify-center bg-primary-50 text-primary-700 py-3 rounded-xl font-medium mb-6 hover:bg-primary-100 transition-colors"
        >
          {isDetecting ? (
            <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mr-2"></div>
          ) : (
            <Navigation size={18} className="mr-2" />
          )}
          {isDetecting ? 'Detecting...' : 'Detect Nearest Mosque'}
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Available Mosques {!loading && <span className="text-sm text-gray-400 font-normal">({mosques.length})</span>}
        </h2>
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={28} className="text-primary-500 animate-spin" />
            <span className="ml-3 text-gray-500">Loading mosques...</span>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMosques.map((mosque, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={mosque.id}
                onClick={() => handleSelect(mosque)}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-primary-300 hover:shadow-sm cursor-pointer transition-all bg-white"
              >
                <div className="flex items-start">
                  <div className="bg-primary-50 p-2 rounded-lg mr-4 mt-1">
                    <MapPin className="text-primary-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{mosque.name}</h3>
                    <p className="text-sm text-gray-500">{mosque.address || 'Pernambut'}</p>
                  </div>
                </div>
                {mosque.jummah && (
                  <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-md">
                    Jummah {mosque.jummah}
                  </span>
                )}
              </motion.div>
            ))}

            {filteredMosques.length === 0 && (
              <div className="text-center py-10">
                <MapPin size={32} className="text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No mosques found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MosqueSelection;
