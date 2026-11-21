import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import {
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  HelpCircle,
  ShieldAlert,
  Sprout,
  Activity,
  Layers,
  ThermometerSun,
  ClipboardList,
  Sparkles,
  Info,
  RotateCcw
} from 'lucide-react';
import { useTranslation } from '../../i18n/LanguageContext';

export const DiseaseResultCard = ({ result, isInconclusive, rejectedData, onReset }) => {
  const { t, language } = useTranslation();

  // Rejection State for Non-Crop Images (Cars, Flowers, Vehicles, Unrelated subjects)
  if (rejectedData) {
    return (
      <Card
        title="Invalid Specimen Rejected"
        subtitle="Only Crop Disease Photos Allowed"
        className="border-red-200 bg-red-50/20"
        headerAction={
          <span className="text-[10px] font-mono bg-red-100 text-red-800 px-2 py-0.5 rounded font-bold uppercase">
            NON-CROP REJECTED
          </span>
        }
      >
        <div className="py-6 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center text-red-600 shadow-sm">
            <AlertOctagon className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h4 className="text-base font-bold text-charcoal">
              {rejectedData.detectedType
                ? `Non-Crop Detected (${rejectedData.detectedType.toUpperCase()})`
                : 'Invalid Specimen: Non-Crop Image Detected'}
            </h4>
            <p className="text-xs font-semibold text-red-700">
              Only crop diseased leaf photos (Paddy, Chilli, Cotton) are accepted.
            </p>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed mt-2">
              {rejectedData.message || 'Cars, ornamental flowers, vehicles, animals, and non-crop objects cannot be diagnosed. Please upload a clear photograph of an infected crop leaf.'}
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-red-200 text-left max-w-md mx-auto text-xs space-y-2 text-slate-700 shadow-subtle">
            <p className="font-bold text-charcoal flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              <span>Strict Agricultural Vision Criteria:</span>
            </p>
            <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-600">
              <li><strong>Accepted:</strong> Close-up photos of leaves from <strong>Paddy, Chilli, or Cotton</strong> showing visible lesions, leaf curl, blight, or discoloration.</li>
              <li><strong>Prohibited:</strong> Photos of cars, vehicles, ornamental flowers (daisies, roses), machinery, people, animals, or general landscapes.</li>
              <li><strong>Capture Recommendation:</strong> Place a single affected leaf under natural daytime lighting with camera focused directly on the diseased blade.</li>
            </ul>
          </div>

          {onReset && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-forest-900 hover:bg-forest-800 text-white rounded-lg text-xs font-semibold transition-colors shadow-subtle"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset & Upload Crop Leaf</span>
            </button>
          )}
        </div>
      </Card>
    );
  }

  // Inconclusive State
  if (isInconclusive) {
    return (
      <Card
        title={t('disease.inconclusiveTitle')}
        subtitle="Confidence Threshold Not Met"
        className="border-amber-200 bg-amber-50/20"
      >
        <div className="py-6 text-center space-y-3">
          <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h4 className="text-base font-bold text-charcoal">{t('disease.inconclusiveTitle')}</h4>
          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            {t('disease.inconclusiveDesc')}
          </p>

          <div className="mt-4 p-3 bg-white rounded-lg border border-amber-200 text-left max-w-md mx-auto text-xs space-y-1 text-slate-700">
            <p className="font-semibold text-amber-900">Tips for higher AI accuracy:</p>
            <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-slate-600">
              <li>Place single infected leaf on a plain neutral background</li>
              <li>Ensure lesions or spots are sharply focused and in daylight</li>
              <li>Avoid extreme shadow or severe glare from direct camera flash</li>
            </ul>
          </div>
        </div>
      </Card>
    );
  }

  // Empty State
  if (!result) {
    return (
      <Card
        title={t('disease.resultsTitle')}
        subtitle="Awaiting Diagnostic Image Upload"
      >
        <div className="py-12 text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <Sprout className="w-8 h-8" />
          </div>
          <h4 className="text-sm font-semibold text-charcoal">{t('disease.emptyStateTitle')}</h4>
          <p className="text-xs text-mutedgrey max-w-sm mx-auto leading-relaxed">
            {t('disease.emptyStateDesc')}
          </p>
          <div className="pt-2 text-[11px] text-forest-700 font-medium">
            Supported models calibrated for: Paddy, Chilli, and Cotton
          </div>
        </div>
      </Card>
    );
  }

  // Display Disease Name based on active language
  const diseaseDisplayName = language === 'te' && result.teluguDisease
    ? result.teluguDisease
    : language === 'hi' && result.hindiDisease
    ? result.hindiDisease
    : result.disease;

  const isHealthy = result.category?.toLowerCase().includes('healthy') || result.severity === 'None (Level 0/4)';

  return (
    <Card
      title={t('disease.resultsTitle')}
      subtitle="Vision AI Neural Inference Report"
      headerAction={
        <span className="text-[10px] font-mono bg-forest-100 text-forest-900 px-2 py-0.5 rounded font-semibold">
          AI VERIFIED
        </span>
      }
    >
      <div className="space-y-5">
        {/* Primary Diagnosis Box */}
        <div className={`p-4 rounded-xl border ${
          isHealthy ? 'bg-emerald-50/50 border-emerald-200' : 'bg-red-50/40 border-red-200'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={isHealthy ? 'success' : 'danger'} size="sm">
                  {result.category}
                </Badge>
                <span className="text-xs text-mutedgrey font-mono">
                  {result.crop}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-charcoal tracking-tight">
                {diseaseDisplayName}
              </h3>
              {result.disease !== diseaseDisplayName && (
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Scientific: {result.disease}
                </p>
              )}
            </div>

            {/* Confidence Gauge */}
            <div className="sm:text-right shrink-0">
              <div className="inline-flex flex-col items-center sm:items-end">
                <span className="text-2xl font-black text-forest-900">
                  {Math.round(result.confidence * 100)}%
                </span>
                <span className="text-[10px] text-mutedgrey uppercase tracking-wider font-semibold">
                  {t('disease.modelConfidence')}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-200/60 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
            <div>
              <span className="text-mutedgrey">{t('disease.severity')}: </span>
              <span className="font-semibold text-charcoal">{result.severity}</span>
            </div>
            <div>
              <span className="text-mutedgrey">Visual Analysis: </span>
              <span className="text-slate-700">{result.visualStatus}</span>
            </div>
          </div>
        </div>

        {/* Detailed Disease Breakdown Accordion / Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Symptoms */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-charcoal">
              <Activity className="w-3.5 h-3.5 text-forest-700" />
              <span>{t('disease.symptoms')}</span>
            </div>
            <ul className="space-y-1.5 text-slate-600 pl-1">
              {result.symptoms?.map((symptom, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-forest-700 font-bold">•</span>
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contributing Conditions */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-charcoal">
              <ThermometerSun className="w-3.5 h-3.5 text-amber-700" />
              <span>{t('disease.conditions')}</span>
            </div>
            <ul className="space-y-1.5 text-slate-600 pl-1">
              {result.conditions?.map((condition, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{condition}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="p-4 rounded-xl bg-forest-50/50 border border-forest-200/80 space-y-2 text-xs">
          <div className="flex items-center gap-2 font-semibold text-forest-900">
            <ClipboardList className="w-4 h-4 text-forest-800" />
            <span>{t('disease.recommendedSteps')}</span>
          </div>
          <ol className="list-decimal pl-5 space-y-1 text-slate-700 leading-relaxed">
            {result.recommendedSteps?.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>

        {/* Prevention Guidance */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 text-xs">
          <div className="flex items-center gap-2 font-semibold text-charcoal">
            <ShieldAlert className="w-4 h-4 text-forest-700" />
            <span>{t('disease.prevention')}</span>
          </div>
          <ul className="space-y-1 text-slate-600 pl-1">
            {result.prevention?.map((prev, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest-600 shrink-0 mt-0.5" />
                <span>{prev}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Medical & Agro Disclaimer */}
        <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-start gap-2.5 text-[11px] text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {t('disease.disclaimer')}
          </p>
        </div>
      </div>
    </Card>
  );
};
