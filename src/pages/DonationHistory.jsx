import React from 'react';
import { ArrowLeft, Heart, Calendar, IndianRupee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const donationHistory = [
  { id: 1, mosque: 'Road Masjid', category: 'Mosque Maintenance', amount: 500, date: '2026-05-02', status: 'Success' },
  { id: 2, mosque: 'Nayee Masjid', category: 'Zakat / Charity', amount: 2500, date: '2026-04-28', status: 'Success' },
  { id: 3, mosque: 'Road Masjid', category: 'Construction Fund', amount: 1000, date: '2026-04-15', status: 'Success' },
  { id: 4, mosque: 'Choti Masjid', category: 'Mosque Maintenance', amount: 250, date: '2026-03-22', status: 'Success' },
];

const DonationHistory = () => {
  const navigate = useNavigate();

  const totalDonated = donationHistory.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="pb-24 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-700 via-primary-600 to-emerald-500 px-6 pt-12 pb-10 rounded-b-[40px] text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-10 -mt-10"></div>
        <div className="flex items-center">
          <button onClick={() => navigate('/profile')} className="p-2 -ml-2 mr-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft size={22} className="text-white" />
          </button>
          <h1 className="text-2xl font-bold">Donation History</h1>
        </div>
      </div>

      {/* Total Summary */}
      <div className="px-6 mt-6">
        <div className="bg-gradient-to-br from-primary-600 to-emerald-500 rounded-2xl p-5 text-white shadow-lg mb-6">
          <p className="text-white/70 text-sm mb-1">Total Contributions</p>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">₹{totalDonated.toLocaleString('en-IN')}</span>
            <span className="text-white/60 text-sm ml-2">{donationHistory.length} donations</span>
          </div>
          <div className="mt-3 flex items-center text-white/60 text-xs">
            <Heart size={12} className="mr-1" /> May Allah accept your contributions
          </div>
        </div>

        {/* Donation List */}
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">All Transactions</h2>
        <div className="space-y-3">
          {donationHistory.map((donation, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              key={donation.id}
              className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-800">{donation.mosque}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{donation.category}</p>
                </div>
                <span className="text-lg font-bold text-green-600">₹{donation.amount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                <div className="flex items-center text-xs text-gray-400">
                  <Calendar size={12} className="mr-1" />
                  {new Date(donation.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
                  {donation.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonationHistory;
