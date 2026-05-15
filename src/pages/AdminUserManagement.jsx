import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Trash2, ShieldCheck, ShieldAlert, Search, Loader2, ArrowLeft, Mail, MapPin, Pin } from 'lucide-react';
import { getAllUsers, deleteUser, toggleAdminStatus } from '../services/api';
import { motion } from 'framer-motion';

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionLoading, setActionLoading] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  const handleDelete = async (id, email) => {
    if (window.confirm(`Delete user ${email}?`)) {
      try {
        setActionLoading(id);
        await deleteUser(id);
        setUsers(users.filter(u => u.id !== id));
      } catch (err) { alert("Failed"); } 
      finally { setActionLoading(null); }
    }
  };

  const handleToggleAdmin = async (id) => {
    try {
      setActionLoading(id);
      const res = await toggleAdminStatus(id);
      setUsers(users.map(u => u.id === id ? { ...u, is_staff: res.data.is_staff, is_superuser: res.data.is_staff } : u));
    } catch (err) { alert("Failed to update"); } 
    finally { setActionLoading(null); }
  };

  const filteredUsers = users
    .filter(user => 
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => (a.is_staff === b.is_staff ? 0 : a.is_staff ? -1 : 1));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#020617] pb-20">
      {/* Header */}
      <div className="page-header rounded-b-3xl">
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center"><ArrowLeft size={18} /></button>
            <div>
              <h1 className="text-xl font-black text-white leading-tight">Members</h1>
              <p className="text-brand-100 text-[10px] font-bold uppercase tracking-widest opacity-70">Management</p>
            </div>
          </div>
          <div className="bg-white/15 px-3 py-1.5 rounded-xl text-[10px] font-black text-white border border-white/10 backdrop-blur-sm">
            {users.length} TOTAL
          </div>
        </div>
      </div>

      <div className="px-4 -mt-6 relative z-10 max-w-2xl mx-auto">
        {/* Search */}
        <div className="search-bar mb-6 shadow-xl shadow-brand-900/5">
          <Search size={18} className="text-gray-400" />
          <input type="text" placeholder="Search by name or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1,2,3].map(i => <div key={i} className="skeleton h-24 w-full" />)}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredUsers.map((user, idx) => (
              <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay: idx*0.05 }}
                key={user.id} className={`card ${user.is_staff ? 'border-brand-200 dark:border-brand-800 ring-2 ring-brand-500/5' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black ${user.is_staff ? 'bg-brand-600 text-white shadow-brand-sm' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                      {(user.name?.[0] || user.email?.[0] || '?').toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">{user.name || 'User'}</h3>
                        {user.is_staff && <span className="badge badge-info">Admin</span>}
                      </div>
                      <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><Mail size={11} /> {user.email}</p>
                    </div>
                  </div>
                  {user.is_staff && <Pin size={14} className="text-brand-500 fill-brand-500" />}
                </div>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-50 dark:border-gray-800">
                  <button onClick={() => handleToggleAdmin(user.id)} disabled={actionLoading === user.id}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${user.is_staff ? 'bg-amber-50 dark:bg-amber-900/10 text-amber-600' : 'bg-brand-50 dark:bg-brand-900/10 text-brand-600'}`}>
                    {actionLoading === user.id ? <Loader2 size={14} className="animate-spin mx-auto" /> : (user.is_staff ? 'Revoke Admin' : 'Make Admin')}
                  </button>
                  <button onClick={() => handleDelete(user.id, user.email)} disabled={actionLoading === user.id}
                    className="w-11 h-10 flex items-center justify-center bg-red-50 dark:bg-red-900/10 text-red-500 rounded-xl hover:bg-red-100 transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserManagement;
