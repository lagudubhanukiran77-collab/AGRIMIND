import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { Badge } from '../components/common/Badge';
import {
  ScanLine,
  Sprout,
  CloudSun,
  FlaskConical,
  TrendingUp,
  Bot,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
  ChevronRight,
  Layers,
  MapPin,
  Smartphone
} from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

export const Landing = () => {
  const { t, language } = useTranslation();

  const featureCards = [
    {
      icon: ScanLine,
      title: t('landing.features.disease.title'),
      desc: t('landing.features.disease.desc'),
      link: '/disease-detection',
      badge: 'Vision AI',
    },
    {
      icon: Sprout,
      title: t('landing.features.crop.title'),
      desc: t('landing.features.crop.desc'),
      link: '/crop-recommendation',
      badge: 'Soil Matching',
    },
    {
      icon: CloudSun,
      title: t('landing.features.weather.title'),
      desc: t('landing.features.weather.desc'),
      link: '/weather-intelligence',
      badge: '7-Day Radar',
    },
    {
      icon: FlaskConical,
      title: t('landing.features.soil.title'),
      desc: t('landing.features.soil.desc'),
      link: '/soil-health',
      badge: 'NPK Balance',
    },
    {
      icon: TrendingUp,
      title: t('landing.features.yield.title'),
      desc: t('landing.features.yield.desc'),
      link: '/yield-prediction',
      badge: 'ML Yield Forecast',
    },
    {
      icon: Bot,
      title: t('landing.features.assistant.title'),
      desc: t('landing.features.assistant.desc'),
      link: '/assistant',
      badge: 'తెలుగు · हिन्दी · English',
    },
  ];

  const steps = t('landing.steps') || [];

  return (
    <div className="min-h-screen bg-offwhite flex flex-col font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <section id="home" className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden border-b border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Region Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-50 border border-forest-200/90 text-forest-900 text-xs font-semibold shadow-subtle">
                <Sparkles className="w-3.5 h-3.5 text-forest-600" />
                <span>{t('landing.heroBadge')}</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-charcoal tracking-tight leading-[1.15]">
                {t('landing.heroHeadline')}
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                {t('landing.heroDescription')}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <NavLink
                  to="/dashboard"
                  className="px-7 py-3.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-card hover:shadow-hover transition-all"
                >
                  <span>{t('landing.primaryCta')}</span>
                  <ArrowRight className="w-4 h-4 text-forest-300" />
                </NavLink>

                <a
                  href="#features"
                  className="px-7 py-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-charcoal font-semibold text-sm text-center transition-colors"
                >
                  {t('landing.secondaryCta')}
                </a>
              </div>

              {/* Micro stats banner */}
              <div className="pt-6 border-t border-slate-100 grid grid-cols-3 gap-4 text-left">
                <div>
                  <span className="text-2xl font-black text-forest-900 block">94.2%</span>
                  <span className="text-[11px] text-mutedgrey block font-medium">Vision Accuracy</span>
                </div>
                <div>
                  <span className="text-2xl font-black text-forest-900 block">3 Languages</span>
                  <span className="text-[11px] text-mutedgrey block font-medium">Telugu, Hindi, EN</span>
                </div>
                <div>
                  <span className="text-2xl font-black text-forest-900 block">3 Core Crops</span>
                  <span className="text-[11px] text-mutedgrey block font-medium">Paddy, Chilli, Cotton</span>
                </div>
              </div>
            </div>

            {/* Right Visual (5 Cols): Realistic Indian Farmer using Smartphone in Green Field with Subtle UI Telemetry */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-hover border border-slate-200 bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=900&q=80"
                  alt="Indian farmer inspecting crop with smartphone in green lush field"
                  className="w-full h-[420px] sm:h-[480px] object-cover"
                />

                {/* Subtle telemetry overlays without clutter */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-slate-200/80 shadow-card max-w-[200px]">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-forest-900">
                    <span className="w-2 h-2 rounded-full bg-forest-500 animate-pulse" />
                    <span>Real-time Field Scan</span>
                  </div>
                  <p className="text-xs font-bold text-charcoal mt-1">Paddy Field · Plot 1A</p>
                  <p className="text-[10px] text-mutedgrey">Vegetative Stage · NDVI 0.78</p>
                </div>

                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-slate-200/80 shadow-card max-w-[220px]">
                  <div className="flex items-center justify-between text-[11px] font-bold text-charcoal">
                    <span>Weather Threat</span>
                    <Badge variant="warning" size="sm">Moderate</Badge>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    45mm rain expected in 48h. Microclimate blast risk flagged.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION (6 CARDS) */}
      <section id="features" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <Badge variant="forest" size="md">
            Product Modules
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-black text-charcoal tracking-tight">
            {t('landing.featureHeading')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t('landing.featureSubheading')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <NavLink
                key={idx}
                to={feat.link}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle hover:shadow-card hover:border-forest-600 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-900 border border-forest-100 flex items-center justify-center group-hover:bg-forest-900 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-charcoal group-hover:text-forest-900 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-forest-800 group-hover:text-forest-900">
                  <span>{t('landing.features.learnMore')}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </NavLink>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS SECTION (4 STEPS) */}
      <section id="how-it-works" className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-charcoal tracking-tight">
              {t('landing.howItWorksTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {t('landing.howItWorksSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-slate-200 bg-slate-50/40 relative">
                <span className="text-3xl font-black text-forest-900/30 block mb-2 font-mono">
                  {st.num}
                </span>
                <h4 className="font-bold text-charcoal text-sm mb-1.5">{st.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUPPORTED CROPS SECTION */}
      <section id="supported-crops" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <Badge variant="forest" size="md">Regional Calibrations</Badge>
          <h2 className="text-2xl sm:text-3xl font-black text-charcoal tracking-tight">
            {t('landing.cropsTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {t('landing.cropsSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Paddy */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-subtle hover:shadow-card transition-all">
            <img
              src="https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=600&q=80"
              alt="Paddy field in India"
              className="w-full h-48 object-cover"
            />
            <div className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-charcoal text-base">
                  {t('landing.crops.paddy.name')}
                </h3>
                <span className="text-xs text-forest-800 font-semibold bg-forest-50 px-2 py-0.5 rounded">
                  {t('landing.crops.paddy.season')}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('landing.crops.paddy.desc')}
              </p>
              <div className="pt-2 text-[11px] font-mono text-mutedgrey">
                Regional: {t('landing.crops.paddy.teluguName')} / {t('landing.crops.paddy.hindiName')}
              </div>
            </div>
          </div>

          {/* Chilli */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-subtle hover:shadow-card transition-all">
            <img
              src="https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80"
              alt="Chilli crop in Guntur/Telangana"
              className="w-full h-48 object-cover"
            />
            <div className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-charcoal text-base">
                  {t('landing.crops.chilli.name')}
                </h3>
                <span className="text-xs text-forest-800 font-semibold bg-forest-50 px-2 py-0.5 rounded">
                  {t('landing.crops.chilli.season')}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('landing.crops.chilli.desc')}
              </p>
              <div className="pt-2 text-[11px] font-mono text-mutedgrey">
                Regional: {t('landing.crops.chilli.teluguName')} / {t('landing.crops.chilli.hindiName')}
              </div>
            </div>
          </div>

          {/* Cotton */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-subtle hover:shadow-card transition-all">
            <img
              src="https://images.unsplash.com/photo-1594498653385-d5172c532c00?auto=format&fit=crop&w=600&q=80"
              alt="Cotton crop in black soil Telangana"
              className="w-full h-48 object-cover"
            />
            <div className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-charcoal text-base">
                  {t('landing.crops.cotton.name')}
                </h3>
                <span className="text-xs text-forest-800 font-semibold bg-forest-50 px-2 py-0.5 rounded">
                  {t('landing.crops.cotton.season')}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('landing.crops.cotton.desc')}
              </p>
              <div className="pt-2 text-[11px] font-mono text-mutedgrey">
                Regional: {t('landing.crops.cotton.teluguName')} / {t('landing.crops.cotton.hindiName')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section id="about" className="py-16 bg-forest-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {t('landing.impactTitle')}
            </h2>
            <p className="text-forest-200 text-xs sm:text-sm">
              {t('landing.impactSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t('landing.impactPoints')?.map((pt, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-forest-800/60 border border-forest-700/80 space-y-2">
                <h4 className="font-bold text-base text-white">{pt.title}</h4>
                <p className="text-xs text-forest-200 leading-relaxed">{pt.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <NavLink
              to="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-forest-900 hover:bg-forest-50 font-extrabold text-sm shadow-card transition-colors"
            >
              <span>Open Farmer Dashboard</span>
              <ArrowRight className="w-4 h-4 text-forest-900" />
            </NavLink>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
