import React, { useState, useEffect } from 'react';
import { Card } from '../common/Card';
import { MapPin, Sprout, Calendar, Droplets, User, Edit3, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../i18n/LanguageContext';

export const FarmInfoCard = () => {
  const { user, updateProfile } = useAuth();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Farmer',
    location: user?.location || 'Andhra Pradesh / Telangana',
    farmSize: user?.farmSize || '5.0',
    currentCrop: user?.currentCrop || 'Paddy',
    growthStage: user?.growthStage || 'Vegetative Tillering Stage',
    sowingDate: user?.sowingDate || '2024-07-15',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || 'Farmer',
        location: user.location || 'Andhra Pradesh / Telangana',
        farmSize: user.farmSize || '5.0',
        currentCrop: user.currentCrop || 'Paddy',
        growthStage: user.growthStage || 'Vegetative Tillering Stage',
        sowingDate: user.sowingDate || '2024-07-15',
      });
    }
  }, [user]);

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  return (
    <Card
      title={t('dashboard.farmCard.title')}
      subtitle="AP/Telangana Regional Agronomic Profile"
      headerAction={
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-xs font-medium text-forest-700 hover:text-forest-900 flex items-center gap-1.5 px-2.5 py-1 rounded-md hover:bg-forest-50 transition-colors"
        >
          {isEditing ? <Check className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
          <span>{isEditing ? 'Cancel' : t('dashboard.farmCard.editProfile')}</span>
        </button>
      }
    >
      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-mutedgrey font-medium mb-1">{t('dashboard.farmCard.farmerName')}</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-charcoal focus:ring-1 focus:ring-forest-900"
              />
            </div>
            <div>
              <label className="block text-mutedgrey font-medium mb-1">{t('dashboard.farmCard.location')}</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-charcoal focus:ring-1 focus:ring-forest-900"
              />
            </div>
            <div>
              <label className="block text-mutedgrey font-medium mb-1">{t('dashboard.farmCard.farmSize')} (Acres)</label>
              <input
                type="text"
                value={formData.farmSize}
                onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-charcoal focus:ring-1 focus:ring-forest-900"
              />
            </div>
            <div>
              <label className="block text-mutedgrey font-medium mb-1">{t('dashboard.farmCard.currentCrop')}</label>
              <input
                type="text"
                value={formData.currentCrop}
                onChange={(e) => setFormData({ ...formData, currentCrop: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-charcoal focus:ring-1 focus:ring-forest-900"
              />
            </div>
            <div>
              <label className="block text-mutedgrey font-medium mb-1">{t('dashboard.farmCard.growthStage')}</label>
              <input
                type="text"
                value={formData.growthStage}
                onChange={(e) => setFormData({ ...formData, growthStage: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-charcoal focus:ring-1 focus:ring-forest-900"
              />
            </div>
            <div>
              <label className="block text-mutedgrey font-medium mb-1">{t('dashboard.farmCard.sowingDate')}</label>
              <input
                type="date"
                value={formData.sowingDate}
                onChange={(e) => setFormData({ ...formData, sowingDate: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-charcoal focus:ring-1 focus:ring-forest-900"
              />
            </div>
          </div>
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-forest-900 text-white font-medium text-xs hover:bg-forest-800"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-slate-100 text-slate-700 shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-mutedgrey font-medium">{t('dashboard.farmCard.farmerName')}</p>
              <p className="text-sm font-semibold text-charcoal mt-0.5">{user?.name || 'Farmer'}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-slate-100 text-slate-700 shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-mutedgrey font-medium">{t('dashboard.farmCard.location')}</p>
              <p className="text-sm font-semibold text-charcoal mt-0.5 truncate">{user?.location || 'Andhra Pradesh & Telangana'}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-slate-100 text-slate-700 shrink-0">
              <Sprout className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-mutedgrey font-medium">{t('dashboard.farmCard.farmSize')}</p>
              <p className="text-sm font-semibold text-charcoal mt-0.5">{user?.farmSize || '5.0'} Acres</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-forest-50 text-forest-800 shrink-0">
              <Droplets className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-mutedgrey font-medium">{t('dashboard.farmCard.currentCrop')}</p>
              <p className="text-sm font-semibold text-charcoal mt-0.5">{user?.currentCrop || 'Paddy'}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-slate-100 text-slate-700 shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-mutedgrey font-medium">{t('dashboard.farmCard.growthStage')}</p>
              <p className="text-sm font-semibold text-charcoal mt-0.5 truncate">{user?.growthStage || 'Tillering Stage'}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-slate-100 text-slate-700 shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-mutedgrey font-medium">{t('dashboard.farmCard.sowingDate')}</p>
              <p className="text-sm font-semibold text-charcoal mt-0.5">{user?.sowingDate || '15 Jul 2024'}</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
