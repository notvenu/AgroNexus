import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search, TrendingUp } from 'lucide-react';

// Sample data - in a real app, this would come from an API
const allMarketData = [
    { crop: 'Wheat', price: 2200, unit: 'quintal', change: 1.5 },
    { crop: 'Mustard (Sarson)', price: 5600, unit: 'quintal', change: -0.8 },
    { crop: 'Paddy (Dhan)', price: 2050, unit: 'quintal', change: 2.1 },
    { crop: 'Cotton (Kapas)', price: 7500, unit: 'quintal', change: 0.5 },
    { crop: 'Soybean', price: 5200, unit: 'quintal', change: -1.2 },
    { crop: 'Maize', price: 1900, unit: 'quintal', change: 3.0 },
    { crop: 'Sugarcane', price: 350, unit: 'quintal', change: 0.0 },
    { crop: 'Tomato', price: 1500, unit: 'quintal', change: -5.5 },
    { crop: 'Onion', price: 1800, unit: 'quintal', change: 4.2 },
];

const MarketPrices = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = allMarketData.filter(item =>
        item.crop.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">{t('market_prices.title')}</h1>
                    <p className="text-gray-500 mb-6">{t('market_prices.subtitle')}</p>
                </motion.div>

                {/* Search Bar */}
                <div className="relative mb-8">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder={t('market_prices.search_placeholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                </div>

                {/* Prices Table */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-4 font-semibold text-gray-600">{t('market_prices.crop')}</th>
                                    <th className="p-4 font-semibold text-gray-600">{t('market_prices.price')}</th>
                                    <th className="p-4 font-semibold text-gray-600">{t('market_prices.change')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item, index) => (
                                    <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                                        <td className="p-4 font-medium text-gray-800">{item.crop}</td>
                                        <td className="p-4 text-gray-700">₹{item.price} / {item.unit}</td>
                                        <td className={`p-4 font-semibold ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            <div className="flex items-center">
                                                <TrendingUp size={16} className="mr-1" />
                                                {item.change >= 0 ? '+' : ''}{item.change}%
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
                {filteredData.length === 0 && (
                    <p className="text-center text-gray-500 mt-8">{t('market_prices.no_results')}</p>
                )}
            </div>
        </div>
    );
};

export default MarketPrices;