import React from 'react';
import { Leaf, Mail, Phone, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { useTranslation } from '../../i18n/LanguageContext';
import { NavLink } from 'react-router-dom';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-charcoal text-slate-300 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: Identity & Bio (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-forest-800 text-white flex items-center justify-center">
                <Leaf className="w-4 h-4 text-forest-300" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white font-sans">
                AGRI<span className="text-forest-400">-MIND</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {t('app.fullName')}. Dedicated to bridging the digital divide for smallholder farmers across Andhra Pradesh and Telangana through edge AI, localized agronomy, and mother-tongue advisory.
            </p>
            <div className="flex items-center gap-2 text-forest-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-forest-400" />
              <span>Aligned with ICAR, ANGRAU & PJTSAU extension practices</span>
            </div>
          </div>

          {/* Column 2: Core Solutions */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Intelligence Suite
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <NavLink to="/disease-detection" className="hover:text-forest-400 transition-colors">
                  Crop Disease Vision
                </NavLink>
              </li>
              <li>
                <NavLink to="/crop-recommendation" className="hover:text-forest-400 transition-colors">
                  Soil NPK Matching
                </NavLink>
              </li>
              <li>
                <NavLink to="/weather-intelligence" className="hover:text-forest-400 transition-colors">
                  7-Day Weather Risk
                </NavLink>
              </li>
              <li>
                <NavLink to="/yield-prediction" className="hover:text-forest-400 transition-colors">
                  Yield Projection Models
                </NavLink>
              </li>
              <li>
                <NavLink to="/assistant" className="hover:text-forest-400 transition-colors">
                  Telugu/Hindi Assistant
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Column 3: Regional Crops */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Focus Crops
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <span className="block text-slate-200">Paddy (Rice / వరి / धान)</span>
                <span className="text-[10px] text-slate-500">Blast, Sheath Blight, Water AWD</span>
              </li>
              <li>
                <span className="block text-slate-200">Chilli (మిరప / मिर्च)</span>
                <span className="text-[10px] text-slate-500">Leaf Curl Virus, Anthracnose, Thrips</span>
              </li>
              <li>
                <span className="block text-slate-200">Cotton (పత్తి / कपास)</span>
                <span className="text-[10px] text-slate-500">Bacterial Blight, Bollworm Alert</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Extension */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Agri-Extension Connect
            </h4>
            <div className="space-y-2.5 text-slate-400 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-forest-400 shrink-0 mt-0.5" />
                <span>Warangal & Guntur Field Agronomy Corridors</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-forest-400 shrink-0" />
                <span>support@agrimind.ai</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-forest-400 shrink-0" />
                <span>Toll-Free Kisan Help: 1800-180-1551</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer & Bottom Strip */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p className="text-center md:text-left max-w-2xl leading-relaxed">
            {t('landing.footerDisclaimer')}
          </p>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-slate-300">Privacy Policy</a>
            <span>·</span>
            <a href="#terms" className="hover:text-slate-300">Terms of Service</a>
            <span>·</span>
            <span>© 2024 AGRI-MIND. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
