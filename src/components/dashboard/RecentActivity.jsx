import React from 'react';
import { Card } from '../common/Card';
import { ScanLine, Sprout, AlertTriangle, ArrowRight, Clock } from 'lucide-react';
import { useTranslation } from '../../i18n/LanguageContext';
import { NavLink } from 'react-router-dom';

export const RecentActivity = () => {
  const { t } = useTranslation();

  const activities = [
    {
      id: 1,
      icon: ScanLine,
      iconBg: 'bg-amber-100 text-amber-800',
      title: t('dashboard.recentActivity.latestDisease'),
      time: 'Today, 10:25 AM',
      link: '/disease-detection',
    },
    {
      id: 2,
      icon: Sprout,
      iconBg: 'bg-emerald-100 text-forest-800',
      title: t('dashboard.recentActivity.latestCropRec'),
      time: 'Yesterday, 04:12 PM',
      link: '/crop-recommendation',
    },
    {
      id: 3,
      icon: AlertTriangle,
      iconBg: 'bg-blue-100 text-blue-800',
      title: t('dashboard.recentActivity.latestWeatherAlert'),
      time: '2 days ago',
      link: '/weather-intelligence',
    },
  ];

  return (
    <Card
      title={t('dashboard.recentActivity.title')}
      subtitle="Chronological Log of Farm Diagnostics & Advisories"
      footer={
        <NavLink
          to="/reports"
          className="text-xs font-semibold text-forest-800 hover:text-forest-900 flex items-center justify-between"
        >
          <span>{t('dashboard.recentActivity.viewAll')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </NavLink>
      }
    >
      <div className="space-y-3">
        {activities.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.link}
              className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors group"
            >
              <div className={`p-2 rounded-lg ${item.iconBg} shrink-0 mt-0.5`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-charcoal group-hover:text-forest-900 transition-colors">
                  {item.title}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-mutedgrey mt-1">
                  <Clock className="w-3 h-3" />
                  <span>{item.time}</span>
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </Card>
  );
};
