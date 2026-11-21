import React, { useState, useEffect } from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { TrendingUp, Calculator, AlertCircle, Info, Sparkles, CheckCircle2 } from 'lucide-react';
import { apiService } from '../../services/api';
import { useTranslation } from '../../i18n/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export const YieldPredictionTab = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [inputs, setInputs] = useState({
    crop: user?.currentCrop || 'Paddy',
    location: user?.location || 'Andhra Pradesh & Telangana',
    area: user?.farmSize || '5.0',
    season: 'Kharif',
    history: 'Crop rotation in previous season',
  });

  useEffect(() => {
    if (user) {
      setInputs(prev => ({
        ...prev,
        crop: user.currentCrop || prev.crop,
        location: user.location || prev.location,
        area: user.farmSize || prev.area,
      }));
    }
  }, [user]);

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState({
    estimatedYield: 130,
    unit: 'Quintals',
    yieldPerAcre: 26,
    confidenceInterval: '114 – 146 Quintals (95% CI)',
    factors: [
      { factor: 'Optimal Sowing Window (July 15)', impact: '+8%', sentiment: 'positive' },
      { factor: 'Balanced Soil NPK Profile', impact: '+6%', sentiment: 'positive' },
      { factor: 'Historical Yield Baseline (AP/TG avg)', impact: '+3%', sentiment: 'positive' },
      { factor: 'Forecasted Rain/Humidity Stress', impact: '-4%', sentiment: 'negative' },
    ],
    disclaimer: 'Statistical prediction using regional agro-climatic yield models. Actual yield depends on pest management, irrigation timing, and harvesting conditions.'
  });

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await apiService.predictYield(inputs);
    setTimeout(() => {
      setPrediction(res.data);
      setLoading(false);
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <Card
        title={t('intelligence.yieldTab.title')}
        subtitle="Agro-Climatic Machine Learning Projection Model"
      >
        <form onSubmit={handlePredict} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-mutedgrey font-medium mb-1.5">
                {t('intelligence.yieldTab.crop')}
              </label>
              <select
                value={inputs.crop}
                onChange={(e) => setInputs({ ...inputs, crop: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-charcoal bg-white focus:ring-1 focus:ring-forest-900"
              >
                <option value="Paddy (Telangana Sona)">Paddy (Telangana Sona)</option>
                <option value="Chilli (Guntur Teja)">Chilli (Guntur Teja)</option>
                <option value="Cotton (Bt Hybrid BG-II)">Cotton (Bt Hybrid BG-II)</option>
              </select>
            </div>

            <div>
              <label className="block text-mutedgrey font-medium mb-1.5">
                {t('intelligence.yieldTab.location')}
              </label>
              <input
                type="text"
                value={inputs.location}
                onChange={(e) => setInputs({ ...inputs, location: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-charcoal focus:ring-1 focus:ring-forest-900"
                required
              />
            </div>

            <div>
              <label className="block text-mutedgrey font-medium mb-1.5">
                {t('intelligence.yieldTab.area')}
              </label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="100"
                value={inputs.area}
                onChange={(e) => setInputs({ ...inputs, area: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-charcoal focus:ring-1 focus:ring-forest-900"
                required
              />
            </div>

            <div>
              <label className="block text-mutedgrey font-medium mb-1.5">
                {t('intelligence.yieldTab.season')}
              </label>
              <select
                value={inputs.season}
                onChange={(e) => setInputs({ ...inputs, season: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-charcoal bg-white focus:ring-1 focus:ring-forest-900"
              >
                <option value="Kharif">Kharif (Monsoon)</option>
                <option value="Rabi">Rabi (Post-monsoon)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-mutedgrey font-medium mb-1.5">
                {t('intelligence.yieldTab.history')}
              </label>
              <input
                type="text"
                value={inputs.history}
                onChange={(e) => setInputs({ ...inputs, history: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-charcoal focus:ring-1 focus:ring-forest-900"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs flex items-center gap-2 shadow-subtle transition-all"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Calculating Model Projection...</span>
                </>
              ) : (
                <>
                  <Calculator className="w-4 h-4 text-forest-300" />
                  <span>{t('intelligence.yieldTab.predictBtn')}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </Card>

      {/* Yield Prediction Results */}
      {prediction && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Estimate Card */}
          <div className="lg:col-span-5">
            <Card
              title="Estimated Harvest Volume"
              subtitle={`For ${inputs.area} Acres of ${inputs.crop}`}
              className="border-forest-200 bg-forest-50/20"
            >
              <div className="text-center py-4 space-y-2">
                <span className="text-xs font-semibold text-mutedgrey uppercase tracking-wider block">
                  {t('intelligence.yieldTab.resultEstimatedYield')}
                </span>
                <div className="inline-flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-forest-900">
                    {prediction.estimatedYield}
                  </span>
                  <span className="text-base font-bold text-slate-700">
                    {prediction.unit}
                  </span>
                </div>
                <p className="text-xs text-forest-800 font-medium">
                  Approx. {prediction.yieldPerAcre} Quintals / Acre
                </p>

                <div className="mt-4 pt-3 border-t border-forest-100 text-left space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-mutedgrey font-medium">{t('intelligence.yieldTab.confidenceInterval')}:</span>
                    <span className="font-bold text-charcoal">{prediction.confidenceInterval}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Influencing Factors Card */}
          <div className="lg:col-span-7">
            <Card
              title={t('intelligence.yieldTab.factors')}
              subtitle="Feature Attribution Weights Derived from Historical Yield Datasets"
            >
              <div className="space-y-3">
                {prediction.factors.map((f, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-slate-100 bg-white flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        f.sentiment === 'positive' ? 'bg-forest-600' : 'bg-red-500'
                      }`} />
                      <span className="font-semibold text-charcoal">{f.factor}</span>
                    </div>
                    <Badge variant={f.sentiment === 'positive' ? 'success' : 'danger'} size="sm">
                      {f.impact}
                    </Badge>
                  </div>
                ))}
              </div>

              {/* Mandatory ML Disclaimer Notice */}
              <div className="mt-4 p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-[11px] text-amber-900 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>{t('intelligence.yieldTab.disclaimerNotice')}</span>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
