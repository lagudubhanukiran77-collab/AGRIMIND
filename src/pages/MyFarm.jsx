import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../i18n/LanguageContext';
import { NavLink } from 'react-router-dom';
import {
  Compass,
  MapPin,
  Sprout,
  Droplets,
  Calendar,
  Layers,
  ShieldCheck,
  Edit3,
  Check,
  ScanLine,
  ArrowRight,
  TrendingUp,
  Cpu
} from 'lucide-react';

export const MyFarm = () => {
  const { user, updateProfile } = useAuth();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || 'Farmer',
    location: user?.location || 'Andhra Pradesh & Telangana',
    village: user?.village || `${user?.district || 'Regional'} Farmland`,
    farmSize: user?.farmSize || '5.0',
    soilType: user?.soilType || 'Deep Black Cotton Clay (Vertisol)',
    irrigationType: user?.irrigationType || 'Borewell & Solar Drip Network',
    surveyNumber: user?.surveyNumber || `Sy. No. ${user?.mobile ? user.mobile.slice(-3) : '108'}/1`,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || 'Farmer',
        location: user.location || 'Andhra Pradesh & Telangana',
        village: user.village || `${user.district || 'Regional'} Farmland`,
        farmSize: user.farmSize || '5.0',
        soilType: user.soilType || 'Deep Black Cotton Clay (Vertisol)',
        irrigationType: user.irrigationType || 'Borewell & Solar Drip Network',
        surveyNumber: user.surveyNumber || `Sy. No. ${user.mobile ? user.mobile.slice(-3) : '108'}/1`,
      });
    }
  }, [user]);

  const farmSizeNum = parseFloat(formData.farmSize) || 5.0;
  const currentCrop = user?.currentCrop || 'Paddy';

  const parcels = currentCrop.includes('&')
    ? [
        {
          id: 'block-a',
          name: 'Block A (North Parcel)',
          crop: 'Paddy (Telangana Sona / RNR 15048)',
          area: `${(farmSizeNum * 0.6).toFixed(1)} Acres`,
          soil: 'Heavy Black Clay with high water retention',
          stage: 'Vegetative Tillering (42 Days After Sowing)',
          sownDate: user?.sowingDate || '14 July 2024',
          irrigation: 'Alternate Wetting & Drying via Borewell #1',
          vigor: '88/100 (Optimal)',
          riskLevel: 'Moderate (Fungal Blast advisory active)',
          riskVariant: 'warning',
          nextAction: 'Nitrogen second split top-dressing scheduled in 4 days',
        },
        {
          id: 'block-b',
          name: 'Block B (South Ridge)',
          crop: 'Chilli (Guntur Teja Hybrid)',
          area: `${(farmSizeNum * 0.4).toFixed(1)} Acres`,
          soil: 'Well-drained Medium-Black Loam',
          stage: 'Early Vegetative Branching (28 Days After Transplanting)',
          sownDate: '02 August 2024',
          irrigation: 'Automated Drip Fertigation (2 Litres/hr)',
          vigor: '92/100 (High)',
          riskLevel: 'Low (Pest traps active)',
          riskVariant: 'success',
          nextAction: 'Inspect yellow sticky traps for thrips vector count',
        }
      ]
    : [
        {
          id: 'block-1',
          name: 'Block 1 (Primary Field)',
          crop: `${currentCrop} (High Yielding Variety)`,
          area: `${(farmSizeNum * 0.65).toFixed(1)} Acres`,
          soil: formData.soilType,
          stage: user?.growthStage || 'Vegetative Growth Phase',
          sownDate: user?.sowingDate || '15 July 2024',
          irrigation: formData.irrigationType,
          vigor: '91/100 (Strong Canopy Vigor)',
          riskLevel: 'Low (Healthy Profile)',
          riskVariant: 'success',
          nextAction: 'Routine crop scouting and scheduled micronutrient application',
        },
        {
          id: 'block-2',
          name: 'Block 2 (Secondary Parcel)',
          crop: `${currentCrop} (Crop Rotation Block)`,
          area: `${(farmSizeNum * 0.35).toFixed(1)} Acres`,
          soil: 'Medium Clay Loam',
          stage: user?.growthStage || 'Vegetative Stage',
          sownDate: user?.sowingDate || '20 July 2024',
          irrigation: formData.irrigationType,
          vigor: '86/100 (Normal Vigor)',
          riskLevel: 'Moderate (Monitor Moisture)',
          riskVariant: 'warning',
          nextAction: 'Check soil moisture tension before next irrigation cycle',
        }
      ];

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="pb-3 border-b border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-forest-100 rounded-lg text-forest-900">
                <Compass className="w-5 h-5 text-forest-700" />
              </div>
              <h1 className="text-2xl font-black text-charcoal tracking-tight">
                {t('nav.myFarm')}
              </h1>
            </div>
            <p className="text-xs text-mutedgrey mt-1">
              Field cadastral parcels, irrigation infrastructure, and soil records.
            </p>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="self-start sm:self-auto px-4 py-2 rounded-xl border border-slate-200 hover:bg-white text-charcoal font-semibold text-xs flex items-center gap-2 shadow-subtle transition-colors"
          >
            {isEditing ? <Check className="w-4 h-4 text-forest-700" /> : <Edit3 className="w-4 h-4 text-slate-500" />}
            <span>{isEditing ? 'Cancel Edit' : 'Edit Farm Records'}</span>
          </button>
        </div>

        {/* Primary Farm Profile Summary */}
        <Card title="Cadastral Farm Master Record" subtitle={`Location: ${formData.location} · Profile Active`}>
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-mutedgrey font-medium mb-1">Farmer Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-charcoal focus:ring-1 focus:ring-forest-900"
                  />
                </div>
                <div>
                  <label className="block text-mutedgrey font-medium mb-1">District / State</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-charcoal focus:ring-1 focus:ring-forest-900"
                  />
                </div>
                <div>
                  <label className="block text-mutedgrey font-medium mb-1">Total Acreage (Acres)</label>
                  <input
                    type="text"
                    value={formData.farmSize}
                    onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-charcoal focus:ring-1 focus:ring-forest-900"
                  />
                </div>
                <div>
                  <label className="block text-mutedgrey font-medium mb-1">Survey Number</label>
                  <input
                    type="text"
                    value={formData.surveyNumber}
                    onChange={(e) => setFormData({ ...formData, surveyNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-charcoal focus:ring-1 focus:ring-forest-900"
                  />
                </div>
                <div>
                  <label className="block text-mutedgrey font-medium mb-1">Soil Classification</label>
                  <input
                    type="text"
                    value={formData.soilType}
                    onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-charcoal focus:ring-1 focus:ring-forest-900"
                  />
                </div>
                <div>
                  <label className="block text-mutedgrey font-medium mb-1">Irrigation System</label>
                  <input
                    type="text"
                    value={formData.irrigationType}
                    onChange={(e) => setFormData({ ...formData, irrigationType: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-charcoal focus:ring-1 focus:ring-forest-900"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-forest-900 text-white font-bold hover:bg-forest-800"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-mutedgrey text-[11px] block">Registered Grower:</span>
                <span className="font-bold text-charcoal mt-0.5 block">{formData.name}</span>
                <span className="text-[10px] text-mutedgrey">ID: #{user?.id || 'AP-TG'}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-mutedgrey text-[11px] block">Location & Cadastre:</span>
                <span className="font-bold text-charcoal mt-0.5 block">{formData.location}</span>
                <span className="text-[10px] text-mutedgrey">{formData.surveyNumber}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-mutedgrey text-[11px] block">Total Cultivated Area:</span>
                <span className="font-bold text-charcoal mt-0.5 block">{formData.farmSize} Acres</span>
                <span className="text-[10px] text-forest-700">100% Under Sowing</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-mutedgrey text-[11px] block">Irrigation Source:</span>
                <span className="font-bold text-charcoal mt-0.5 block truncate">{formData.irrigationType}</span>
                <span className="text-[10px] text-forest-700">Operational</span>
              </div>
            </div>
          )}
        </Card>

        {/* Individual Farm Parcels */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-charcoal">
              Active Field Parcels ({parcels.length} Blocks)
            </h3>
            <span className="text-xs text-mutedgrey">Real-Time Vigor Telemetry</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {parcels.map((parcel) => (
              <div
                key={parcel.id}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-subtle space-y-4"
              >
                <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] font-bold text-forest-900 bg-forest-50 px-2.5 py-0.5 rounded-full border border-forest-200">
                      {parcel.area}
                    </span>
                    <h4 className="font-bold text-charcoal text-base mt-1.5">{parcel.name}</h4>
                    <p className="text-xs font-semibold text-slate-700 mt-0.5">{parcel.crop}</p>
                  </div>
                  <Badge variant={parcel.riskVariant} size="sm">
                    {parcel.riskLevel}
                  </Badge>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-mutedgrey">Growth Stage:</span>
                    <span className="font-semibold text-charcoal">{parcel.stage}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-mutedgrey">Sowing Date:</span>
                    <span className="font-medium text-slate-700">{parcel.sownDate}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-mutedgrey">Irrigation Regimen:</span>
                    <span className="font-medium text-slate-700">{parcel.irrigation}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-mutedgrey">Canopy Vigor Index:</span>
                    <span className="font-bold text-forest-900">{parcel.vigor}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700">
                  <span className="font-semibold text-charcoal block mb-0.5">Upcoming Agro Milestone:</span>
                  <p className="text-[11px] leading-relaxed text-slate-600">{parcel.nextAction}</p>
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <NavLink
                    to="/disease-detection"
                    className="flex-1 py-2 px-3 rounded-lg bg-forest-50 hover:bg-forest-100 text-forest-900 font-semibold text-xs text-center border border-forest-200 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ScanLine className="w-3.5 h-3.5" />
                    <span>Scan Parcel Leaf</span>
                  </NavLink>
                  <NavLink
                    to="/crop-recommendation"
                    className="flex-1 py-2 px-3 rounded-lg bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs text-center border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Sprout className="w-3.5 h-3.5" />
                    <span>View Soil Match</span>
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
