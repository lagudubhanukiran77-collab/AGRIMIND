import React, { useState, useEffect } from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Sprout, CheckCircle2, AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';
import { apiService } from '../../services/api';
import { useTranslation } from '../../i18n/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export const CropRecommendationTab = () => {
  const { t, language } = useTranslation();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    location: user?.location || 'Andhra Pradesh & Telangana',
    soilType: 'Black Cotton Soil (Deep Clay)',
    soilPh: '7.2',
    nitrogen: '85',
    phosphorus: '42',
    potassium: '38',
    season: 'Kharif',
    water: 'Borewell & Canal Irrigated',
  });

  useEffect(() => {
    if (user?.location) {
      setFormData(prev => ({ ...prev, location: user.location }));
    }
  }, [user?.location]);

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await apiService.recommendCrop(formData);
    setTimeout(() => {
      setResults(res.data.recommendations);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Input Form Card */}
      <Card
        title={t('intelligence.tabs.cropRec')}
        subtitle="Multi-factor Agronomic Matching Algorithm"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* Location */}
            <div>
              <label className="block text-mutedgrey font-medium mb-1.5">
                {t('intelligence.cropForm.location')}
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-charcoal focus:ring-1 focus:ring-forest-900"
                required
              />
            </div>

            {/* Soil Type */}
            <div>
              <label className="block text-mutedgrey font-medium mb-1.5">
                {t('intelligence.cropForm.soilType')}
              </label>
              <select
                value={formData.soilType}
                onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-charcoal focus:ring-1 focus:ring-forest-900 bg-white"
              >
                <option value="Black Cotton Soil (Deep Clay)">Black Cotton Soil (Deep Clay)</option>
                <option value="Red Loamy Soil (Chalka)">Red Loamy Soil (Chalka)</option>
                <option value="Alluvial Riverine Soil">Alluvial Riverine Soil</option>
                <option value="Sandy Loam">Sandy Loam</option>
              </select>
            </div>

            {/* Soil pH */}
            <div>
              <label className="block text-mutedgrey font-medium mb-1.5">
                {t('intelligence.cropForm.soilPh')}
              </label>
              <input
                type="number"
                step="0.1"
                min="4"
                max="10"
                value={formData.soilPh}
                onChange={(e) => setFormData({ ...formData, soilPh: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-charcoal focus:ring-1 focus:ring-forest-900"
                required
              />
            </div>

            {/* Season */}
            <div>
              <label className="block text-mutedgrey font-medium mb-1.5">
                {t('intelligence.cropForm.season')}
              </label>
              <select
                value={formData.season}
                onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-charcoal focus:ring-1 focus:ring-forest-900 bg-white"
              >
                <option value="Kharif">Kharif (Monsoon - Jun to Nov)</option>
                <option value="Rabi">Rabi (Winter - Oct to Mar)</option>
                <option value="Zaid">Zaid (Summer - Mar to May)</option>
              </select>
            </div>

            {/* Nitrogen N */}
            <div>
              <label className="block text-mutedgrey font-medium mb-1.5">
                {t('intelligence.cropForm.nitrogen')}
              </label>
              <input
                type="number"
                value={formData.nitrogen}
                onChange={(e) => setFormData({ ...formData, nitrogen: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-charcoal focus:ring-1 focus:ring-forest-900"
                required
              />
            </div>

            {/* Phosphorus P */}
            <div>
              <label className="block text-mutedgrey font-medium mb-1.5">
                {t('intelligence.cropForm.phosphorus')}
              </label>
              <input
                type="number"
                value={formData.phosphorus}
                onChange={(e) => setFormData({ ...formData, phosphorus: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-charcoal focus:ring-1 focus:ring-forest-900"
                required
              />
            </div>

            {/* Potassium K */}
            <div>
              <label className="block text-mutedgrey font-medium mb-1.5">
                {t('intelligence.cropForm.potassium')}
              </label>
              <input
                type="number"
                value={formData.potassium}
                onChange={(e) => setFormData({ ...formData, potassium: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-charcoal focus:ring-1 focus:ring-forest-900"
                required
              />
            </div>

            {/* Water availability */}
            <div>
              <label className="block text-mutedgrey font-medium mb-1.5">
                {t('intelligence.cropForm.water')}
              </label>
              <select
                value={formData.water}
                onChange={(e) => setFormData({ ...formData, water: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-charcoal focus:ring-1 focus:ring-forest-900 bg-white"
              >
                <option value="Borewell & Canal Irrigated">Borewell & Canal Irrigated</option>
                <option value="Assured Drip Irrigation">Assured Drip Irrigation</option>
                <option value="Rainfed Only (Limited Water)">Rainfed Only (Limited Water)</option>
              </select>
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
                  <span>Calculating Matching Scores...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-forest-300" />
                  <span>{t('intelligence.cropForm.submit')}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </Card>

      {/* Results Section */}
      {results && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider">
              {t('intelligence.cropForm.resultsTitle')}
            </h3>
            <span className="text-xs text-mutedgrey">
              3 Candidates Evaluated for Soil pH {formData.soilPh}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {results.map((crop, idx) => {
              const displayName = language === 'te' && crop.teluguName
                ? crop.teluguName
                : language === 'hi' && crop.hindiName
                ? crop.hindiName
                : crop.name;

              return (
                <div
                  key={idx}
                  className={`p-5 rounded-xl bg-white border transition-all flex flex-col justify-between ${
                    idx === 0
                      ? 'border-forest-600 ring-1 ring-forest-600/30 shadow-card'
                      : 'border-slate-200 shadow-subtle'
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        {idx === 0 && (
                          <Badge variant="forest" size="sm" className="mb-1.5">
                            Highest Match
                          </Badge>
                        )}
                        <h4 className="font-bold text-charcoal text-base">
                          {displayName}
                        </h4>
                        <p className="text-[11px] text-mutedgrey mt-0.5">
                          Duration: {crop.duration}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xl font-black text-forest-900">
                          {crop.suitability}%
                        </span>
                        <p className="text-[9px] uppercase tracking-wider font-semibold text-mutedgrey">
                          Suitability
                        </p>
                      </div>
                    </div>

                    {/* Reasons */}
                    <div className="mt-3 space-y-1.5 text-xs text-slate-700">
                      <p className="font-semibold text-charcoal text-[11px] uppercase tracking-wider">
                        {t('intelligence.cropForm.reasons')}:
                      </p>
                      {crop.reasons.map((r, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-forest-600 shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>

                    {/* Limitations */}
                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-1 text-xs">
                      <p className="font-semibold text-amber-800 text-[11px] uppercase tracking-wider">
                        {t('intelligence.cropForm.limitations')}:
                      </p>
                      {crop.limitations.map((lim, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                          <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0 mt-0.5" />
                          <span>{lim}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-mutedgrey">Yield Potential:</span>
                    <span className="font-bold text-forest-900">{crop.expectedYield}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
