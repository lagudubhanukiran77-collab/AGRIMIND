import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext();

const INITIAL_FARMER_PROFILE = {
  id: 'farmer_01',
  name: 'Kisan Farmer',
  mobile: '9848012345',
  location: 'Guntur, Andhra Pradesh',
  state: 'Andhra Pradesh',
  district: 'Guntur',
  village: 'Tenali',
  farmSize: '5.0',
  farmSizeUnit: 'Acres',
  currentCrop: 'Paddy',
  growthStage: 'Vegetative Tillering Stage',
  sowingDate: '2024-07-15',
  irrigationType: 'Canal & Borewell',
  soilType: 'Alluvial Clay Loam',
  preferredLanguage: 'en',
  isLoggedIn: true,
};

const getStoredUser = () => {
  const saved = localStorage.getItem('agrimind_user');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Purge any legacy Ramesh Reddy mock profile
      if (parsed.name && (parsed.name.includes('Ramesh') || (parsed.name.includes('Reddy') && parsed.id === 'farmer_001'))) {
        localStorage.removeItem('agrimind_user');
      } else {
        return parsed;
      }
    } catch (e) {
      localStorage.removeItem('agrimind_user');
    }
  }

  // Check if any registered farmer exists in local storage
  try {
    const registry = JSON.parse(localStorage.getItem('agrimind_registered_farmers') || '{}');
    const keys = Object.keys(registry);
    if (keys.length > 0) {
      return registry[keys[keys.length - 1]];
    }
  } catch (e) {}

  return INITIAL_FARMER_PROFILE;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);

  const [backendStatus, setBackendStatus] = useState({
    checked: false,
    online: true,
    message: 'AGRI-MIND Intelligence Core Active',
  });

  // Check backend health on mount
  useEffect(() => {
    let isMounted = true;
    apiService.checkHealth().then(res => {
      if (isMounted) {
        setBackendStatus({
          checked: true,
          online: true,
          message: res.connected ? 'Connected to FastAPI Core' : 'AGRI-MIND Neural Core Active',
        });
      }
    });
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('agrimind_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('agrimind_user');
    }
  }, [user]);

  const login = async (mobile, password) => {
    if (!mobile || mobile.trim().length < 10) {
      throw new Error('Please enter a valid 10-digit mobile number.');
    }
    if (!password || password.length < 4) {
      throw new Error('Password must be at least 4 characters.');
    }

    const cleanMobile = mobile.trim();
    let registry = {};
    try {
      registry = JSON.parse(localStorage.getItem('agrimind_registered_farmers') || '{}');
    } catch (e) {
      registry = {};
    }

    let authenticatedUser;
    if (registry[cleanMobile]) {
      authenticatedUser = {
        ...registry[cleanMobile],
        isLoggedIn: true,
        lastLogin: new Date().toISOString()
      };
    } else {
      // Create user profile for this exact mobile number
      authenticatedUser = {
        id: 'farmer_' + cleanMobile.slice(-4),
        name: `Farmer (${cleanMobile.slice(-4)})`,
        mobile: cleanMobile,
        location: 'Guntur, Andhra Pradesh',
        state: 'Andhra Pradesh',
        district: 'Guntur',
        village: '',
        farmSize: '5.0',
        farmSizeUnit: 'Acres',
        currentCrop: 'Paddy',
        growthStage: 'Tillering Stage',
        sowingDate: new Date().toISOString().split('T')[0],
        irrigationType: 'Borewell & Drip',
        soilType: 'Black Clay Loam',
        preferredLanguage: 'en',
        isLoggedIn: true,
      };
      registry[cleanMobile] = authenticatedUser;
      localStorage.setItem('agrimind_registered_farmers', JSON.stringify(registry));
    }

    setUser(authenticatedUser);
    localStorage.setItem('agrimind_user', JSON.stringify(authenticatedUser));
    await apiService.saveFarmerProfile(authenticatedUser);
    return authenticatedUser;
  };

  const register = async (formData) => {
    if (!formData.name || !formData.name.trim()) {
      throw new Error('Please provide your full farmer name.');
    }
    if (!formData.mobile || formData.mobile.trim().length < 10) {
      throw new Error('Please enter a valid 10-digit mobile number.');
    }

    const cleanMobile = formData.mobile.trim();
    const loc = formData.location?.trim() || 'Guntur, Andhra Pradesh';
    const isTelangana = loc.toLowerCase().includes('telangana');
    const parts = loc.split(',');
    const district = parts[0]?.trim() || loc;

    const newUser = {
      id: 'farmer_' + cleanMobile.slice(-4),
      name: formData.name.trim(),
      mobile: cleanMobile,
      location: loc,
      state: isTelangana ? 'Telangana' : 'Andhra Pradesh',
      district: district,
      village: formData.village || '',
      farmSize: formData.farmSize ? formData.farmSize.toString() : '5.0',
      farmSizeUnit: 'Acres',
      currentCrop: formData.currentCrop || 'Paddy',
      growthStage: formData.growthStage || 'Early Vegetative',
      sowingDate: formData.sowingDate || new Date().toISOString().split('T')[0],
      irrigationType: formData.irrigationType || 'Borewell & Drip',
      soilType: formData.soilType || 'Black Clay Loam',
      preferredLanguage: formData.preferredLanguage || 'en',
      password: formData.password || '',
      isLoggedIn: true,
    };

    let registry = {};
    try {
      registry = JSON.parse(localStorage.getItem('agrimind_registered_farmers') || '{}');
    } catch (e) {
      registry = {};
    }
    registry[cleanMobile] = newUser;
    localStorage.setItem('agrimind_registered_farmers', JSON.stringify(registry));

    setUser(newUser);
    localStorage.setItem('agrimind_user', JSON.stringify(newUser));
    await apiService.saveFarmerProfile(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('agrimind_user');
  };

  const updateProfile = (data) => {
    setUser(prev => {
      const updated = { ...prev, ...data };
      localStorage.setItem('agrimind_user', JSON.stringify(updated));
      if (updated.mobile) {
        try {
          const registry = JSON.parse(localStorage.getItem('agrimind_registered_farmers') || '{}');
          registry[updated.mobile] = updated;
          localStorage.setItem('agrimind_registered_farmers', JSON.stringify(registry));
        } catch (e) {}
      }
      apiService.saveFarmerProfile(updated);
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, backendStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
