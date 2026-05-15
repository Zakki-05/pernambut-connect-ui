import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Trash2, ShieldCheck, ShieldAlert, Search, Loader2, ArrowLeft, Mail, MapPin, Pin } from 'lucide-react';
import { getAllUsers, deleteUser, toggleAdminStatus } from '../services/api';

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionLoading, setActionLoading] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, email) => {
    if (window.confirm(`Are you sure you want to delete user ${email}? This cannot be undone.`)) {
      try {
        setActionLoading(id);
        await deleteUser(id);
        setUsers(users.filter(u => u.id !== id));
      } catch (err) {
        alert("Failed to delete user");
      } finally {
        setActionLoading(null);
      }
    }
  };

  const handleToggleAdmin = async (id) => {
    try {
      setActionLoading(id);
      const res = await toggleAdminStatus(id);
      setUsers(users.map(u => u.id === id ? { ...u, is_staff: res.data.is_staff, is_superuser: res.data.is_staff } : u));
    } catch (err) {
      alert(err.response?.data?.error || "Failed to update admin status");
    } finally {
      setActionLoading(null);
    }
  };

  const filteredUsers = users
    .filter(user => 
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    // Pin admins to the top
    .sort((a, b) => {
      if (a.is_staff && !b.is_staff) return -1;
      if (!a.is_staff && b.is_staff) return 1;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-50 rounded-xl mr-2">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl font-black text-gray-900">User Management</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Admin Portal</p>
          </div>
        </div>
        <div className="bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-[10px] font-bold">
          {users.length} Users
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by email, name, or area..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
          />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-primary-600 mb-4" size={40} />
            <p className="text-gray-500 font-medium">Loading members...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-[32px] border border-dashed border-gray-200">
                <Users className="mx-auto text-gray-300 mb-4" size={48} />
                <p className="text-gray-500">No members found</p>
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div key={user.id} className={`bg-white rounded-3xl p-4 shadow-sm border flex flex-col space-y-4 ${user.is_staff ? 'border-primary-200 ring-1 ring-primary-100' : 'border-gray-100'}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold mr-4 ${user.is_staff ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'bg-gray-100 text-gray-400'}`}>
                        {user.name ? user.name[0]?.toUpperCase() : (user.email ? user.email[0]?.toUpperCase() : '?')}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-bold text-gray-900 mr-2">{user.name || 'Anonymous User'}</h3>
                          {user.is_staff && (
                            <span className="bg-primary-50 text-primary-600 text-[8px] font-black px-1.5 py-0.5 rounded uppercase">Admin</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                          <Mail size={12} className="mr-1" /> {user.email}
                        </p>
                        {user.area && (
                          <p className="text-xs text-gray-400 flex items-center mt-0.5">
                            <MapPin size={12} className="mr-1" /> {user.area}
                          </p>
                        )}
                      </div>
                    </div>
                    {user.is_staff && (
                      <div className="flex items-center bg-primary-50 text-primary-500 px-2 py-1 rounded-xl text-[9px] font-black gap-1">
                        <Pin size={9} className="fill-primary-500" /> PINNED
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 pt-2 border-t border-gray-50">
                    <button 
                      onClick={() => handleToggleAdmin(user.id)}
                      disabled={actionLoading === user.id}
                      className={`flex-1 flex items-center justify-center py-2.5 rounded-xl text-xs font-bold transition-all ${
                        user.is_staff 
                        ? 'bg-amber-50 text-amber-600 hover:bg-amber-100' 
                        : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
                      }`}
                    >
                      {actionLoading === user.id ? <Loader2 size={14} className="animate-spin" /> : (
                        <>
                          {user.is_staff ? (
                            <><ShieldAlert size={14} className="mr-1.5" /> Remove Admin</>
                          ) : (
                            <><ShieldCheck size={14} className="mr-1.5" /> Make Admin</>
                          )}
                        </>
                      )}
                    </button>
                    
                    <button 
                      onClick={() => handleDelete(user.id, user.email)}
                      disabled={actionLoading === user.id}
                      className="w-12 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-all disabled:opacity-50"
                    >
                      {actionLoading === user.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={18} />}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserManagement;
