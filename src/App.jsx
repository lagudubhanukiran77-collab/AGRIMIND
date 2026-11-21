import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { FarmProvider } from './context/FarmContext';

import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { DiseaseDetection } from './pages/DiseaseDetection';
import { AgriculturalIntelligence } from './pages/AgriculturalIntelligence';
import { Assistant } from './pages/Assistant';
import { Login } from './pages/Login';
import { MyFarm } from './pages/MyFarm';
import { Settings } from './pages/Settings';

export function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <FarmProvider>
          <Router>
            <Routes>
              {/* Screen 1: Landing Page */}
              <Route path="/" element={<Landing />} />

              {/* Screen 2: Farmer Dashboard */}
              <Route path="/dashboard" element={<Dashboard />} />

              {/* My Farm (Cadastral & Parcel Management) */}
              <Route path="/my-farm" element={<MyFarm />} />

              {/* Screen 3: AI Crop Disease Detection */}
              <Route path="/disease-detection" element={<DiseaseDetection />} />

              {/* Screen 4: Dedicated Analytical Intelligence Routes */}
              <Route path="/crop-recommendation" element={<AgriculturalIntelligence />} />
              <Route path="/weather-intelligence" element={<AgriculturalIntelligence />} />
              <Route path="/soil-health" element={<AgriculturalIntelligence />} />
              <Route path="/yield-prediction" element={<AgriculturalIntelligence />} />
              <Route path="/reports" element={<AgriculturalIntelligence />} />
              <Route path="/intelligence" element={<AgriculturalIntelligence />} />

              {/* Screen 5: Multilingual AI Assistant */}
              <Route path="/assistant" element={<Assistant />} />

              {/* Settings & Configuration */}
              <Route path="/settings" element={<Settings />} />

              {/* Authentication */}
              <Route path="/login" element={<Login />} />

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </FarmProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
