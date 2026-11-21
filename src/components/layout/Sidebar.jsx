import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Sprout,
  ScanLine,
  CloudSun,
  FlaskConical,
  TrendingUp,
  Bot,
  FileText,
  Settings,
  Leaf,
  X,
  Compass
} from 'lucide-react';
import { useTranslation } from '../../i18n/LanguageContext';

export const Sidebar = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const navigationItems = [
    { name: t('nav.dashboard'), path: '/dashboard', icon: LayoutDashboard },
    { name: t('nav.myFarm'), path: '/my-farm', icon: Compass },
    { name: t('nav.diseaseDetection'), path: '/disease-detection', icon: ScanLine, highlight: true },
    { name: t('nav.cropRecommendation'), path: '/crop-recommendation', icon: Sprout },
    { name: t('nav.weatherIntelligence'), path: '/weather-intelligence', icon: CloudSun },
    { name: t('nav.soilHealth'), path: '/soil-health', icon: FlaskConical },
    { name: t('nav.yieldPrediction'), path: '/yield-prediction', icon: TrendingUp },
    { name: t('nav.aiAssistant'), path: '/assistant', icon: Bot, highlight: true },
    { name: t('nav.reports'), path: '/reports', icon: FileText },
    { name: t('nav.settings'), path: '/settings', icon: Settings },
  ];

  // Precise single-item active state calculation
  const isItemActive = (item) => {
    const currentPath = location.pathname;
    const currentSearch = location.search;

    if (item.path === '/dashboard') {
      return currentPath === '/dashboard' && !location.hash;
    }
    if (item.path === '/my-farm') {
      return currentPath === '/my-farm' || (currentPath === '/dashboard' && location.hash === '#my-farm');
    }
    if (item.path === '/settings') {
      return currentPath === '/settings' || (currentPath === '/dashboard' && location.hash === '#settings');
    }
    if (item.path === '/disease-detection') {
      return currentPath === '/disease-detection';
    }
    if (item.path === '/assistant') {
      return currentPath === '/assistant';
    }
    if (item.path === '/crop-recommendation') {
      return currentPath === '/crop-recommendation' || (currentPath === '/intelligence' && (!currentSearch || currentSearch.includes('tab=cropRec')));
    }
    if (item.path === '/weather-intelligence') {
      return currentPath === '/weather-intelligence' || (currentPath === '/intelligence' && currentSearch.includes('tab=weather'));
    }
    if (item.path === '/soil-health') {
      return currentPath === '/soil-health' || (currentPath === '/intelligence' && currentSearch.includes('tab=soil'));
    }
    if (item.path === '/yield-prediction') {
      return currentPath === '/yield-prediction' || (currentPath === '/intelligence' && currentSearch.includes('tab=yield'));
    }
    if (item.path === '/reports') {
      return currentPath === '/reports' || (currentPath === '/intelligence' && currentSearch.includes('tab=risk'));
    }

    return currentPath === item.path;
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-charcoal/50 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200/80 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand header */}
        <div className="h-16 px-5 border-b border-slate-100 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-forest-900 text-white flex items-center justify-center shadow-subtle group-hover:bg-forest-800 transition-colors">
              <Leaf className="w-5 h-5 text-forest-300" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-forest-900 font-sans block leading-none">
                AGRI<span className="text-forest-500 font-bold">-MIND</span>
              </span>
              <span className="text-[9px] uppercase tracking-wider text-mutedgrey font-medium block mt-0.5">
                AI Agricultural Core
              </span>
            </div>
          </NavLink>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 text-slate-400 hover:text-charcoal hover:bg-slate-100 rounded-lg"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Region & Crop Badge */}
        <div className="px-5 py-3 bg-slate-50/70 border-b border-slate-100">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-mutedgrey font-medium">Zone:</span>
            <span className="font-semibold text-charcoal">AP & Telangana</span>
          </div>
          <div className="flex items-center justify-between text-[11px] mt-1">
            <span className="text-mutedgrey font-medium">Core Crops:</span>
            <span className="font-semibold text-forest-900">Paddy · Chilli · Cotton</span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item);

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                  active
                    ? 'bg-forest-900 text-white shadow-subtle'
                    : 'text-slate-700 hover:text-charcoal hover:bg-slate-100/80'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-forest-300' : 'text-slate-400'}`} />
                <span className="truncate flex-1">{item.name}</span>
                {item.highlight && !active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-forest-500" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Pro / Agri-Extension Support card */}
        <div className="p-3 m-3 bg-forest-50/80 rounded-xl border border-forest-100">
          <div className="flex items-center gap-2 text-forest-900 font-semibold text-xs mb-1">
            <Leaf className="w-3.5 h-3.5 text-forest-700" />
            <span>KVK & Extension</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-snug">
            Need urgent field verification? Connect directly with local agricultural officers.
          </p>
          <NavLink
            to="/assistant"
            className="mt-2.5 inline-block text-[11px] font-semibold text-forest-800 hover:text-forest-900 underline"
          >
            Launch Advisory Bot →
          </NavLink>
        </div>

        {/* Version info */}
        <div className="p-3 border-t border-slate-100 text-center text-[10px] text-mutedgrey">
          AGRI-MIND Enterprise v1.0.0 · Active
        </div>
      </aside>
    </>
  );
};
