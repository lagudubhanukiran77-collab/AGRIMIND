import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { StatCard } from '../components/common/StatCard';
import { FarmInfoCard } from '../components/dashboard/FarmInfoCard';
import { WeatherWidget } from '../components/dashboard/WeatherWidget';
import { CropHealthCard } from '../components/dashboard/CropHealthCard';
import { RiskOverviewCard } from '../components/dashboard/RiskOverviewCard';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { QuickActions } from '../components/dashboard/QuickActions';
import { useTranslation } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';
import {
  Sprout,
  ShieldAlert,
  CloudSun,
  TrendingUp,
  Sparkles,
  Info
} from 'lucide-react';

export const Dashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [localWeather, setLocalWeather] = useState(null);

  useEffect(() => {
    let mounted = true;
    const location = user?.location || 'Andhra Pradesh & Telangana';
    apiService.getWeather(location).then(res => {
      if (mounted && res?.data) {
        setLocalWeather(res.data);
      }
    });
    return () => { mounted = false; };
  }, [user?.location]);

  const farmSizeNum = parseFloat(user?.farmSize) || 5.0;
  const currentCrop = user?.currentCrop || 'Paddy';
  const yieldPerAcre = currentCrop.toLowerCase().includes('cotton')
    ? 14
    : currentCrop.toLowerCase().includes('chilli')
    ? 18
    : 24;
  const totalEstimatedYield = Math.round(farmSizeNum * yieldPerAcre);

  const activeCropsCount = currentCrop.includes('&') ? '2 Crops' : '1 Crop';
  const activeCropsSubtext = currentCrop.includes('&')
    ? `${currentCrop} (${farmSizeNum} Ac)`
    : `${currentCrop} · Total ${farmSizeNum} Ac`;

  const weatherDisplay = localWeather
    ? `${localWeather.temperature}°C / ${localWeather.humidity}%`
    : '31°C / 68%';
  const weatherSubtext = localWeather
    ? `${localWeather.weatherCondition} in ${localWeather.location?.split(',')[0]}`
    : 'Local agro-meteorology active';
  const weatherDelta = localWeather
    ? `Rain Prob: ${localWeather.rainfallProb}%`
    : 'Rainfall Prob: 35%';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-slate-200/60">
          <div>
            <h1 className="text-2xl font-black text-charcoal tracking-tight">
              {t('dashboard.greeting')}{user?.name ? `, ${user.name}` : ''}!
            </h1>
            <p className="text-xs text-mutedgrey mt-0.5">
              {t('dashboard.overviewSubtitle')}
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-[11px] font-medium text-forest-800 bg-forest-50 px-2.5 py-1 rounded-full border border-forest-200/80 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-forest-600" />
              Regional Season: Kharif 2024
            </span>
          </div>
        </div>

        {/* Quick Actions Row */}
        <div>
          <h2 className="text-xs font-semibold text-mutedgrey uppercase tracking-wider mb-2.5">
            {t('dashboard.quickActions.title')}
          </h2>
          <QuickActions />
        </div>

        {/* Overview Statistics Grid (4 Key Metrics) */}
        <div>
          <h2 className="text-xs font-semibold text-mutedgrey uppercase tracking-wider mb-2.5">
            Key Performance Indicators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={Sprout}
              title={t('dashboard.stats.activeCrops')}
              value={activeCropsCount}
              subtext={activeCropsSubtext}
              delta="Active Parcel"
              deltaType="positive"
              iconBg="bg-forest-100"
              iconColor="text-forest-900"
            />
            <StatCard
              icon={ShieldAlert}
              title={t('dashboard.stats.cropRiskLevel')}
              value="Moderate"
              subtext="Regional agro-climatic index"
              delta="Alert Level 2/4"
              deltaType="neutral"
              iconBg="bg-amber-100"
              iconColor="text-amber-800"
            />
            <StatCard
              icon={CloudSun}
              title={t('dashboard.stats.weatherStatus')}
              value={weatherDisplay}
              subtext={weatherSubtext}
              delta={weatherDelta}
              deltaType="neutral"
              iconBg="bg-blue-100"
              iconColor="text-blue-800"
            />
            <StatCard
              icon={TrendingUp}
              title={t('dashboard.stats.estimatedYield')}
              value={`${totalEstimatedYield} Qtl`}
              subtext={`Total harvest projected across ${farmSizeNum} Ac`}
              delta="+4% above avg"
              deltaType="positive"
              iconBg="bg-emerald-100"
              iconColor="text-emerald-800"
            />
          </div>
        </div>

        {/* Primary Farm Info Card */}
        <div id="my-farm">
          <FarmInfoCard />
        </div>

        {/* Middle Dual Grid: Weather Card & Crop Health Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WeatherWidget />
          <CropHealthCard />
        </div>

        {/* Lower Dual Grid: Risk Overview & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RiskOverviewCard />
          <RecentActivity />
        </div>
      </div>
    </DashboardLayout>
  );
};
