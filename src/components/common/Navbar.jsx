import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Leaf, Menu, X, ArrowRight, User } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { useTranslation } from '../../i18n/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xs border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-forest-900 text-white flex items-center justify-center shadow-subtle group-hover:bg-forest-800 transition-colors">
            <Leaf className="w-5 h-5 text-forest-300" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-forest-900 font-sans block leading-none">
              AGRI<span className="text-forest-500 font-bold">-MIND</span>
            </span>
            <span className="text-[9px] uppercase tracking-wider text-mutedgrey font-medium block mt-0.5">
              Decision Support System
            </span>
          </div>
        </NavLink>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-700">
          <a href="#home" className="hover:text-forest-900 transition-colors">
            {t('nav.home')}
          </a>
          <a href="#features" className="hover:text-forest-900 transition-colors">
            {t('nav.features')}
          </a>
          <a href="#how-it-works" className="hover:text-forest-900 transition-colors">
            {t('nav.howItWorks')}
          </a>
          <a href="#supported-crops" className="hover:text-forest-900 transition-colors">
            {t('nav.supportedCrops')}
          </a>
          <a href="#about" className="hover:text-forest-900 transition-colors">
            {t('nav.about')}
          </a>
        </nav>

        {/* Right Controls: Language Selector, Login, Get Started */}
        <div className="hidden sm:flex items-center gap-3">
          <LanguageSelector variant="dropdown" />

          {user ? (
            <NavLink
              to="/dashboard"
              className="px-4 py-2 rounded-lg bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-subtle transition-all"
            >
              <span>{t('nav.dashboard')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/login"
                className="px-3.5 py-2 rounded-lg text-slate-700 hover:text-forest-900 hover:bg-slate-50 font-semibold text-xs transition-colors"
              >
                {t('nav.login')}
              </NavLink>
              <NavLink
                to="/login?mode=register"
                className="px-4 py-2 rounded-lg bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-subtle transition-all"
              >
                <span>{t('nav.getStarted')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSelector variant="dropdown" />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              {t('nav.home')}
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              {t('nav.features')}
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              {t('nav.howItWorks')}
            </a>
            <a
              href="#supported-crops"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              {t('nav.supportedCrops')}
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              {t('nav.about')}
            </a>
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <NavLink
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-lg bg-forest-900 text-white font-bold text-center text-xs"
            >
              {t('nav.dashboard')}
            </NavLink>
            <NavLink
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2 rounded-lg border border-slate-200 text-slate-700 font-semibold text-center text-xs"
            >
              {t('nav.login')}
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};
