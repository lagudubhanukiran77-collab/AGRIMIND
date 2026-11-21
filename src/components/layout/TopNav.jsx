import React, { useState } from 'react';
import { Menu, Search, Leaf, Shield, Cpu, Sparkles } from 'lucide-react';
import { LanguageSelector } from '../common/LanguageSelector';
import { NotificationPanel } from '../common/NotificationPanel';
import { UserProfileMenu } from '../common/UserProfileMenu';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../i18n/LanguageContext';
import { useNavigate } from 'react-router-dom';

export const TopNav = ({ onToggleSidebar }) => {
  const { backendStatus } = useAuth();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    if (q.includes('disease') || q.includes('leaf') || q.includes('blast')) {
      navigate('/disease-detection');
    } else if (q.includes('weather') || q.includes('rain') || q.includes('temp')) {
      navigate('/weather-intelligence');
    } else if (q.includes('soil') || q.includes('npk') || q.includes('ph')) {
      navigate('/soil-health');
    } else if (q.includes('yield') || q.includes('harvest') || q.includes('quintal')) {
      navigate('/yield-prediction');
    } else if (q.includes('crop') || q.includes('paddy') || q.includes('chilli') || q.includes('cotton')) {
      navigate('/crop-recommendation');
    } else if (q.includes('risk') || q.includes('report')) {
      navigate('/reports');
    } else if (q.includes('farm')) {
      navigate('/my-farm');
    } else if (q.includes('help') || q.includes('ask') || q.includes('assistant')) {
      navigate('/assistant');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-xs border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile hamburger & search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-slate-600 hover:text-charcoal hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Quick Search */}
        <form onSubmit={handleSearch} className="relative w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search crop, disease, NPK, weather..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-forest-900 focus:border-forest-900 transition-all"
          />
        </form>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* System Telemetry Status Pill */}
        <div
          className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border bg-emerald-50 text-forest-900 border-forest-200"
          title="AGRI-MIND Agricultural Telemetry Active"
        >
          <span className="w-2 h-2 rounded-full bg-forest-500 animate-pulse" />
          <span className="font-mono text-[10px]">System Online</span>
        </div>

        {/* Language Selector */}
        <LanguageSelector variant="dropdown" />

        {/* Notification Panel */}
        <NotificationPanel />

        {/* User Profile Menu */}
        <UserProfileMenu />
      </div>
    </header>
  );
};
