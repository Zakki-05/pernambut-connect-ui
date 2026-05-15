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
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-[#020617] pb-40">
      {/* ── Premium Header ── */}
      <header className="bg-slate-900 pt-20 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #10b981 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        
        <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
          <div className="flex items-center gap-5">
            <button onClick={() => navigate(-1)} className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">Member Registry</h1>
              <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mt-1">User Permissions & Access</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-white/10 px-6 py-3 rounded-2xl border border-white/10 backdrop-blur-md">
            <Users className="text-emerald-400" size={20} />
            <div>
               <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">Total Community</p>
               <p className="text-lg font-black text-white leading-none">{users.length}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full px-6 -mt-10 relative z-10">
        <div className="premium-card p-3 mb-10 flex items-center gap-4 shadow-xl shadow-slate-900/5">
           <div className="flex-1 flex items-center gap-4 px-5 h-14">
              <Search size={20} className="text-slate-300" />
              <input type="text" placeholder="Search by name, email or mosque role..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} 
                className="bg-transparent border-none outline-none w-full text-base font-bold text-slate-900 dark:text-white" />
           </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => <div key={i} className="premium-card h-48 animate-pulse bg-slate-100" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user, idx) => (
              <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay: idx*0.05 }}
                key={user.id} className="premium-card group relative">
                
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black ${user.is_staff ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                      {(user.name?.[0] || user.email?.[0] || '?').toUpperCase()}
                    </div>
                    <div>
                       <div className="flex items-center gap-2">
                         <h3 className="text-base font-black text-slate-950 dark:text-white">{user.name || 'Anonymous Member'}</h3>
                         {user.is_staff && <ShieldCheck size={14} className="text-emerald-500" />}
                       </div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-1"><Mail size={12} /> {user.email}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800/50">
                   <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Account Status</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${user.is_staff ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                        {user.is_staff ? 'Mosque Admin' : 'Basic Member'}
                      </span>
                   </div>
                   
                   <div className="flex items-center gap-2 pt-2">
                     <button onClick={() => handleToggleAdmin(user.id)} disabled={actionLoading === user.id}
                        className={`flex-1 h-11 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${user.is_staff ? 'bg-amber-500/10 text-amber-600 hover:bg-amber-500 hover:text-white' : 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white'}`}>
                        {actionLoading === user.id ? <Loader2 size={14} className="animate-spin mx-auto" /> : (user.is_staff ? 'Revoke Access' : 'Grant Admin')}
                     </button>
                     <button onClick={() => handleDelete(user.id, user.email)} disabled={actionLoading === user.id}
                        className="w-11 h-11 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
                        <Trash2 size={16} />
                     </button>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {filteredUsers.length === 0 && !loading && (
          <div className="text-center py-40">
             <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 rounded-[32px] flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-slate-200" />
             </div>
             <h3 className="text-xl font-black text-slate-900 dark:text-white">No members found</h3>
             <p className="text-slate-400 font-medium">Try adjusting your search terms</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminUserManagement;
