import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useMosque } from './context/MosqueContext';
import BottomNav from './components/layout/BottomNav';
import Login from './pages/Login';
import Register from './pages/Register';
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

// Wrapper to ensure user is logged in
const AuthProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  
  return children;
};

// Wrapper to ensure user has selected a mosque
const MosqueProtectedRoute = ({ children }) => {
  const { selectedMosque } = useMosque();
  
  if (!selectedMosque) {
    return <Navigate to="/select-mosque" replace />;
  }
  
  return children;
};

const AdminProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return null;
  if (!user || user.email !== 'zakkiadnan05@gmail.com') {
    return <Navigate to="/home" replace />;
  }
  
  return children;
};

function App() {
  const { user } = useAuth();
  const { selectedMosque } = useMosque();

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen bg-gray-50 main-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/select-mosque" element={
            <AuthProtectedRoute>
              <MosqueSelection />
            </AuthProtectedRoute>
          } />
          
          <Route path="/home" element={
            <AuthProtectedRoute>
              <MosqueProtectedRoute>
                <Home />
              </MosqueProtectedRoute>
            </AuthProtectedRoute>
          } />
          <Route path="/announcements" element={
            <AuthProtectedRoute>
              <MosqueProtectedRoute>
                <Announcements />
              </MosqueProtectedRoute>
            </AuthProtectedRoute>
          } />
          <Route path="/events" element={
            <AuthProtectedRoute>
              <MosqueProtectedRoute>
                <Events />
              </MosqueProtectedRoute>
            </AuthProtectedRoute>
          } />
          <Route path="/donate" element={
            <AuthProtectedRoute>
              <MosqueProtectedRoute>
                <Donate />
              </MosqueProtectedRoute>
            </AuthProtectedRoute>
          } />
          <Route path="/profile" element={
            <AuthProtectedRoute>
              <MosqueProtectedRoute>
                <Profile />
              </MosqueProtectedRoute>
            </AuthProtectedRoute>
          } />
          <Route path="/donation-history" element={
            <AuthProtectedRoute>
              <MosqueProtectedRoute>
                <DonationHistory />
              </MosqueProtectedRoute>
            </AuthProtectedRoute>
          } />
          <Route path="/settings" element={
            <AuthProtectedRoute>
              <MosqueProtectedRoute>
                <SettingsPage />
              </MosqueProtectedRoute>
            </AuthProtectedRoute>
          } />
          <Route path="/death-news" element={
            <AuthProtectedRoute>
              <MosqueProtectedRoute>
                <DeathNews />
              </MosqueProtectedRoute>
            </AuthProtectedRoute>
          } />
          <Route path="/admin-portal" element={
            <AuthProtectedRoute>
              <MosqueProtectedRoute>
                <AdminProtectedRoute>
                  <AdminHub />
                </AdminProtectedRoute>
              </MosqueProtectedRoute>
            </AuthProtectedRoute>
          } />
          <Route path="/notifications" element={
            <AuthProtectedRoute>
              <MosqueProtectedRoute>
                <Notifications />
              </MosqueProtectedRoute>
            </AuthProtectedRoute>
          } />
          
          <Route path="*" element={<Navigate to={user ? "/home" : "/"} replace />} />
        </Routes>
        
        {/* Only show bottom nav if user logged in and mosque selected */}
        {user && selectedMosque && <BottomNav />}
      </div>
    </Router>
  );
}

export default App;
