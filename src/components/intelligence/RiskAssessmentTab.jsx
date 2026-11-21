import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { CloudRain, Bug, FlaskConical, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '../../i18n/LanguageContext';

export const RiskAssessmentTab = () => {
  const { t } = useTranslation();

  const riskCategories = [
    {
      id: 'weather',
      title: t('intelligence.riskTab.weatherRisk'),
      level: 'Moderate',
      score: 'Level 2 / 4',
      variant: 'warning',
      icon: CloudRain,
      reasons: [
        '45mm rainfall predicted within the next 48-72 hours across Warangal/Khammam belt',
        'Prolonged relative humidity (>68%) creates microclimatic vapor pressure deficit',
        'Potential surface water stagnation in flat clayey farm blocks without drainage furrows'
      ],
      mitigation: 'Prepare emergency peripheral bund outlets to discharge standing runoff immediately after rainfall.'
    },
    {
      id: 'disease',
      title: t('intelligence.riskTab.diseaseRisk'),
      level: 'Moderate',
      score: 'Level 2 / 4',
      variant: 'warning',
      icon: Bug,
      reasons: [
        'Recent visual scan confirmed early spindle lesions characteristic of Rice Blast on Paddy Block 1A',
        'High humidity and night dew deposition foster conidial germination on younger leaf blades',
        'Neighbouring chilli plots report elevated thrips activity under warm daytime intervals'
      ],
      mitigation: 'Halt top-dressing of nitrogen fertilizers; spray prophylactic bio-agent or recommended systemic fungicide.'
    },
    {
      id: 'soil',
      title: t('intelligence.riskTab.soilRisk'),
      level: 'Low',
      score: 'Level 1 / 4',
      variant: 'success',
      icon: FlaskConical,
      reasons: [
        'Soil pH at 7.2 is within optimal neutral-to-alkaline range for maximum nutrient availability',
        'Electrical Conductivity (EC) of 0.42 dS/m demonstrates absence of salinity or sodium toxicity',
        'Cation exchange capacity of deep black vertisols provides strong buffering capacity'
      ],
      mitigation: 'Maintain balanced micronutrient foliar spray (Zinc Sulphate 0.5%) to address slight zinc latency.'
    },
    {
      id: 'stress',
      title: t('intelligence.riskTab.cropStressRisk'),
      level: 'Low',
      score: 'Level 1 / 4',
      variant: 'success',
      icon: ShieldCheck,
      reasons: [
        'Canopy chlorophyll index (SPAD 41.8) confirms active photosynthetic vigor across 88% of acreage',
        'Root zone soil moisture tension measured at 22 kPa indicates adequate capillary moisture',
        'No visible lodging, wind breakage, or wilting observed during routine scouting'
      ],
      mitigation: 'Continue scheduled 3-day alternate wetting-and-drying rotation.'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-charcoal">{t('intelligence.riskTab.title')}</h3>
          <p className="text-xs text-mutedgrey mt-0.5 max-w-2xl">
            {t('intelligence.riskTab.subtitle')}
          </p>
        </div>
        <Badge variant="warning" size="md">
          Composite Index: Moderate Risk
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {riskCategories.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.id}
              title={item.title}
              subtitle={item.score}
              headerAction={
                <Badge variant={item.variant} size="sm">
                  {item.level} Risk
                </Badge>
              }
              className={`border-l-4 ${
                item.level === 'High' ? 'border-l-red-500' :
                item.level === 'Moderate' ? 'border-l-amber-500' :
                'border-l-forest-600'
              }`}
            >
              <div className="space-y-3.5">
                <div>
                  <span className="text-[11px] font-bold text-mutedgrey uppercase tracking-wider block mb-2">
                    Primary Determining Factors:
                  </span>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {item.reasons.map((r, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                          item.level === 'Moderate' ? 'bg-amber-500' : 'bg-forest-600'
                        }`} />
                        <span className="leading-snug">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-100 p-2.5 rounded-lg bg-slate-50 text-xs">
                  <span className="font-semibold text-charcoal block mb-0.5">
                    Recommended Action:
                  </span>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {item.mitigation}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
