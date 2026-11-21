import React, { useEffect, useState } from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import {
  CloudSun,
  Droplets,
  Wind,
  CloudRain,
  Sun,
  AlertTriangle,
  ShieldCheck,
  Compass,
  Thermometer
} from 'lucide-react';
import { apiService } from '../../services/api';
import { useTranslation } from '../../i18n/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const WeatherIntelligenceTab = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const loc = user?.location || 'Andhra Pradesh & Telangana';
    apiService.getWeather(loc).then((res) => {
      setWeatherData(res.data);
    });
  }, [user?.location]);

  if (!weatherData) return null;

  const tempChartData = weatherData.forecast ? weatherData.forecast.map((item, idx) => {
    const maxTemp = parseInt(item.temp.split('°')[0]) || weatherData.temperature;
    const rainNum = parseInt(item.rain.replace('%', '')) || weatherData.rainfallProb;
    return {
      day: item.day,
      max: maxTemp,
      min: maxTemp - 9,
      rain: rainNum
    };
  }) : [
    { day: 'Mon', max: weatherData.temperature, min: weatherData.temperature - 9, rain: weatherData.rainfallProb },
    { day: 'Tue', max: weatherData.temperature - 1, min: weatherData.temperature - 10, rain: weatherData.rainfallProb },
  ];

  return (
    <div className="space-y-6">
      {/* 4 Weather Parameter Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-subtle flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-mutedgrey uppercase tracking-wider block">
              {t('intelligence.weatherTab.temp')}
            </span>
            <span className="text-2xl font-bold text-charcoal mt-1 block">{weatherData.temperature}°C</span>
            <span className="text-[10px] text-mutedgrey">Feels like {weatherData.temperature + 3}°C</span>
          </div>
          <div className="p-2.5 rounded-lg bg-amber-50 text-amber-700">
            <Thermometer className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-subtle flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-mutedgrey uppercase tracking-wider block">
              {t('intelligence.weatherTab.humidity')}
            </span>
            <span className="text-2xl font-bold text-charcoal mt-1 block">{weatherData.humidity}%</span>
            <span className="text-[10px] text-forest-700">Dew point: {weatherData.temperature - 8}°C</span>
          </div>
          <div className="p-2.5 rounded-lg bg-blue-50 text-blue-700">
            <Droplets className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-subtle flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-mutedgrey uppercase tracking-wider block">
              {t('intelligence.weatherTab.rainfall')}
            </span>
            <span className="text-2xl font-bold text-charcoal mt-1 block">{weatherData.rainfallProb}%</span>
            <span className="text-[10px] text-amber-700">Probability today</span>
          </div>
          <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-700">
            <CloudRain className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-subtle flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-mutedgrey uppercase tracking-wider block">
              {t('intelligence.weatherTab.windSpeed')}
            </span>
            <span className="text-2xl font-bold text-charcoal mt-1 block">{weatherData.windSpeed} km/h</span>
            <span className="text-[10px] text-mutedgrey">UV Index: {weatherData.uvIndex}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-100 text-slate-700">
            <Wind className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 7-Day Temperature & Rain Forecast Chart */}
      <Card
        title={t('intelligence.weatherTab.forecast7Day')}
        subtitle={`${weatherData.location} · 7-Day Temperature Trend (°C) & Precipitation Probability (%)`}
      >
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={tempChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14532D" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#14532D" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="max" stroke="#14532D" strokeWidth={2} fillOpacity={1} fill="url(#tempGradient)" name="Max Temp (°C)" />
              <Area type="monotone" dataKey="rain" stroke="#3b82f6" strokeWidth={2} fillOpacity={0} name="Rain Prob (%)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Weather Risk Indicators Grid */}
      <Card
        title={t('intelligence.weatherTab.risksTitle')}
        subtitle="Agro-Meteorological Threat Index"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/30">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs text-charcoal">Precipitation Spike</span>
              <Badge variant="warning" size="sm">Moderate</Badge>
            </div>
            <p className="text-xs text-slate-600 leading-snug">
              Heavy 45mm spell forecasted on Day 2 & 3. Ensure surface drainage in low-lying Paddy blocks to avoid lodging.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/30">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs text-charcoal">Fungal Spore Risk</span>
              <Badge variant="warning" size="sm">High Alert</Badge>
            </div>
            <p className="text-xs text-slate-600 leading-snug">
              Relative humidity lingering above 68% with dew favors blast and fungal blight spore proliferation on foliage.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs text-charcoal">Heat Stress Risk</span>
              <Badge variant="success" size="sm">Low Risk</Badge>
            </div>
            <p className="text-xs text-slate-600 leading-snug">
              Maximum temperatures ranging 28°C - 33°C remain within optimal physiological thresholds for Kharif crops.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
