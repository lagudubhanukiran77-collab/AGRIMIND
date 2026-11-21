import React, { useState, useRef, useEffect } from 'react';
import { Bell, CheckCheck, AlertTriangle, Info, ShieldAlert, Clock } from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export const NotificationPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, markNotificationRead, clearNotifications, unreadCount } = useFarm();
  const panelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'danger':
        return <ShieldAlert className="w-4 h-4 text-red-500" />;
      default:
        return <Info className="w-4 h-4 text-forest-700" />;
    }
  };

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg text-slate-600 hover:text-charcoal hover:bg-slate-100 transition-colors"
        title="Notifications"
        aria-label="View notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-forest-600 text-[10px] font-bold text-white ring-2 ring-white animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-white shadow-hover border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-charcoal text-sm">Farm Alerts & Advisory</span>
              {unreadCount > 0 && (
                <span className="text-[11px] bg-forest-100 text-forest-900 font-semibold px-2 py-0.5 rounded-full">
                  {unreadCount} New
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={clearNotifications}
                className="text-xs text-forest-700 hover:text-forest-900 font-medium flex items-center gap-1"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-mutedgrey">
                No active notifications
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => markNotificationRead(item.id)}
                  className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 ${
                    !item.read ? 'bg-forest-50/20' : ''
                  }`}
                >
                  <div className="mt-0.5 shrink-0">{getIcon(item.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <p className={`text-xs ${!item.read ? 'font-semibold text-charcoal' : 'font-medium text-slate-700'}`}>
                        {item.title}
                      </p>
                      <span className="text-[10px] text-mutedgrey shrink-0 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                      {item.message}
                    </p>
                  </div>
                  {!item.read && (
                    <div className="w-2 h-2 rounded-full bg-forest-600 self-center shrink-0" />
                  )}
                </div>
              ))
            )}
          </div>

          <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
            <span className="text-[11px] text-mutedgrey">
              Alerts generated from local KVK & IMD radar data
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
