import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { BarChart3, Thermometer, Droplets, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getYieldPrediction } from '../api/ml';

const soilTypes = ["Alluvial", "Black", "Red", "Laterite", "Arid", "Forest", "Peat", "Saline"];
const cropTypes = ["Rice", "Wheat", "Maize", "Cotton", "Jute", "Sugarcane", "Pulses", "Millets", "Oilseeds"];

const initialFormState = {
    region: '',
    soil_type: '',
    crop: '',
    fertilizer_used: '',
    days_to_harvest: ''
};

const initialWeatherState = {
    temperature: '',
    rainfall_mm: ''
};

const CropYieldPrediction = () => {
    const { t } = useTranslation();
    const { isLoggedIn } = useAuth();
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [formData, setFormData] = useState(initialFormState);
    const [weatherInputs, setWeatherInputs] = useState(initialWeatherState);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleWeatherInputChange = (e) => {
        const { name, value } = e.target;
        setWeatherInputs(prev => ({ ...prev, [name]: value }));
    };

     const handleGetLocation = () => {
        
        setWeatherInputs({ temperature: '30', rainfall_mm: '120' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        setIsLoading(true);
        
        let submissionData = { ...formData };
        if (!isLoggedIn) {
            submissionData.temperature_celsius = weatherInputs.temperature;
            submissionData.rainfall_mm = weatherInputs.rainfall_mm;
        }
        
        const prediction = await getYieldPrediction(submissionData);
        setResult(prediction);
        setIsLoading(false);

        setFormData(initialFormState);
        setWeatherInputs(initialWeatherState);
    };

    const InputField = ({ name, label, type = "text", placeholder, value, onChange }) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
        </div>
    );

    const SelectField = ({ name, label, options, placeholder, value, onChange }) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <select name={name} value={value} onChange={onChange} required className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                <option value="">{placeholder}</option>
                {options.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
        </div>
    );
    
    const WeatherInputField = ({ name, label, placeholder, value, onChange, icon }) => (
         <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="absolute left-3 top-9 text-gray-400">{icon}</div>
            <input
                type="number"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required
                className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4">
            <div className="container mx-auto max-w-7xl">
                 <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-4">{t('nav.yield_prediction')}</h1>
                    <p className="text-lg text-gray-600 text-center mb-8">{t('prediction_pages.yield_pred_subtitle')}</p>
                </motion.div>

                <div className="flex flex-wrap justify-center items-start gap-8">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ delay: 0.2 }}
                        className="w-full max-w-lg flex-shrink-0"
                    >
                        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InputField name="region" label={t('prediction_pages.region')} placeholder="e.g., Punjab" value={formData.region} onChange={handleInputChange}/>
                                <SelectField name="soil_type" label={t('prediction_pages.soil_type')} options={soilTypes} placeholder={t('yield.select_soil')} value={formData.soil_type} onChange={handleInputChange}/>
                             </div>
                             <SelectField name="crop" label={t('prediction_pages.crop_type')} options={cropTypes} placeholder={t('yield.select_crop')} value={formData.crop} onChange={handleInputChange} />

                             {!isLoggedIn && (
                                <div className="border-t pt-4">
                                     <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-md font-semibold text-gray-700">{t('prediction_pages.weather_details')}</h3>
                                        <button type="button" onClick={handleGetLocation} className="text-sm flex items-center text-green-600 hover:text-green-800 font-semibold">
                                            <MapPin size={16} className="mr-1" />
                                            {t('prediction_pages.get_location')}
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <WeatherInputField name="temperature" label={t('prediction_pages.temperature')} placeholder="°C" value={weatherInputs.temperature} onChange={handleWeatherInputChange} icon={<Thermometer size={16}/>} />
                                        <WeatherInputField name="rainfall_mm" label={t('prediction_pages.rainfall')} placeholder="mm" value={weatherInputs.rainfall_mm} onChange={handleWeatherInputChange} icon={<Droplets size={16}/>} />
                                    </div>
                                </div>
                            )}
                             
                             <InputField name="fertilizer_used" label={t('prediction_pages.fertilizer_used')} placeholder="e.g., Urea" value={formData.fertilizer_used} onChange={handleInputChange}/>
                             <InputField name="days_to_harvest" label={t('prediction_pages.days_to_harvest')} type="number" placeholder="e.g., 120" value={formData.days_to_harvest} onChange={handleInputChange}/>
                            
                            <motion.button
                                type="submit"
                                className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                disabled={isLoading}
                            >
                                {isLoading ? t('prediction_pages.predicting') : t('prediction_pages.predict_yield_button')}
                            </motion.button>
                        </form>
                    </motion.div>

                    {hasSubmitted && (
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }} 
                            animate={{ opacity: 1, x: 0 }} 
                            transition={{ delay: 0.4 }} 
                            className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg flex-shrink-0"
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('prediction_pages.result')}</h2>
                            {isLoading ? (
                                <div className="text-center py-8"><p>{t('prediction_pages.analyzing_data')}</p></div>
                            ) : result ? (
                                <div className="text-center">
                                    <BarChart3 size={48} className="mx-auto text-yellow-500 mb-4" />
                                    <p className="text-lg text-gray-600">{t('prediction_pages.predicted_yield_is')}</p>
                                    <p className="text-4xl font-extrabold text-yellow-600 my-2">{result.yield} kg/acre</p>
                                    <p className="text-gray-500">{t('prediction_pages.based_on_inputs')}</p>
                                </div>
                            ) : (
                                <div className="text-center py-8"><p className="text-gray-500">{t('prediction_pages.results_appear_here')}</p></div>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CropYieldPrediction;

