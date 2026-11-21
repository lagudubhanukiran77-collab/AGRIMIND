import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { CloudRain, Bug, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useTranslation } from '../../i18n/LanguageContext';

export const RiskOverviewCard = () => {
  const { t } = useTranslation();

  const risks = [
    {
      id: 'weather',
      title: t('dashboard.riskOverview.weatherRisk'),
      level: 'Moderate',
      variant: 'warning',
      icon: CloudRain,
      detail: '45mm rainfall predicted within 48h. Field stagnation risk for red loamy zones.',
      score: '45%',
    },
    {
      id: 'disease',
      title: t('dashboard.riskOverview.diseaseRisk'),
      level: 'Moderate',
      variant: 'warning',
      icon: Bug,
      detail: 'High humidity (>70%) triggers blast spore germination in vegetative paddy.',
      score: '52%',
    },
    {
      id: 'stress',
      title: t('dashboard.riskOverview.cropStressRisk'),
      level: 'Low',
      variant: 'success',
      icon: ShieldCheck,
      detail: 'Root moisture tension is balanced. Soil moisture tension currently at 22 kPa.',
      score: '18%',
    },
  ];

  return (
    <Card
      title={t('dashboard.riskOverview.title')}
      subtitle="Multivariate Early Warning System"
    >
      <div className="space-y-3">
        {risks.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-md ${
                    item.level === 'High' ? 'bg-red-100 text-red-700' :
                    item.level === 'Moderate' ? 'bg-amber-100 text-amber-800' :
                    'bg-emerald-100 text-emerald-800'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-charcoal">{item.title}</span>
                </div>
                <Badge variant={item.variant} size="sm">
                  {item.level} Risk ({item.score})
                </Badge>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug pl-8">
                {item.detail}
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
