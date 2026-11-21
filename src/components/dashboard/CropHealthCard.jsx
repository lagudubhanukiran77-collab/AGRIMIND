import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Sprout, Activity, Calendar, ShieldCheck, AlertCircle } from 'lucide-react';
import { useTranslation } from '../../i18n/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';

export const CropHealthCard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const currentCrop = user?.currentCrop || 'Paddy';
  const growthStage = user?.growthStage || 'Vegetative Stage';

  return (
    <Card
      title={t('dashboard.cropHealth.title')}
      subtitle="Multispectral NDVI & Visual Vigor Status"
    >
      <div className="space-y-4">
        {/* Main health indicator */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-200 flex items-center justify-center text-forest-800">
              <Sprout className="w-6 h-6 text-forest-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-charcoal text-base">{currentCrop}</h4>
                <Badge variant="success" size="sm">Optimal Vigor</Badge>
              </div>
              <p className="text-xs text-mutedgrey mt-0.5">Plot 1A · {growthStage}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-forest-900">88</span>
            <span className="text-xs text-mutedgrey font-medium">/100</span>
            <p className="text-[10px] text-mutedgrey uppercase tracking-wider font-semibold">Vigor Score</p>
          </div>
        </div>

        {/* Breakdown parameters */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-mutedgrey text-[11px] block">{t('dashboard.cropHealth.stage')}</span>
            <span className="font-semibold text-charcoal mt-0.5 block">{growthStage}</span>
            <span className="text-[10px] text-forest-700">Next milestone in ~14 days</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-mutedgrey text-[11px] block">{t('dashboard.cropHealth.lastAnalysis')}</span>
            <span className="font-semibold text-charcoal mt-0.5 block">18 Nov 2024, 10:25 AM</span>
            <span className="text-[10px] text-slate-500">Telemetry Active</span>
          </div>
        </div>

        {/* Vigor progress bar */}
        <div>
          <div className="flex justify-between text-xs text-slate-600 mb-1">
            <span>Canopy Chlorophyll Index (SPAD)</span>
            <span className="font-semibold text-forest-900">41.8 (Healthy)</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div className="bg-forest-600 h-2 rounded-full" style={{ width: '84%' }}></div>
          </div>
        </div>

        {/* Quick action button */}
        <div className="pt-1 flex items-center justify-between text-xs">
          <span className="text-mutedgrey">Optimal vegetation index detected</span>
          <NavLink
            to="/disease-detection"
            className="font-semibold text-forest-800 hover:text-forest-900 flex items-center gap-1"
          >
            Review Scan Report →
          </NavLink>
        </div>
      </div>
    </Card>
  );
};
