import React from 'react';

export const LoadingSkeleton = ({ count = 3, type = 'card' }) => {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 bg-slate-200 rounded w-1/3"></div>
              <div className="w-8 h-8 bg-slate-200 rounded-lg"></div>
            </div>
            <div className="h-8 bg-slate-200 rounded w-1/2 mb-3"></div>
            <div className="h-3 bg-slate-100 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'row') {
    return (
      <div className="space-y-3 animate-pulse">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="h-12 bg-slate-100 rounded-lg w-full"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 bg-slate-200 rounded w-1/4"></div>
      <div className="h-32 bg-slate-100 rounded-xl"></div>
    </div>
  );
};
