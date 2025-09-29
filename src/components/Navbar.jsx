import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageToggle';
import { Leaf, ChevronDown } from 'lucide-react';

const Navbar = () => {
    const { t } = useTranslation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const navLinkClass = ({ isActive }) =>
        `font-semibold transition-colors duration-300 ${isActive ? 'text-green-600' : 'text-gray-600 hover:text-green-500'}`;

    return (
        <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="flex items-center space-x-2">
                        <Leaf className="text-green-600" size={28} />
                        <span className="text-xl font-bold text-gray-800">{t('appName')}</span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink to="/" className={navLinkClass} end>{t('nav.home')}</NavLink>
                        
                        {/* Services Dropdown */}
                        <div className="relative" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                            <button className="flex items-center font-semibold text-gray-600 hover:text-green-500">
                                {t('nav.services')}
                                <ChevronDown size={16} className={`ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isDropdownOpen && (
                                // This container has padding to bridge the gap, preventing the menu from closing prematurely.
                                <div className="absolute top-full left-0 pt-2">
                                    <div className="w-60 bg-white rounded-lg shadow-xl py-2">
                                        <NavLink to="/recommend-crop" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{t('nav.crop_recommendation')}</NavLink>
                                        <NavLink to="/predict-yield" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{t('nav.yield_prediction')}</NavLink>
                                        <NavLink to="/recommend-fertilizer" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{t('nav.fertilizer_recommendation')}</NavLink>
                                        <NavLink to="/disease-detection" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{t('nav.disease_detection')}</NavLink>
                                    </div>
                                </div>
                            )}
                        </div>

                        <NavLink to="/dashboard" className={navLinkClass}>{t('nav.dashboard')}</NavLink>
                        <NavLink to="/labs" className={navLinkClass}>{t('nav.labs')}</NavLink>
                        <NavLink to="/about" className={navLinkClass}>{t('nav.about')}</NavLink>
                        <NavLink to="/contact" className={navLinkClass}>{t('nav.contact')}</NavLink>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <LanguageSwitcher />
                        <Link to="/login" className="font-semibold text-gray-700 hover:text-green-600 transition-colors">
                            {t('nav.login')}
                        </Link>
                        <Link to="/register" className="bg-green-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-green-700 transition-all">
                            {t('nav.register')}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

