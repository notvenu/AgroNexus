import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import newsData from '../data/news.json'; // Importing the local news data

const NewsPage = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('regional');
    const [filteredNews, setFilteredNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // Simulate an API call
        setTimeout(() => {
            const news = newsData.filter(article => article.category === activeTab);
            setFilteredNews(news);
            setLoading(false);
        }, 300); // Short delay to show loading state
    }, [activeTab]);

    const tabs = ['regional', 'national', 'international'];

    const NewsCard = ({ article }) => (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
            <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
            <div className="p-6">
                <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                    <span>{article.source}</span>
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{article.title}</h3>
                <p className="text-gray-600">{article.summary}</p>
            </div>
        </motion.div>
    );

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto max-w-7xl px-4 py-8 sm:py-12">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{t('news.title')}</h1>
                    <p className="text-lg text-gray-600 mb-8">{t('news.subtitle')}</p>
                </motion.div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-8">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-lg font-semibold transition-colors duration-300 relative ${activeTab === tab ? 'text-green-600' : 'text-gray-500 hover:text-green-500'}`}
                        >
                            {t(`news.${tab}`)}
                            {activeTab === tab && (
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"
                                    layoutId="underline"
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* News Grid */}
                <AnimatePresence mode="wait">
                    {loading ? (
                         <motion.div key="loader" className="text-center p-10">
                            <p>{t('news.loading')}</p>
                         </motion.div>
                    ) : (
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredNews.map((article, index) => (
                                <NewsCard key={index} article={article} />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default NewsPage;
