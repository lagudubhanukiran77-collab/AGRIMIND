import React from 'react';

export const Card = ({ children, className = '', title, subtitle, headerAction, footer, noPadding = false }) => {
  return (
    <div className={`bg-white rounded-xl border border-slate-200/80 shadow-subtle hover:border-slate-300 transition-colors ${className}`}>
      {(title || subtitle || headerAction) && (
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            {title && <h3 className="font-semibold text-charcoal text-base">{title}</h3>}
            {subtitle && <p className="text-xs text-mutedgrey mt-0.5">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className={noPadding ? '' : 'p-5'}>
        {children}
      </div>
      {footer && (
        <div className="px-5 py-3 bg-slate-50/70 border-t border-slate-100 rounded-b-xl">
          {footer}
        </div>
      )}
    </div>
  );
};
