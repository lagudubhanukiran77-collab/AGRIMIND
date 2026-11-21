import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, SUPPORTED_LANGUAGES } from './translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('agrimind_language') || 'en';
  });

  const setLanguage = (langCode) => {
    if (translations[langCode]) {
      setLanguageState(langCode);
      localStorage.setItem('agrimind_language', langCode);
      document.documentElement.setAttribute('lang', langCode);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  // Nested translation helper: t('landing.heroHeadline')
  const t = (path, fallback = '') => {
    const keys = path.split('.');
    let current = translations[language] || translations['en'];

    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to English if translation key is missing
        let fallbackCurrent = translations['en'];
        for (const fbKey of keys) {
          if (fallbackCurrent && fallbackCurrent[fbKey] !== undefined) {
            fallbackCurrent = fallbackCurrent[fbKey];
          } else {
            return fallback || path;
          }
        }
        return fallbackCurrent;
      }
    }
    return current;
  };

  const currentLanguage = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, currentLanguage, supportedLanguages: SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
