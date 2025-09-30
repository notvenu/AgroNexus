import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FlaskConical, Calendar, Microscope, MapPin } from 'lucide-react';
import farmerData from '../data/farmer.json';

const SoilTestHistoryPage = () => {
    const { t } = useTranslation();
    const soilRecords = farmerData.soil_records;

    // Helper to format dates
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString();
    
    // Helper to calculate time until next test
    const timeUntilNextTest = (dueDate) => {
        const due = new Date(dueDate);
        const now = new Date();
        const diffMonths = (due.getFullYear() - now.getFullYear()) * 12 + (due.getMonth() - now.getMonth());
        return diffMonths > 0 ? `${diffMonths} ${t('soil_history.months')}` : t('soil_history.due_now');
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto max-w-7xl px-4 py-8 sm:py-12">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{t('soil_history.title')}</h1>
                    <p className="text-lg text-gray-600 mb-8">{t('soil_history.subtitle')}</p>
                </motion.div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b-2 border-gray-200">
                                <tr>
                                    <th className="p-4 text-sm font-semibold text-gray-600">{t('soil_history.test_id')}</th>
                                    <th className="p-4 text-sm font-semibold text-gray-600">{t('soil_history.date')}</th>
                                    <th className="p-4 text-sm font-semibold text-gray-600">{t('soil_history.lab')}</th>
                                    <th className="p-4 text-sm font-semibold text-gray-600 text-center">{t('soil_history.ph')}</th>
                                    <th className="p-4 text-sm font-semibold text-gray-600 text-center">{t('soil_history.organic_carbon')}</th>
                                    <th className="p-4 text-sm font-semibold text-gray-600 text-center">{t('soil_history.nitrogen')}</th>
                                    <th className="p-4 text-sm font-semibold text-gray-600 text-center">{t('soil_history.phosphorus')}</th>
                                    <th className="p-4 text-sm font-semibold text-gray-600 text-center">{t('soil_history.potassium')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {soilRecords.map((record, index) => (
                                    <motion.tr
                                        key={record.test_id}
                                        className="border-b border-gray-100"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <td className="p-4 font-medium text-gray-800">{record.test_id}</td>
                                        <td className="p-4 text-gray-600">{formatDate(record.date)}</td>
                                        <td className="p-4 text-gray-600">{record.lab}</td>
                                        <td className="p-4 text-gray-800 font-semibold text-center">{record.ph}</td>
                                        <td className="p-4 text-gray-600 text-center">{record.organic_carbon_percent}%</td>
                                        <td className="p-4 text-gray-600 text-center">{record.nitrogen_kg_ha} kg/ha</td>
                                        <td className="p-4 text-gray-600 text-center">{record.phosphorus_kg_ha} kg/ha</td>
                                        <td className="p-4 text-gray-600 text-center">{record.potassium_kg_ha} kg/ha</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {soilRecords.length > 0 && (
                        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                            <p className="font-semibold text-green-800">
                                {t('soil_history.next_test_due')}: {timeUntilNextTest(soilRecords[0].next_test_due)}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SoilTestHistoryPage;