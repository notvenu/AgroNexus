import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    User, MapPin, Wind, Droplets, Thermometer,
    BarChart3, FlaskConical, Stethoscope, Briefcase, TrendingUp, Sun, Cloud, CloudRain, Leaf, Lightbulb, TrendingDown, Clock
} from 'lucide-react';
import farmerData from '../data/farmer.json';

const Dashboard = () => {
    const { t } = useTranslation();
    
    // Simulating today's weather
    const weather = {
        temp: 32,
        condition: "Sunny with partial clouds",
        humidity: 65,
        wind: 15,
        icon: <Cloud size={48} className="text-blue-400" />,
        alert: "High humidity today. Monitor crops for fungal disease risk."
    };

    const recommendations = [
        { icon: <TrendingUp className="text-green-500" />, text: t('dashboard.recommendations.market_prices') },
        { icon: <Droplets className="text-blue-500" />, text: t('dashboard.recommendations.irrigation') },
        { icon: <Clock className="text-orange-500" />, text: t('dashboard.recommendations.soil_test') }
    ];

    const serviceCards = [
        { title: t('dashboard.soil_health.title'), icon: <FlaskConical className="text-green-500" />, link: "/soil-history", desc: t('dashboard.soil_health.desc') },
        { title: t('dashboard.yield_prediction.title'), icon: <BarChart3 className="text-yellow-500" />, link: "/predict-yield", desc: t('dashboard.yield_prediction.desc') },
        { title: t('dashboard.fertilizer_plan.title'), icon: <Briefcase className="text-blue-500" />, link: "/recommend-fertilizer", desc: t('dashboard.fertilizer_plan.desc') },
        { title: t('dashboard.crop_recommendation.title'), icon: <Leaf className="text-teal-500" />, link: "/recommend-crop", desc: t('dashboard.crop_recommendation.desc') },
        { title: t('dashboard.disease_detection.title'), icon: <Stethoscope className="text-red-500" />, link: "/disease-detection", desc: t('dashboard.disease_detection.desc') },
        { title: t('dashboard.market_prices.title'), icon: <TrendingUp className="text-purple-500" />, link: "/market-prices", desc: t('dashboard.market_prices.desc') }
    ];

    return (
        <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">{t('dashboard.welcome', { name: farmerData.personal.fullName.split(' ')[0] })}</h1>
                    <p className="text-gray-500 mb-8">{t('dashboard.subtitle')}</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* User & Farm Details */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <User className="text-green-600 mr-3" size={24} />
                            <h2 className="text-xl font-bold text-gray-800">{farmerData.personal.fullName}</h2>
                        </div>
                        <div className="space-y-2 text-gray-600">
                            <p><strong>{t('dashboard.email')}:</strong> {farmerData.personal.email}</p>
                            <p><strong>{t('dashboard.phone')}:</strong> {farmerData.personal.phone}</p>
                            <div className="pt-2">
                                <h3 className="font-semibold text-gray-700">{t('dashboard.farm_details')}</h3>
                                <p><strong>{t('dashboard.location')}:</strong> {farmerData.farm.city}, {farmerData.farm.state}</p>
                                <p><strong>{t('dashboard.land_area')}:</strong> {farmerData.farm.landAreaAcres} {t('dashboard.acres')}</p>
                                <p><strong>{t('dashboard.soil_type')}:</strong> {farmerData.farm.soilType}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Weather Alerts */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 mb-2">{t('dashboard.weather_alert')}</h2>
                                <p className="text-gray-600">{weather.condition}</p>
                            </div>
                            {weather.icon}
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 text-center">
                            <div className="bg-gray-100 p-3 rounded-lg">
                                <Thermometer className="mx-auto text-red-500 mb-1" />
                                <p className="font-bold text-lg">{weather.temp}°C</p>
                                <p className="text-sm text-gray-500">{t('dashboard.temperature')}</p>
                            </div>
                             <div className="bg-gray-100 p-3 rounded-lg">
                                <Droplets className="mx-auto text-blue-500 mb-1" />
                                <p className="font-bold text-lg">{weather.humidity}%</p>
                                <p className="text-sm text-gray-500">{t('dashboard.humidity')}</p>
                            </div>
                             <div className="bg-gray-100 p-3 rounded-lg">
                                <Wind className="mx-auto text-gray-500 mb-1" />
                                <p className="font-bold text-lg">{weather.wind} km/h</p>
                                <p className="text-sm text-gray-500">{t('dashboard.wind')}</p>
                            </div>
                        </div>
                        <div className="mt-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 rounded-md">
                            <p><strong>{t('dashboard.alert')}:</strong> {weather.alert}</p>
                        </div>
                    </motion.div>
                </div>

                {/* Recommendations Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('dashboard.recommendations.title')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {recommendations.map((rec, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                className="bg-white p-4 rounded-lg shadow-sm flex items-center"
                            >
                                <div className="flex-shrink-0 mr-4">{rec.icon}</div>
                                <p className="text-gray-700">{rec.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Service Cards Grid */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('dashboard.services_title')}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {serviceCards.map((card, index) => (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                            >
                                <Link to={card.link} className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                                    <div className="flex items-center mb-3">
                                        {card.icon}
                                        <h3 className="ml-3 text-lg font-bold text-gray-800">{card.title}</h3>
                                    </div>
                                    <p className="text-gray-600 text-sm">{card.desc}</p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;