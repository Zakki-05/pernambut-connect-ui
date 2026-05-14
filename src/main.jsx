import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MosqueProvider } from './context/MosqueContext'
import { ThemeProvider } from './context/ThemeContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <MosqueProvider>
        <App />
      </MosqueProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
