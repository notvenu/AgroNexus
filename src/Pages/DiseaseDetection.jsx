import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, Bug, ShieldCheck } from 'lucide-react';
import { detectDisease } from '../api/ml';

const DiseaseDetection = () => {
  const { t } = useTranslation();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setResult(null); // Reset result on new image
    }
  };

  const handleSubmit = async () => {
    if (!image) return;
    setLoading(true);
    const detectionResult = await detectDisease(image);
    setResult(detectionResult);
    setLoading(false);
  };

  return (
    <div className="bg-background py-10">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-fadeIn">
          <h1 className="text-4xl font-extrabold tracking-tight text-text sm:text-5xl">
            {t('disease.title')}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
            {t('disease.subtitle')}
          </p>
        </div>

        <div className="mt-10 rounded-lg bg-surface p-8 shadow-lg">
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <div className="w-full md:w-1/2">
              <label htmlFor="file-upload" className="relative block w-full cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-primary">
                {preview ? (
                  <img src={preview} alt="Preview" className="mx-auto h-48 w-48 rounded-md object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <span className="mt-2 block text-sm font-medium text-text">{t('common.upload')}</span>
                  </div>
                )}
                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
              </label>
            </div>
            <div className="w-full text-center md:w-1/2 md:text-left">
              <button
                onClick={handleSubmit}
                disabled={!image || loading}
                className="w-full rounded-md bg-secondary px-8 py-3 text-lg font-semibold text-white shadow-md transition-transform duration-200 hover:scale-105 disabled:cursor-not-allowed disabled:bg-gray-400 sm:w-auto"
              >
                {loading ? t('common.loading') : t('common.submit')}
              </button>
            </div>
          </div>
        </div>

        {result && (
          <div className="mt-10 animate-fadeIn rounded-lg bg-surface p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-text">{t('disease.resultTitle')}</h2>
            <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-red-600">
                        <Bug /> {t('disease.detected')}
                    </h3>
                    <p className="mt-2 text-xl font-bold text-text">{t(`disease.${result.disease}`)}</p>
                </div>
                 <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-green-600">
                        <ShieldCheck /> {t('disease.remedy')}
                    </h3>
                    <p className="mt-2 text-text-muted">{t(`disease.${result.remedy}`)}</p>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseaseDetection;
