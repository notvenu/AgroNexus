import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Map, Wind, Droplets, Thermometer, Tractor, CloudRain, CalendarDays, BarChart } from 'lucide-react';
import { predictYield } from '../api/ml';

const soilTypes = ["Alluvial", "Black", "Red", "Laterite", "Arid", "Forest", "Peat", "Saline"];
const cropTypes = ["Rice", "Wheat", "Maize", "Cotton", "Sugarcane", "Soybean", "Potato"];
const weatherConditions = ["Sunny", "Cloudy", "Rainy", "Windy"];

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


const CropYieldPrediction = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        region: '',
        soilType: '',
        crop: '',
        rainfall: '',
        temperature: '',
        fertilizerUsed: 'Yes',
        irrigationUsed: 'Yes',
        weatherCondition: '',
        daysToHarvest: ''
    });
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPrediction(null);
        const result = await predictYield(formData);
        setPrediction(result);
        setLoading(false);
    };

    return (
        <div className="bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4">{t('yield.title')}</h1>
                    <p className="text-lg text-center text-gray-600 mb-12">{t('yield.subtitle')}</p>
                </motion.div>

                <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label={t('yield.region')} name="region" type="text" value={formData.region} onChange={handleChange} placeholder="e.g., Punjab" />
                        <SelectField label={t('yield.soil_type')} name="soilType" value={formData.soilType} onChange={handleChange}>
                            <option value="">{t('yield.select_soil')}</option>
                            {soilTypes.map(s => <option key={s} value={s}>{s}</option>)}
                        </SelectField>
                        <SelectField label={t('yield.crop')} name="crop" value={formData.crop} onChange={handleChange}>
                             <option value="">{t('yield.select_crop')}</option>
                             {cropTypes.map(c => <option key={c} value={c}>{c}</option>)}
                        </SelectField>
                        <InputField label={t('yield.rainfall')} name="rainfall" type="number" value={formData.rainfall} onChange={handleChange} placeholder="e.g., 750" />
                        <InputField label={t('yield.temperature')} name="temperature" type="number" value={formData.temperature} onChange={handleChange} placeholder="e.g., 25" />
                        <SelectField label={t('yield.fertilizer_used')} name="fertilizerUsed" value={formData.fertilizerUsed} onChange={handleChange}>
                            <option value="Yes">{t('common.yes')}</option>
                            <option value="No">{t('common.no')}</option>
                        </SelectField>
                         <SelectField label={t('yield.irrigation_used')} name="irrigationUsed" value={formData.irrigationUsed} onChange={handleChange}>
                            <option value="Yes">{t('common.yes')}</option>
                            <option value="No">{t('common.no')}</option>
                        </SelectField>
                         <SelectField label={t('yield.weather_condition')} name="weatherCondition" value={formData.weatherCondition} onChange={handleChange}>
                            <option value="">{t('yield.select_weather')}</option>
                            {weatherConditions.map(w => <option key={w} value={w}>{w}</option>)}
                        </SelectField>
                        <InputField label={t('yield.days_to_harvest')} name="daysToHarvest" type="number" value={formData.daysToHarvest} onChange={handleChange} placeholder="e.g., 120" />
                        
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="md:col-span-2 w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            {loading ? t('yield.predicting') : t('yield.predict_button')}
                        </motion.button>
                    </form>

                    {prediction && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 p-6 bg-green-50 border-l-4 border-green-500 rounded-r-lg"
                        >
                            <div className="flex items-center">
                                <BarChart className="h-10 w-10 text-green-600 mr-4"/>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{t('yield.prediction_result')}</h3>
                                    <p className="text-2xl font-semibold text-green-700">{prediction.yield} {t('yield.yield_unit')}</p>
                                    <p className="text-gray-600 mt-1">{t('yield.confidence')}: {prediction.confidence}%</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CropYieldPrediction;
