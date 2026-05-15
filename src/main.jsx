import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { MosqueProvider } from './context/MosqueContext'
import { ThemeProvider } from './context/ThemeContext'
import './i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <MosqueProvider>
          <App />
        </MosqueProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
