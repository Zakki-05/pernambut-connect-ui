import React, { createContext, useContext, useState, useEffect } from 'react';

const MosqueContext = createContext();

export const MosqueProvider = ({ children }) => {
  const [selectedMosque, setSelectedMosque] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load saved mosque from local storage on init
    const savedMosque = localStorage.getItem('selectedMosque');
    if (savedMosque) {
      setSelectedMosque(JSON.parse(savedMosque));
    }
    setLoading(false);
  }, []);

  const selectMosque = (mosque) => {
    setSelectedMosque(mosque);
    localStorage.setItem('selectedMosque', JSON.stringify(mosque));
  };

  return (
    <MosqueContext.Provider value={{ selectedMosque, selectMosque, loading }}>
      {children}
    </MosqueContext.Provider>
  );
};

export const useMosque = () => useContext(MosqueContext);
