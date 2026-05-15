import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import i18n from '../i18n';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const storedUser = localStorage.getItem('user');
    
    if (token) {
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      // Validate token by fetching profile
      api.get('/profile/')
        .then(res => {
          setUser(res.data);
          localStorage.setItem('user', JSON.stringify(res.data));
          if (res.data.language) {
            i18n.changeLanguage(res.data.language);
          }
        })
        .catch(() => {
          // If profile fetch fails, token is invalid or expired
          // The interceptor might try to refresh it, but if it fails completely:
          if (!localStorage.getItem('access_token')) {
            setUser(null);
          }
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (userData, accessToken, refreshToken) => {
    setUser(userData);
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    localStorage.setItem('user', JSON.stringify(userData));
    if (userData.language) {
      i18n.changeLanguage(userData.language);
    }
  };

  const logout = async () => {
    try {
      await api.post('/logout/', { refresh: localStorage.getItem('refresh_token') });
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      setUser(null);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      localStorage.removeItem('selectedMosque');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
