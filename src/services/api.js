import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://pernambut-connect-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Automatically attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ===== AUTH =====
export const loginWithEmail = (email, otp = null) =>
  api.post('/auth/login/', { email, otp });

// ===== USER =====
export const getProfile = () => api.get('/users/');
export const updateProfile = (data) => api.put('/users/select_mosque/', data);
export const selectMosqueApi = (mosque_id) =>
  api.put('/users/select_mosque/', { mosque_id });

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
