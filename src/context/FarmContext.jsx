import React, { createContext, useContext, useState } from 'react';

const FarmContext = createContext();

const INITIAL_HISTORY = [
  {
    id: 'scan-101',
    date: '2024-11-18 10:25 AM',
    crop: 'Paddy',
    disease: 'Rice Blast (Magnaporthe oryzae)',
    confidence: '94%',
    severity: 'Moderate',
    status: 'Action Recommended',
    image: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'scan-102',
    date: '2024-11-15 03:40 PM',
    crop: 'Chilli',
    disease: 'Chilli Leaf Curl Virus (ChiLCV)',
    confidence: '91%',
    severity: 'Severe',
    status: 'Trap Placement Done',
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'scan-103',
    date: '2024-11-10 09:15 AM',
    crop: 'Cotton',
    disease: 'Cotton Bacterial Blight',
    confidence: '89%',
    severity: 'Moderate',
    status: 'Action Recommended',
    image: 'https://images.unsplash.com/photo-1594498653385-d5172c532c00?auto=format&fit=crop&w=400&q=80',
  }
];

const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Heavy Rainfall Warning',
    message: 'Regional meteorological station predicts 45mm precipitation over Warangal/Khammam within 48 hours. Ensure field drainage.',
    timestamp: '15 mins ago',
    type: 'warning',
    read: false,
  },
  {
    id: 'notif-2',
    title: 'Pest Advisory: Chilli Thrips Alert',
    message: 'Rising temperatures (31°C) and dry winds favor thrips multiplication in Chilli plots. Inspect apical shoot underside.',
    timestamp: '2 hours ago',
    type: 'danger',
    read: false,
  },
  {
    id: 'notif-3',
    title: 'Fertilizer Milestone Reminder',
    message: 'Second split urea application due for Paddy Block A at tillering completion.',
    timestamp: '1 day ago',
    type: 'info',
    read: true,
  }
];

export const FarmProvider = ({ children }) => {
  const [activeCrop, setActiveCrop] = useState('Paddy');
  const [diseaseHistory, setDiseaseHistory] = useState(INITIAL_HISTORY);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const addDiseaseScan = (scanResult) => {
    const newEntry = {
      id: 'scan-' + Date.now(),
      date: new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }),
      ...scanResult,
    };
    setDiseaseHistory(prev => [newEntry, ...prev]);
  };

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <FarmContext.Provider
      value={{
        activeCrop,
        setActiveCrop,
        diseaseHistory,
        addDiseaseScan,
        notifications,
        markNotificationRead,
        clearNotifications,
        unreadCount,
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
};
