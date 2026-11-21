import React from 'react';
import { Card } from '../common/Card';
import { ScanLine, Sprout, CloudSun, Bot, ArrowUpRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from '../../i18n/LanguageContext';

export const QuickActions = () => {
  const { t } = useTranslation();

  const actions = [
    {
      title: t('dashboard.quickActions.detectDisease'),
      subtitle: 'Upload leaf photo for neural diagnostic',
      path: '/disease-detection',
      icon: ScanLine,
      color: 'border-forest-200 hover:border-forest-500 hover:bg-forest-50/50',
      iconColor: 'bg-forest-100 text-forest-900',
    },
    {
      title: t('dashboard.quickActions.analyzeCrop'),
      subtitle: 'Calculate NPK soil-matching score',
      path: '/crop-recommendation',
      icon: Sprout,
      color: 'border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50/50',
      iconColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      title: t('dashboard.quickActions.checkWeather'),
      subtitle: 'Review 7-day storm & rain risks',
      path: '/weather-intelligence',
      icon: CloudSun,
      color: 'border-blue-200 hover:border-blue-500 hover:bg-blue-50/50',
      iconColor: 'bg-blue-100 text-blue-800',
    },
    {
      title: t('dashboard.quickActions.askAi'),
      subtitle: 'Multilingual chat in Telugu/Hindi/English',
      path: '/assistant',
      icon: Bot,
      color: 'border-amber-200 hover:border-amber-500 hover:bg-amber-50/50',
      iconColor: 'bg-amber-100 text-amber-800',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((act) => {
        const Icon = act.icon;
        return (
          <NavLink
            key={act.path}
            to={act.path}
            className={`p-4 rounded-xl bg-white border ${act.color} shadow-subtle hover:shadow-card transition-all flex flex-col justify-between group`}
          >
            <div className="flex items-start justify-between">
              <div className={`p-2.5 rounded-lg ${act.iconColor}`}>
                <Icon className="w-5 h-5" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-forest-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <div className="mt-4">
              <h4 className="font-semibold text-charcoal text-sm group-hover:text-forest-900 transition-colors">
                {act.title}
              </h4>
              <p className="text-xs text-mutedgrey mt-0.5 leading-snug">
                {act.subtitle}
              </p>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};
