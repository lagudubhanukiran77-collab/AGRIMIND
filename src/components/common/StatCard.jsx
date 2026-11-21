import React from 'react';
import { Card } from './Card';

export const StatCard = ({ icon: Icon, title, value, subtext, delta, deltaType = 'neutral', iconBg = 'bg-forest-50', iconColor = 'text-forest-900' }) => {
  return (
    <Card className="relative overflow-hidden group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-mutedgrey uppercase tracking-wider">{title}</p>
          <h4 className="text-2xl font-bold text-charcoal mt-1.5">{value}</h4>
          {subtext && <p className="text-xs text-mutedgrey mt-1">{subtext}</p>}
        </div>
        <div className={`p-3 rounded-lg ${iconBg} ${iconColor} transition-transform group-hover:scale-105 duration-200`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {delta && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center text-xs">
          <span className={`font-semibold mr-1.5 ${
            deltaType === 'positive' ? 'text-forest-700' :
            deltaType === 'negative' ? 'text-red-600' : 'text-slate-600'
          }`}>
            {delta}
          </span>
          <span className="text-slate-400">vs historical benchmark</span>
        </div>
      )}
    </Card>
  );
};
