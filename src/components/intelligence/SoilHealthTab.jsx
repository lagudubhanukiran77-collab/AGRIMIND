import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { FlaskConical, CheckCircle2, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';
import { useTranslation } from '../../i18n/LanguageContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

export const SoilHealthTab = () => {
  const { t } = useTranslation();

  const npkData = [
    { nutrient: 'Nitrogen (N)', current: 185, optimal: 280, unit: 'kg/ha', status: 'Deficient' },
    { nutrient: 'Phosphorus (P)', current: 42, optimal: 35, unit: 'kg/ha', status: 'Optimal' },
    { nutrient: 'Potassium (K)', current: 210, optimal: 190, unit: 'kg/ha', status: 'High' },
    { nutrient: 'Organic Carbon', current: 0.54, optimal: 0.75, unit: '%', status: 'Moderate' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Soil Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* pH Card with Visual Indicator */}
        <Card title={t('intelligence.soilTab.phLevel')} subtitle="Reaction & Acidity Status">
          <div className="text-center py-2">
            <div className="inline-block px-4 py-2 rounded-2xl bg-forest-50 border border-forest-200">
              <span className="text-3xl font-black text-forest-900">7.2</span>
              <span className="text-xs text-forest-700 block font-medium">Slightly Alkaline (Optimal)</span>
            </div>

            {/* pH Meter Bar */}
            <div className="mt-4 px-2">
              <div className="h-3 w-full rounded-full bg-gradient-to-r from-red-400 via-emerald-400 to-blue-500 relative">
                {/* Pointer for 7.2 on scale 4 to 10 */}
                <div
                  className="absolute -top-1 w-5 h-5 rounded-full bg-white border-2 border-forest-900 shadow-sm -ml-2.5"
                  style={{ left: `${((7.2 - 4) / 6) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-mutedgrey mt-1 font-mono">
                <span>4.0 (Acidic)</span>
                <span>7.0 (Neutral)</span>
                <span>10.0 (Alkaline)</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-3 text-left">
              Favorable for nutrient absorption and microbial nitrogen fixation in Andhra & Telangana soils.
            </p>
          </div>
        </Card>

        {/* Overall Condition Card */}
        <Card title={t('intelligence.soilTab.condition')} subtitle="Fertility & Structure Index">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs text-mutedgrey">Soil Classification:</span>
              <span className="text-xs font-bold text-charcoal">Deep Black Clay (Vertisol)</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs text-mutedgrey">Electrical Conductivity (EC):</span>
              <span className="text-xs font-semibold text-charcoal">0.42 dS/m (Normal)</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs text-mutedgrey">Organic Carbon:</span>
              <span className="text-xs font-semibold text-charcoal">0.54% (Moderate)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-mutedgrey">Overall Fertility Rating:</span>
              <Badge variant="success" size="sm">Grade B+ (Good)</Badge>
            </div>
          </div>
        </Card>

        {/* Major Deficiencies Card */}
        <Card title="Immediate Deficiencies" subtitle="Critical Soil Constraints">
          <div className="space-y-2.5 text-xs">
            <div className="p-2.5 rounded-lg bg-red-50 border border-red-100 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-red-900">Nitrogen Deficit (34% below par)</span>
                <p className="text-[11px] text-red-700 mt-0.5">Top-soil exhibits slow mineralization; split urea or vermicompost needed.</p>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-100 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-amber-900">Zinc (Zn) Marginal Level</span>
                <p className="text-[11px] text-amber-700 mt-0.5">Available zinc at 0.58 ppm; foliar zinc spray recommended during tillering.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* NPK Distribution Chart */}
      <Card
        title={t('intelligence.soilTab.macroNutrients')}
        subtitle="Current Soil Test vs Optimal Agronomic Thresholds (kg/ha)"
      >
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={npkData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="nutrient" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="current" fill="#14532D" name="Current Test Value" radius={[4, 4, 0, 0]} />
              <Bar dataKey="optimal" fill="#94a3b8" name="Optimal Regional Target" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Soil Improvement Suggestions */}
      <Card
        title={t('intelligence.soilTab.improvement')}
        subtitle="Scientifically Formulated Prescription (ICAR & ANGRAU Norms)"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60">
            <h4 className="font-bold text-forest-900 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-forest-700" />
              1. Nitrogen Replenishment Schedule
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Adopt split application of Urea: Apply 45 kg/acre basal during final land preparation, followed by 30 kg/acre at active tillering (30 DAS) and 25 kg/acre at panicle initiation.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60">
            <h4 className="font-bold text-forest-900 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-forest-700" />
              2. Micronutrient Fortification
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Incorporate Zinc Sulphate (ZnSO₄ 21%) @ 20 kg/acre as basal soil application. Avoid mixing zinc directly with phosphatic fertilizers (DAP/SSP).
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60">
            <h4 className="font-bold text-forest-900 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-forest-700" />
              3. Organic Carbon Enhancement
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Incorporate well-decomposed Farmyard Manure (FYM) @ 5 tonnes/acre or grow green manure crops (Dhaincha/Sunnhemp) and incorporate in-situ before transplanting.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60">
            <h4 className="font-bold text-forest-900 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-forest-700" />
              4. Drainage and Aeration Management
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Form 30cm deep drainage channels every 15 meters in heavy black soils to prevent root zone water stagnation and promote aerobic microbial respiration.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
