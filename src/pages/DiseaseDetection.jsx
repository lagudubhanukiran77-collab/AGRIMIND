import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { ImageUploader } from '../components/disease/ImageUploader';
import { DiseaseResultCard } from '../components/disease/DiseaseResultCard';
import { AnalysisHistory } from '../components/disease/AnalysisHistory';
import { useTranslation } from '../i18n/LanguageContext';
import { useFarm } from '../context/FarmContext';
import { apiService, DEMO_PREDICTIONS } from '../services/api';
import { Sparkles, ScanLine, ShieldCheck } from 'lucide-react';

export const DiseaseDetection = () => {
  const { t } = useTranslation();
  const { addDiseaseScan } = useFarm();
  const [selectedCrop, setSelectedCrop] = useState('Paddy');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [isInconclusive, setIsInconclusive] = useState(false);
  const [rejectedData, setRejectedData] = useState(null);

  const handleAnalyze = async (uploadData) => {
    setIsAnalyzing(true);
    setIsInconclusive(false);
    setRejectedData(null);

    // If pre-screener flagged this upload as a car, flower, or non-crop image:
    if (uploadData.isRejected) {
      setTimeout(() => {
        setRejectedData(uploadData.rejectedData);
        setCurrentResult(null);
        setIsInconclusive(false);
        setIsAnalyzing(false);
      }, 500);
      return;
    }

    // Inference for valid crop diseased leaf
    setTimeout(async () => {
      let key = uploadData.sampleKey || selectedCrop.toLowerCase();
      if (!DEMO_PREDICTIONS[key]) {
        key = 'paddy';
      }

      const res = await apiService.predictDisease(key);
      const prediction = res.data;

      setCurrentResult(prediction);
      setIsInconclusive(false);
      setRejectedData(null);
      setIsAnalyzing(false);

      // Save valid crop disease diagnostic to history
      addDiseaseScan({
        crop: prediction.crop.split(' ')[0],
        disease: prediction.disease,
        confidence: `${Math.round(prediction.confidence * 100)}%`,
        severity: prediction.severity.split(' ')[0],
        status: 'Action Recommended',
        image: uploadData.image,
      });
    }, 1000);
  };

  const handleSelectHistoryItem = (item) => {
    const matchedKey = item.crop.toLowerCase().includes('chilli') ? 'chilli' : item.crop.toLowerCase().includes('cotton') ? 'cotton' : 'paddy';
    const base = DEMO_PREDICTIONS[matchedKey];
    setCurrentResult(base);
    setIsInconclusive(false);
    setRejectedData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="pb-3 border-b border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-forest-100 rounded-lg text-forest-900">
                <ScanLine className="w-5 h-5 text-forest-700" />
              </div>
              <h1 className="text-2xl font-black text-charcoal tracking-tight">
                {t('disease.title')}
              </h1>
            </div>
            <p className="text-xs text-mutedgrey mt-1">
              {t('disease.description')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-forest-800 bg-forest-50 px-2.5 py-1 rounded-full border border-forest-200/80 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-forest-600" />
              Strict Foliar Pathology: Paddy, Chilli, Cotton
            </span>
          </div>
        </div>

        {/* Dual Column Layout: Left Uploader, Right AI Result Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (5 Cols) */}
          <div className="lg:col-span-5">
            <ImageUploader
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
              selectedCrop={selectedCrop}
              setSelectedCrop={setSelectedCrop}
            />
          </div>

          {/* Right Column (7 Cols) */}
          <div className="lg:col-span-7">
            <DiseaseResultCard
              result={currentResult}
              isInconclusive={isInconclusive}
              rejectedData={rejectedData}
              onReset={() => {
                setCurrentResult(null);
                setIsInconclusive(false);
                setRejectedData(null);
              }}
            />
          </div>
        </div>

        {/* Diagnostic History Row */}
        <div>
          <AnalysisHistory onSelectHistoryItem={handleSelectHistoryItem} />
        </div>
      </div>
    </DashboardLayout>
  );
};
