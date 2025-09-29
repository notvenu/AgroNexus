import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Leaf, Droplets, Thermometer, TestTube, Wind } from 'lucide-react';
import { recommendCrop } from '../api/ml';

const InputField = ({ label, name, type, value, onChange, placeholder }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
        />
    </div>
);

const CropRecommendation = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        N: '',
        P: '',
        K: '',
        temperature: '',
        humidity: '',
        ph: '',
        rainfall: ''
    });
    const [recommendation, setRecommendation] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setRecommendation(null);
        const result = await recommendCrop(formData);
        setRecommendation(result);
        setLoading(false);
    };

    return (
        <div className="bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4">{t('crop.title')}</h1>
                    <p className="text-lg text-center text-gray-600 mb-12">{t('crop.subtitle')}</p>
                </motion.div>

                <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label={t('crop.n')} name="N" type="number" value={formData.N} onChange={handleChange} placeholder="e.g., 90" />
                        <InputField label={t('crop.p')} name="P" type="number" value={formData.P} onChange={handleChange} placeholder="e.g., 42" />
                        <InputField label={t('crop.k')} name="K" type="number" value={formData.K} onChange={handleChange} placeholder="e.g., 43" />
                        <InputField label={t('crop.temperature')} name="temperature" type="number" value={formData.temperature} onChange={handleChange} placeholder="e.g., 20.8" />
                        <InputField label={t('crop.humidity')} name="humidity" type="number" value={formData.humidity} onChange={handleChange} placeholder="e.g., 82" />
                        <InputField label={t('crop.ph')} name="ph" type="number" step="0.1" value={formData.ph} onChange={handleChange} placeholder="e.g., 6.5" />
                        <InputField label={t('crop.rainfall')} name="rainfall" type="number" value={formData.rainfall} onChange={handleChange} placeholder="e.g., 202.9" />
                        
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="md:col-span-2 w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            {loading ? t('crop.recommending') : t('crop.recommend_button')}
                        </motion.button>
                    </form>

                    {recommendation && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 p-6 bg-green-50 border-l-4 border-green-500 rounded-r-lg"
                        >
                            <div className="flex items-center">
                                <Leaf className="h-10 w-10 text-green-600 mr-4"/>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{t('crop.recommendation_result')}</h3>
                                    <p className="text-2xl font-semibold text-green-700">{recommendation.crop}</p>
                                    <p className="text-gray-600 mt-1">{t('crop.confidence')}: {recommendation.confidence}%</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CropRecommendation;
