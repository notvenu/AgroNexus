import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FlaskConical, Thermometer, Droplets, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getFertilizerRecommendation } from '../api/ml_models';

const soilTypes = ["Alluvial", "Black", "Red", "Laterite", "Arid", "Forest", "Peat", "Saline"];
const cropTypes = ["Rice", "Wheat", "Maize", "Cotton", "Jute", "Sugarcane", "Pulses", "Millets", "Oilseeds"];

const initialFormState = {
    moisture: '',
    soil_type: '',
    crop_type: '',
    nitrogen: '',
    potassium: '',
    phosphorous: ''
};

const initialWeatherState = {
    temperature: '',
    humidity: ''
};

// --- Component definitions moved outside the main function ---

const InputField = ({ name, label, type = "number", placeholder, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-dark-text-muted">{label}</label>
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-dark-surface dark:border-gray-600 dark:text-dark-text"
        />
    </div>
);

const SelectField = ({ name, label, options, placeholder, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-dark-text-muted">{label}</label>
        <select name={name} value={value} onChange={onChange} required className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-dark-surface dark:border-gray-600 dark:text-dark-text">
            <option value="">{placeholder}</option>
            {options.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
    </div>
);

const WeatherInputField = ({ name, label, placeholder, value, onChange, icon }) => (
     <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-dark-text-muted">{label}</label>
        <div className="absolute left-3 top-9 text-gray-400">{icon}</div>
        <input
            type="number"
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
            className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-dark-surface dark:border-gray-600 dark:text-dark-text"
        />
    </div>
);

// --- Main Page Component ---

const FertilizerRecommendation = () => {
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
        alert("Fetching location data... (mocked)");
        setWeatherInputs({
            temperature: '28',
            humidity: '70'
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        setIsLoading(true);

        let submissionData = { ...formData };
        if (!isLoggedIn) {
            submissionData = { ...submissionData, ...weatherInputs };
        }
        
        const recommendation = await getFertilizerRecommendation(submissionData);
        setResult(recommendation);
        setIsLoading(false);

        // Reset form fields
        setFormData(initialFormState);
        setWeatherInputs(initialWeatherState);
    };

    return (
        <div className="bg-gray-50 dark:bg-dark-background min-h-screen py-12 px-4">
            <div className="container mx-auto max-w-7xl">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-dark-text text-center mb-4">{t('nav.fertilizer_recommendation')}</h1>
                    <p className="text-lg text-gray-600 dark:text-dark-text-muted text-center mb-8">{t('prediction_pages.fertilizer_rec_subtitle')}</p>
                </motion.div>

                <div className="flex flex-wrap justify-center items-start gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="w-full max-w-lg flex-shrink-0"
                    >
                        <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-lg space-y-4">
                            {!isLoggedIn && (
                                <div className="border-b dark:border-gray-700 pb-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-md font-semibold text-gray-700 dark:text-dark-text">{t('prediction_pages.weather_details')}</h3>
                                        <button type="button" onClick={handleGetLocation} className="text-sm flex items-center text-green-600 hover:text-green-800 font-semibold">
                                            <MapPin size={16} className="mr-1" />
                                            {t('prediction_pages.get_location')}
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <WeatherInputField name="temperature" label={t('prediction_pages.temperature')} placeholder="°C" value={weatherInputs.temperature} onChange={handleWeatherInputChange} icon={<Thermometer size={16}/>} />
                                        <WeatherInputField name="humidity" label={t('prediction_pages.humidity')} placeholder="%" value={weatherInputs.humidity} onChange={handleWeatherInputChange} icon={<Droplets size={16}/>} />
                                    </div>
                                </div>
                            )}

                            <InputField name="moisture" label={t('prediction_pages.moisture')} placeholder="e.g., 60%" value={formData.moisture} onChange={handleInputChange} />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <SelectField name="soil_type" label={t('prediction_pages.soil_type')} options={soilTypes} placeholder={t('fertilizer.select_soil')} value={formData.soil_type} onChange={handleInputChange} />
                                <SelectField name="crop_type" label={t('prediction_pages.crop_type')} options={cropTypes} placeholder={t('fertilizer.select_crop')} value={formData.crop_type} onChange={handleInputChange} />
                            </div>
                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <InputField name="nitrogen" label={t('prediction_pages.nitrogen')} placeholder="e.g., 40" value={formData.nitrogen} onChange={handleInputChange}/>
                                <InputField name="potassium" label={t('prediction_pages.potassium')} placeholder="e.g., 20" value={formData.potassium} onChange={handleInputChange}/>
                                <InputField name="phosphorous" label={t('prediction_pages.phosphorus')} placeholder="e.g., 30" value={formData.phosphorous} onChange={handleInputChange}/>
                             </div>

                            <motion.button
                                type="submit"
                                className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                disabled={isLoading}
                            >
                                {isLoading ? t('prediction_pages.recommending') : t('prediction_pages.recommend_fertilizer_button')}
                            </motion.button>
                        </form>
                    </motion.div>

                    {hasSubmitted && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="w-full max-w-lg bg-white dark:bg-dark-surface p-6 rounded-lg shadow-lg flex-shrink-0"
                        >
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-dark-text mb-4">{t('prediction_pages.result')}</h2>
                            {isLoading ? (
                                <div className="text-center py-8"><p className="dark:text-dark-text-muted">{t('prediction_pages.analyzing_data')}</p></div>
                            ) : result ? (
                                <div className="text-center">
                                    <FlaskConical size={48} className="mx-auto text-blue-500 mb-4" />
                                    <p className="text-lg text-gray-600 dark:text-dark-text-muted">{t('prediction_pages.recommended_fert_is')}</p>
                                    <p className="text-4xl font-extrabold text-blue-600 my-2">{result.fertilizer}</p>
                                    <div className="mt-4 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                                        <p className="font-semibold">{t('prediction_pages.confidence')} <span className="font-bold text-blue-600">{result.confidence}%</span></p>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8"><p className="text-gray-500 dark:text-dark-text-muted">{t('prediction_pages.results_appear_here')}</p></div>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FertilizerRecommendation;

