import React from 'react';
import { AlertTriangle, Info, CheckCircle2, ShieldAlert } from 'lucide-react';

export const AlertBanner = ({ type = 'info', title, message, action, onClose, className = '' }) => {
  const styles = {
    info: {
      bg: 'bg-emerald-50/70 border-forest-200 text-forest-900',
      icon: <Info className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />,
    },
    warning: {
      bg: 'bg-amber-50 border-amber-200 text-amber-900',
      icon: <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />,
    },
    danger: {
      bg: 'bg-red-50 border-red-200 text-red-900',
      icon: <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />,
    },
    neutral: {
      bg: 'bg-slate-50 border-slate-200 text-slate-800',
      icon: <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />,
    }
  };

  const current = styles[type] || styles.info;

  return (
    <div className={`p-3.5 rounded-lg border flex items-start gap-3 text-xs ${current.bg} ${className}`}>
      {current.icon}
      <div className="flex-1">
        {title && <span className="font-semibold block mb-0.5">{title}</span>}
        <div className="leading-relaxed opacity-90">{message}</div>
      </div>
      {action && <div>{action}</div>}
      {onClose && (
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 -mr-1 p-0.5"
          aria-label="Close alert"
        >
          ✕
        </button>
      )}
    </div>
  );
};
