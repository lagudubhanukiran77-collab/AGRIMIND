import React, { useState, useRef } from 'react';
import { Card } from '../common/Card';
import {
  UploadCloud,
  Image as ImageIcon,
  Trash2,
  Scan,
  AlertOctagon,
  ShieldAlert,
  Check,
  Info
} from 'lucide-react';
import { useTranslation } from '../../i18n/LanguageContext';
import { validateCropLeafImage } from '../../utils/leafValidator';

// ONLY Authentic Crop Diseased Leaf Specimens (Paddy, Chilli, Cotton)
export const VERIFIED_CROP_DISEASE_SAMPLES = [
  {
    key: 'paddy',
    crop: 'Paddy',
    label: 'Paddy Blast Disease (Leaf Lesions)',
    teluguLabel: 'వరి అగ్గి తెగులు ఆకు నమూనా',
    hindiLabel: 'धान ब्लास्ट रोग पत्ती नमूना',
    url: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=600&q=80',
    fileName: 'paddy_blast_lesion_specimen.jpg',
    size: '1.4 MB'
  },
  {
    key: 'chilli',
    crop: 'Chilli',
    label: 'Chilli Leaf Curl Virus (Apical Curling)',
    teluguLabel: 'మిరప ఆకు ముడుత తెగులు నమూనా',
    hindiLabel: 'मिर्च पर्ण कुंचन (लीफ कर्ल) नमूना',
    url: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80',
    fileName: 'chilli_leaf_curl_vector_specimen.jpg',
    size: '1.8 MB'
  },
  {
    key: 'cotton',
    crop: 'Cotton',
    label: 'Cotton Bacterial Blight (Vein Angular Spots)',
    teluguLabel: 'పత్తి బాక్టీరియల్ బ్లైట్ ఆకు నమూనా',
    hindiLabel: 'कपास जीवाणु झुलसा पत्ती नमूना',
    url: 'https://images.unsplash.com/photo-1594498653385-d5172c532c00?auto=format&fit=crop&w=600&q=80',
    fileName: 'cotton_bacterial_blight_specimen.jpg',
    size: '2.1 MB'
  }
];

export const ImageUploader = ({ onAnalyze, isAnalyzing, selectedCrop, setSelectedCrop }) => {
  const { t, language } = useTranslation();
  const [imagePreview, setImagePreview] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [activeSampleKey, setActiveSampleKey] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const fileInputRef = useRef(null);

  const processSelectedFile = async (file) => {
    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
      alert('Please upload a valid image file (JPG, JPEG, or PNG).');
      return;
    }

    setActiveSampleKey(null);
    setFileName(file.name);
    setFileSize((file.size / (1024 * 1024)).toFixed(2) + ' MB');
    setIsValidating(true);
    setValidationResult(null);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target.result;
      setImagePreview(dataUrl);

      // Validate that the image contains a diseased crop leaf (not a car, flower, person, etc.)
      const check = await validateCropLeafImage(dataUrl, file.name);
      setValidationResult(check);
      setIsValidating(false);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files?.[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleSelectSample = (sample) => {
    setImagePreview(sample.url);
    setFileName(sample.fileName);
    setFileSize(sample.size);
    setActiveSampleKey(sample.key);
    setValidationResult({ isValid: true });
    if (sample.crop) {
      setSelectedCrop(sample.crop);
    }
  };

  const handleRemove = () => {
    setImagePreview(null);
    setFileName('');
    setFileSize('');
    setActiveSampleKey(null);
    setValidationResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const triggerAnalyze = () => {
    if (!imagePreview || isValidating) return;

    // If validation determined this is a car, flower, or non-crop image:
    if (validationResult && !validationResult.isValid) {
      onAnalyze({
        isRejected: true,
        rejectedData: validationResult,
        image: imagePreview,
        fileName,
      });
      return;
    }

    onAnalyze({
      isRejected: false,
      sampleKey: activeSampleKey,
      crop: selectedCrop,
      image: imagePreview,
      fileName,
    });
  };

  return (
    <Card
      title="Upload Leaf Specimen"
      subtitle="High-Resolution Optical Leaf Diagnostics"
    >
      <div className="space-y-4">
        {/* Crop Selection Dropdown */}
        <div>
          <label className="block text-xs font-semibold text-charcoal mb-1.5">
            {t('disease.selectCrop')} <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['Paddy', 'Chilli', 'Cotton'].map((crop) => (
              <button
                key={crop}
                type="button"
                onClick={() => setSelectedCrop(crop)}
                className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all text-center ${
                  selectedCrop === crop
                    ? 'bg-forest-900 text-white border-forest-900 shadow-subtle'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {crop}
              </button>
            ))}
          </div>
        </div>

        {/* Upload / Drop Area */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl p-4 sm:p-6 transition-all text-center ${
            isDragOver
              ? 'border-forest-600 bg-forest-50/50'
              : imagePreview
              ? validationResult && !validationResult.isValid
                ? 'border-red-300 bg-red-50/20'
                : 'border-forest-300 bg-slate-50/50'
              : 'border-slate-200 hover:border-slate-300 bg-slate-50/30'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,image/jpeg,image/png"
            onChange={handleFileChange}
            className="hidden"
            id="leaf-file-upload"
          />

          {imagePreview ? (
            <div className="space-y-3">
              <div className="relative inline-block rounded-lg overflow-hidden border border-slate-200 shadow-sm max-h-56">
                <img
                  src={imagePreview}
                  alt="Uploaded leaf specimen"
                  className="w-full h-48 sm:h-52 object-cover rounded-lg"
                />
                <button
                  onClick={handleRemove}
                  className="absolute top-2 right-2 p-1.5 bg-charcoal/80 hover:bg-red-600 text-white rounded-lg transition-colors shadow-sm"
                  title={t('disease.removeImage')}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between text-xs px-2 text-slate-600">
                <span className="font-mono truncate max-w-[180px]">{fileName}</span>
                <span className="text-[11px] text-mutedgrey shrink-0">{fileSize}</span>
              </div>
            </div>
          ) : (
            <div className="py-4 sm:py-6 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center">
                <UploadCloud className="w-6 h-6 text-forest-700" />
              </div>
              <div>
                <p className="text-xs font-semibold text-charcoal">
                  {t('disease.uploadBoxTitle')}
                </p>
                <p className="text-[11px] text-mutedgrey mt-0.5">
                  Only diseased crop leaf photos (Paddy, Chilli, Cotton) accepted
                </p>
              </div>
              <label
                htmlFor="leaf-file-upload"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-charcoal font-semibold text-xs rounded-lg cursor-pointer transition-colors shadow-subtle"
              >
                <ImageIcon className="w-3.5 h-3.5 text-forest-700" />
                <span>{t('disease.uploadButton')}</span>
              </label>
            </div>
          )}
        </div>

        {/* Validation Status Notice */}
        {isValidating && (
          <div className="p-2.5 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg text-xs flex items-center gap-2">
            <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin shrink-0" />
            <span>Validating crop leaf specimen (checking foliar pathology criteria)...</span>
          </div>
        )}

        {validationResult && !validationResult.isValid && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs space-y-1 text-red-900 animate-in fade-in">
            <div className="flex items-center gap-1.5 font-bold text-red-700">
              <AlertOctagon className="w-4 h-4 shrink-0" />
              <span>Non-Crop Image Detected ({validationResult.detectedType || 'Invalid Subject'})</span>
            </div>
            <p className="text-[11px] text-red-700 leading-relaxed">
              {validationResult.message || 'Only crop diseased leaf photos (Paddy, Chilli, Cotton) are allowed. Car, flower, vehicle, and non-crop photos cannot be analyzed.'}
            </p>
          </div>
        )}

        {/* Verified Specimen Library for Diagnostics (Crop Diseases ONLY) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-mutedgrey uppercase tracking-wider">
              {t('disease.takeSample')} (Crop Diseases Only)
            </span>
            <span className="text-[10px] text-forest-800 font-mono bg-forest-50 px-1.5 py-0.5 rounded">
              Verified Pathogens
            </span>
          </div>
          <div className="space-y-1.5 text-left">
            {VERIFIED_CROP_DISEASE_SAMPLES.map((sample) => {
              const label = language === 'te' && sample.teluguLabel
                ? sample.teluguLabel
                : language === 'hi' && sample.hindiLabel
                ? sample.hindiLabel
                : sample.label;

              return (
                <button
                  key={sample.key}
                  type="button"
                  onClick={() => handleSelectSample(sample)}
                  className={`w-full p-2.5 rounded-lg border text-left transition-all flex items-center gap-3 ${
                    activeSampleKey === sample.key
                      ? 'border-forest-600 bg-forest-50/70 text-forest-900 font-semibold'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <img
                    src={sample.url}
                    alt={sample.label}
                    className="w-9 h-9 rounded-md object-cover border border-slate-200 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs truncate font-medium text-charcoal">{label}</p>
                    <span className="text-[10px] text-forest-800 font-semibold block">{sample.crop} Pathology</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Analyze Action Button */}
        <button
          onClick={triggerAnalyze}
          disabled={!imagePreview || isAnalyzing || isValidating}
          className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-subtle ${
            !imagePreview || isAnalyzing || isValidating
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : validationResult && !validationResult.isValid
              ? 'bg-red-700 hover:bg-red-800 text-white'
              : 'bg-forest-900 hover:bg-forest-800 text-white shadow-card hover:scale-[1.01]'
          }`}
        >
          {isAnalyzing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>{t('disease.analyzing')}</span>
            </>
          ) : validationResult && !validationResult.isValid ? (
            <>
              <AlertOctagon className="w-4 h-4 text-red-200" />
              <span>View Rejection Notice</span>
            </>
          ) : (
            <>
              <Scan className="w-4 h-4 text-forest-300" />
              <span>{t('disease.analyzeButton')}</span>
            </>
          )}
        </button>

        {/* Advisory footnote */}
        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[10px] text-mutedgrey flex items-start gap-1.5 leading-relaxed">
          <Info className="w-3.5 h-3.5 text-forest-700 shrink-0 mt-0.5" />
          <span>
            AGRI-MIND Vision Core is calibrated specifically for foliar diseases in Paddy, Chilli, and Cotton. Photos of cars, flowers, vehicles, or non-crop objects are strictly rejected.
          </span>
        </div>
      </div>
    </Card>
  );
};
