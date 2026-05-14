import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useMosque } from './context/MosqueContext';
import BottomNav from './components/layout/BottomNav';
import MosqueSelection from './pages/MosqueSelection';
import Home from './pages/Home';
import Announcements from './pages/Announcements';
import Events from './pages/Events';
import Donate from './pages/Donate';
import Profile from './pages/Profile';
import DonationHistory from './pages/DonationHistory';
import SettingsPage from './pages/SettingsPage';
import DeathNews from './pages/DeathNews';
import AdminHub from './pages/AdminHub';
import Notifications from './pages/Notifications';
import LandingPage from './pages/LandingPage';

// Wrapper to ensure user has selected a mosque
const MosqueProtectedRoute = ({ children }) => {
  const { selectedMosque } = useMosque();
  
  if (!selectedMosque) {
    return <Navigate to="/select-mosque" replace />;
  }
  
  return children;
};

function App() {
  const { selectedMosque } = useMosque();

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen bg-gray-50 main-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/select-mosque" element={<MosqueSelection />} />
          
          <Route path="/home" element={
            <MosqueProtectedRoute>
              <Home />
            </MosqueProtectedRoute>
          } />
          <Route path="/announcements" element={
            <MosqueProtectedRoute>
              <Announcements />
            </MosqueProtectedRoute>
          } />
          <Route path="/events" element={
            <MosqueProtectedRoute>
              <Events />
            </MosqueProtectedRoute>
          } />
          <Route path="/donate" element={
            <MosqueProtectedRoute>
              <Donate />
            </MosqueProtectedRoute>
          } />
          <Route path="/profile" element={
            <MosqueProtectedRoute>
              <Profile />
            </MosqueProtectedRoute>
          } />
          <Route path="/donation-history" element={
            <MosqueProtectedRoute>
              <DonationHistory />
            </MosqueProtectedRoute>
          } />
          <Route path="/settings" element={
            <MosqueProtectedRoute>
              <SettingsPage />
            </MosqueProtectedRoute>
          } />
          <Route path="/death-news" element={
            <MosqueProtectedRoute>
              <DeathNews />
            </MosqueProtectedRoute>
          } />
          <Route path="/admin-portal" element={
            <MosqueProtectedRoute>
              <AdminHub />
            </MosqueProtectedRoute>
          } />
          <Route path="/notifications" element={
            <MosqueProtectedRoute>
              <Notifications />
            </MosqueProtectedRoute>
          } />
          
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
        
        {/* Only show bottom nav if mosque selected */}
        {selectedMosque && <BottomNav />}
      </div>
    </Router>
  );
}

export default App;
