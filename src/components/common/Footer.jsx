import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Leaf, Twitter, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 py-12">
                {/* Adjusted grid to accommodate 5 columns on medium screens and up */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {/* Brand Section (spans 2 columns on mobile, 1 on md) */}
                    <div className="col-span-2 md:col-span-1">
                         <Link to="/" className="flex items-center space-x-2 mb-4">
                            <Leaf size={28} />
                            <span className="text-xl font-bold">{t('appName')}</span>
                        </Link>
                        <p className="text-gray-400 text-sm">{t('tagline')}</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">{t('footer.quick_links')}</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="text-gray-400 hover:text-white">{t('nav.about')}</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-white">{t('nav.contact')}</Link></li>
                            <li><Link to="/labs" className="text-gray-400 hover:text-white">{t('nav.labs')}</Link></li>
                        </ul>
                    </div>
                    
                    {/* Services Section */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">{t('nav.services')}</h3>
                        <ul className="space-y-2">
                            <li><Link to="/recommend-crop" className="text-gray-400 hover:text-white">{t('nav.crop_recommendation')}</Link></li>
                            <li><Link to="/predict-yield" className="text-gray-400 hover:text-white">{t('nav.yield_prediction')}</Link></li>
                            <li><Link to="/recommend-fertilizer" className="text-gray-400 hover:text-white">{t('nav.fertilizer_recommendation')}</Link></li>
                            <li><Link to="/disease-detection" className="text-gray-400 hover:text-white">{t('nav.disease_detection')}</Link></li>
                            <li><Link to="/market-prices" className="text-gray-400 hover:text-white">{t('nav.market_prices')}</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                     <div>
                        <h3 className="font-semibold text-lg mb-4">{t('footer.legal')}</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white">{t('footer.privacy')}</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">{t('footer.terms')}</a></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                         <h3 className="font-semibold text-lg mb-4">{t('footer.follow_us')}</h3>
                         <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white"><Twitter size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><Facebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><Instagram size={20} /></a>
                         </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} {t('appName')}. {t('footer.rights_reserved')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

