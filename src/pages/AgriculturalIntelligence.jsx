import React from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { CropRecommendationTab } from '../components/intelligence/CropRecommendationTab';
import { WeatherIntelligenceTab } from '../components/intelligence/WeatherIntelligenceTab';
import { SoilHealthTab } from '../components/intelligence/SoilHealthTab';
import { YieldPredictionTab } from '../components/intelligence/YieldPredictionTab';
import { RiskAssessmentTab } from '../components/intelligence/RiskAssessmentTab';
import { useTranslation } from '../i18n/LanguageContext';
import { Sprout, CloudSun, FlaskConical, TrendingUp, ShieldAlert, Sparkles } from 'lucide-react';

export const AgriculturalIntelligence = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Determine active section from pathname or fallback to ?tab=...
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/crop-recommendation') return 'cropRec';
    if (path === '/weather-intelligence') return 'weather';
    if (path === '/soil-health') return 'soil';
    if (path === '/yield-prediction') return 'yield';
    if (path === '/reports') return 'risk';

    const tab = searchParams.get('tab');
    if (tab === 'weather') return 'weather';
    if (tab === 'soil') return 'soil';
    if (tab === 'yield') return 'yield';
    if (tab === 'risk') return 'risk';
    return 'cropRec';
  };

  const activeTab = getActiveTab();

  const handleTabChange = (tabKey) => {
    const routeMap = {
      cropRec: '/crop-recommendation',
      weather: '/weather-intelligence',
      soil: '/soil-health',
      yield: '/yield-prediction',
      risk: '/reports',
    };
    navigate(routeMap[tabKey] || '/crop-recommendation');
  };

  const tabs = [
    { key: 'cropRec', label: t('intelligence.tabs.cropRec'), icon: Sprout },
    { key: 'weather', label: t('intelligence.tabs.weather'), icon: CloudSun },
    { key: 'soil', label: t('intelligence.tabs.soil'), icon: FlaskConical },
    { key: 'yield', label: t('intelligence.tabs.yield'), icon: TrendingUp },
    { key: 'risk', label: t('intelligence.tabs.risk'), icon: ShieldAlert },
  ];

  // Section specific metadata for the page header
  const sectionMeta = {
    cropRec: {
      title: t('intelligence.tabs.cropRec'),
      subtitle: t('landing.features.crop.desc'),
      icon: Sprout,
      badge: 'Soil-Matching Algorithm',
    },
    weather: {
      title: t('intelligence.tabs.weather'),
      subtitle: t('landing.features.weather.desc'),
      icon: CloudSun,
      badge: '7-Day Radar & Risk Alert',
    },
    soil: {
      title: t('intelligence.tabs.soil'),
      subtitle: t('landing.features.soil.desc'),
      icon: FlaskConical,
      badge: 'ICAR / ANGRAU Soil Profiles',
    },
    yield: {
      title: t('intelligence.tabs.yield'),
      subtitle: t('landing.features.yield.desc'),
      icon: TrendingUp,
      badge: 'ML Harvest Projection',
    },
    risk: {
      title: t('intelligence.tabs.risk'),
      subtitle: t('intelligence.riskTab.subtitle'),
      icon: ShieldAlert,
      badge: 'Multi-Vector Risk Audit',
    },
  };

  const currentMeta = sectionMeta[activeTab] || sectionMeta.cropRec;
  const HeaderIcon = currentMeta.icon;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Dynamic Page Header reflecting the exact active feature */}
        <div className="pb-3 border-b border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-forest-100 rounded-lg text-forest-900">
                <HeaderIcon className="w-5 h-5 text-forest-700" />
              </div>
              <h1 className="text-2xl font-black text-charcoal tracking-tight">
                {currentMeta.title}
              </h1>
            </div>
            <p className="text-xs text-mutedgrey mt-1">
              {currentMeta.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-forest-800 bg-forest-50 px-2.5 py-1 rounded-full border border-forest-200/80 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-forest-600" />
              {currentMeta.badge}
            </span>
          </div>
        </div>

        {/* Five Navigation Tabs for Switching Between Intelligence Modules */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200/80 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-forest-900 text-white shadow-subtle'
                    : 'text-slate-600 hover:text-charcoal hover:bg-slate-100 bg-white border border-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-forest-300' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Rendering */}
        <div>
          {activeTab === 'cropRec' && <CropRecommendationTab />}
          {activeTab === 'weather' && <WeatherIntelligenceTab />}
          {activeTab === 'soil' && <SoilHealthTab />}
          {activeTab === 'yield' && <YieldPredictionTab />}
          {activeTab === 'risk' && <RiskAssessmentTab />}
        </div>
      </div>
    </DashboardLayout>
  );
};
