import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://pernambut-connect-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Automatically attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Auto-refresh token on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }
        
        // Try to refresh
        const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
          refresh: refreshToken
        });
        
        const { access } = response.data;
        localStorage.setItem('access_token', access);
        
        // Update header and retry original request
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
        
      } catch (refreshError) {
        // If refresh fails, log out
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// ===== AUTH =====
export const loginWithEmail = (email, password) =>
  api.post('/login/', { email, password });
export const registerUser = (userData) =>
  api.post('/register/', userData);
export const logoutUser = () => {
  const refresh = localStorage.getItem('refresh_token');
  return api.post('/logout/', { refresh });
};

// ===== USER =====
export const getProfile = () => api.get('/profile/');

// ===== MOSQUES =====
export const getMosques = () => api.get('/mosques/');
export const getMosqueById = (id) => api.get(`/mosques/${id}/`);
export const getNearestMosque = (latitude, longitude) =>
  api.post('/mosques/nearest/', { latitude, longitude });

// ===== ANNOUNCEMENTS =====
export const getAnnouncements = (mosque_id) =>
  api.get(`/announcements/?mosque_id=${mosque_id}`);
export const createAnnouncement = (data) =>
  api.post('/announcements/', data);

// ===== EVENTS =====
export const getEvents = (mosque_id) =>
  api.get(`/events/?mosque_id=${mosque_id}`);
export const createEvent = (data) =>
  api.post('/events/', data);

// ===== COMMUNITY UPDATES =====
export const getCommunityUpdates = (mosque_id) =>
  api.get(`/community-updates/?mosque_id=${mosque_id}`);
export const createCommunityUpdate = (data) =>
  api.post('/community-updates/', data);

// ===== DONATIONS =====
export const getDonations = () => api.get('/donations/');
export const createDonation = (data) =>
  api.post('/donations/', data);

// ===== SOCIAL LINKS =====
export const getSocialLinks = () => api.get('/community-links/');
export const updateSocialLink = (id, data) =>
  api.patch(`/community-links/${id}/`, data);
export const createSocialLink = (data) =>
  api.post('/community-links/', data);

// ===== BAYANS =====
export const getBayans = () => api.get('/bayans/');
export const createBayan = (data) => api.post('/bayans/', data);

export default api;
