import React, { useEffect, useState } from 'react';
import { Card } from '../common/Card';
import { CloudSun, Droplets, Wind, CloudRain, Sun, Compass } from 'lucide-react';
import { apiService } from '../../services/api';
import { useTranslation } from '../../i18n/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export const WeatherWidget = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const location = user?.location || 'Andhra Pradesh & Telangana';
    apiService.getWeather(location).then(res => {
      if (mounted) {
        setWeather(res.data);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, [user?.location]);

  if (loading || !weather) {
    return (
      <Card title={t('dashboard.weatherCard.title')}>
        <div className="h-44 flex items-center justify-center text-xs text-mutedgrey animate-pulse">
          Loading weather telemetry...
        </div>
      </Card>
    );
  }

  return (
    <Card
      title={t('dashboard.weatherCard.title')}
      subtitle={`${weather.location} · 7-Day Outlook`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-50 rounded-xl text-forest-800">
            <CloudSun className="w-8 h-8 text-forest-700" />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-charcoal">{weather.temperature}°C</span>
              <span className="text-xs text-mutedgrey">/ 22°C</span>
            </div>
            <p className="text-xs font-medium text-slate-700">{weather.weatherCondition}</p>
          </div>
        </div>

        {/* Micro metrics */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <Droplets className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span className="text-mutedgrey">{t('dashboard.weatherCard.humidity')}:</span>
            <span className="font-semibold text-charcoal">{weather.humidity}%</span>
          </div>
          <div className="flex items-center gap-2">
            <CloudRain className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span className="text-mutedgrey">{t('dashboard.weatherCard.rainfallProb')}:</span>
            <span className="font-semibold text-charcoal">{weather.rainfallProb}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="text-mutedgrey">{t('dashboard.weatherCard.windSpeed')}:</span>
            <span className="font-semibold text-charcoal">{weather.windSpeed} km/h</span>
          </div>
          <div className="flex items-center gap-2">
            <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="text-mutedgrey">UV Index:</span>
            <span className="font-semibold text-charcoal">{weather.uvIndex} (Moderate)</span>
          </div>
        </div>
      </div>

      {/* 7-Day Mini strip */}
      <div className="mt-4">
        <p className="text-[11px] font-semibold text-mutedgrey uppercase tracking-wider mb-2">
          {t('dashboard.weatherCard.forecastSummary')}
        </p>
        <div className="grid grid-cols-7 gap-1 text-center">
          {weather.forecast.map((item, idx) => (
            <div
              key={idx}
              className={`p-1.5 rounded-lg border transition-colors ${
                idx === 0 ? 'bg-forest-50/60 border-forest-200 font-semibold' : 'bg-slate-50/50 border-slate-100'
              }`}
            >
              <p className="text-[10px] text-mutedgrey truncate">{item.day}</p>
              <div className="my-1 flex justify-center">
                {item.icon === 'cloud-rain' ? (
                  <CloudRain className="w-4 h-4 text-blue-600" />
                ) : item.icon === 'sun' ? (
                  <Sun className="w-4 h-4 text-amber-500" />
                ) : (
                  <CloudSun className="w-4 h-4 text-slate-600" />
                )}
              </div>
              <p className="text-[10px] text-charcoal font-medium">{item.rain}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Advisory bar */}
      <div className="mt-3.5 p-2 bg-emerald-50/50 rounded-lg border border-forest-100 text-[11px] text-forest-900 flex items-start gap-2">
        <span className="font-semibold shrink-0">Field Advisory:</span>
        <span className="opacity-90">{weather.advisory}</span>
      </div>
    </Card>
  );
};
