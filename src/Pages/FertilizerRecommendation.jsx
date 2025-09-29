import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FlaskConical, Droplets, Thermometer, Wind, Leaf } from 'lucide-react';
import { recommendFertilizer } from '../api/ml';

const soilTypes = ["Sandy", "Loamy", "Clayey", "Peaty", "Chalky"];
const cropTypes = ["Maize", "Sugarcane", "Cotton", "Tobacco", "Paddy", "Barley", "Wheat", "Millets", "Oil seeds", "Pulses", "Ground Nuts"];

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

const SelectField = ({ label, name, value, onChange, children }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
        >
            {children}
        </select>
    </div>
);

const FertilizerRecommendation = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        temperature: '',
        humidity: '',
        moisture: '',
        soilType: '',
        cropType: '',
        nitrogen: '',
        potassium: '',
        phosphorous: ''
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
        const result = await recommendFertilizer(formData);
        setRecommendation(result);
        setLoading(false);
    };

    return (
        <div className="bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4">{t('fertilizer.title')}</h1>
                    <p className="text-lg text-center text-gray-600 mb-12">{t('fertilizer.subtitle')}</p>
                </motion.div>

                <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label={t('fertilizer.temperature')} name="temperature" type="number" value={formData.temperature} onChange={handleChange} placeholder="e.g., 26" />
                        <InputField label={t('fertilizer.humidity')} name="humidity" type="number" value={formData.humidity} onChange={handleChange} placeholder="e.g., 52" />
                        <InputField label={t('fertilizer.moisture')} name="moisture" type="number" value={formData.moisture} onChange={handleChange} placeholder="e.g., 38" />
                        <SelectField label={t('fertilizer.soil_type')} name="soilType" value={formData.soilType} onChange={handleChange}>
                            <option value="">{t('fertilizer.select_soil')}</option>
                            {soilTypes.map(s => <option key={s} value={s}>{s}</option>)}
                        </SelectField>
                        <SelectField label={t('fertilizer.crop_type')} name="cropType" value={formData.cropType} onChange={handleChange}>
                            <option value="">{t('fertilizer.select_crop')}</option>
                            {cropTypes.map(c => <option key={c} value={c}>{c}</option>)}
                        </SelectField>
                        <InputField label={t('fertilizer.nitrogen')} name="nitrogen" type="number" value={formData.nitrogen} onChange={handleChange} placeholder="e.g., 37" />
                        <InputField label={t('fertilizer.potassium')} name="potassium" type="number" value={formData.potassium} onChange={handleChange} placeholder="e.g., 0" />
                        <InputField label={t('fertilizer.phosphorous')} name="phosphorous" type="number" value={formData.phosphorous} onChange={handleChange} placeholder="e.g., 0" />
                        
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="md:col-span-2 w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            {loading ? t('fertilizer.recommending') : t('fertilizer.recommend_button')}
                        </motion.button>
                    </form>

                    {recommendation && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 p-6 bg-green-50 border-l-4 border-green-500 rounded-r-lg"
                        >
                            <div className="flex items-center">
                                <FlaskConical className="h-10 w-10 text-green-600 mr-4"/>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{t('fertilizer.recommendation_result')}</h3>
                                    <p className="text-2xl font-semibold text-green-700">{recommendation.fertilizer}</p>
                                    <p className="text-gray-600 mt-1">{t('fertilizer.confidence')}: {recommendation.confidence}%</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FertilizerRecommendation;
