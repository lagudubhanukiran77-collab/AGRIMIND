import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, Sprout, MapPin, Phone, ShieldCheck, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const UserProfileMenu = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  if (!user) {
    return (
      <button
        onClick={() => navigate('/login')}
        className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-forest-900 text-white hover:bg-forest-800 transition-colors"
      >
        Sign In
      </button>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 pr-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-subtle"
        aria-expanded={isOpen}
      >
        <div className="w-7 h-7 rounded-full bg-forest-100 border border-forest-200 text-forest-900 font-bold text-xs flex items-center justify-center">
          {user.name ? user.name.charAt(0).toUpperCase() : 'F'}
        </div>
        <div className="text-left hidden md:block">
          <div className="text-xs font-semibold text-charcoal leading-none truncate max-w-[110px]">
            {user.name}
          </div>
          <div className="text-[10px] text-mutedgrey leading-none mt-0.5 truncate max-w-[110px]">
            {user.location ? user.location.split(',')[0] : 'Farmer'}
          </div>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-hover border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          <div className="p-4 bg-forest-900 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-forest-800 border border-forest-700 flex items-center justify-center font-bold text-base text-white">
                {user.name ? user.name.charAt(0).toUpperCase() : 'F'}
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-sm truncate">{user.name}</h4>
                <div className="flex items-center gap-1 text-[11px] text-forest-200 truncate mt-0.5">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span className="truncate">{user.location}</span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-forest-800 flex items-center justify-between text-[11px] text-forest-200">
              <span className="flex items-center gap-1">
                <Sprout className="w-3.5 h-3.5 text-forest-300" />
                {user.farmSize} {user.farmSizeUnit || 'Acres'}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-forest-300" />
                {user.mobile}
              </span>
            </div>
          </div>

          <div className="p-2 divide-y divide-slate-100 text-xs">
            <div className="py-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/my-farm');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <Sprout className="w-4 h-4 text-forest-700" />
                <span>My Farm Profile</span>
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/soil-health');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-forest-700" />
                <span>Soil & Yield Analytics</span>
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/settings');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4 text-forest-700" />
                <span>System Settings</span>
              </button>
            </div>

            <div className="pt-1">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
