import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import { Globe, ChevronDown, Check } from 'lucide-react';

export const LanguageSelector = ({ variant = 'dropdown', className = '' }) => {
  const { language, setLanguage, supportedLanguages, currentLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'pill-group') {
    return (
      <div className={`inline-flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/80 ${className}`}>
        {supportedLanguages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              language === lang.code
                ? 'bg-white text-forest-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-charcoal'
            }`}
          >
            {lang.nativeName}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-between gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-forest-900 transition-colors shadow-subtle"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-forest-900" />
        <span className="font-semibold text-charcoal">{currentLanguage.nativeName}</span>
        <span className="text-[10px] text-mutedgrey uppercase tracking-wider">({currentLanguage.code})</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-1 w-44 rounded-lg bg-white shadow-hover border border-slate-200 py-1 focus:outline-none animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-semibold text-mutedgrey border-b border-slate-100">
            Select Language / భాష
          </div>
          {supportedLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                language === lang.code
                  ? 'bg-forest-50/70 text-forest-900 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{lang.flag}</span>
                <div>
                  <div className="text-xs">{lang.nativeName}</div>
                  <div className="text-[10px] text-mutedgrey">{lang.name}</div>
                </div>
              </div>
              {language === lang.code && <Check className="w-3.5 h-3.5 text-forest-900" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
