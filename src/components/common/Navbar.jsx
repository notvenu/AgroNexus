import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Leaf, ChevronDown, Menu, X, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

    useEffect(() => {
        const handleLanguageChange = () => {
            if (isMobileMenuOpen) setIsMobileMenuOpen(false);
        };
        i18n.on('languageChanged', handleLanguageChange);
        return () => i18n.off('languageChanged', handleLanguageChange);
    }, [i18n, isMobileMenuOpen]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleMobileLinkClick = () => setIsMobileMenuOpen(false);

    const handleMobileServicesToggle = (e) => {
        e.stopPropagation();
        setIsMobileServicesOpen(!isMobileServicesOpen);
    };

    const navLinkClass = ({ isActive }) => `font-semibold transition-colors duration-300 ${isActive ? 'text-green-600' : 'text-gray-600 hover:text-green-500'}`;
    const mobileNavLinkClass = ({ isActive }) => `block py-3 text-lg ${isActive ? 'text-green-600 font-bold' : 'text-gray-700 font-medium'}`;

    return (
        <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="flex items-center space-x-2 z-50">
                        <Leaf className="text-green-600" size={28} />
                        <span className="text-xl font-bold text-gray-800">{t('appName')}</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink to="/" className={navLinkClass} end>{t('nav.home')}</NavLink>
                        
                        <div className="relative" onMouseEnter={() => setIsDesktopDropdownOpen(true)} onMouseLeave={() => setIsDesktopDropdownOpen(false)}>
                            <button className="flex items-center font-semibold text-gray-600 hover:text-green-500">
                                {t('nav.services')}
                                <ChevronDown size={16} className={`ml-1 transition-transform ${isDesktopDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isDesktopDropdownOpen && (
                                <div className="absolute top-full left-0 pt-2">
                                    <div className="w-60 bg-white rounded-lg shadow-xl py-2">
                                        <NavLink to="/recommend-crop" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{t('nav.crop_recommendation')}</NavLink>
                                        <NavLink to="/predict-yield" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{t('nav.yield_prediction')}</NavLink>
                                        <NavLink to="/recommend-fertilizer" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{t('nav.fertilizer_recommendation')}</NavLink>
                                        <NavLink to="/disease-detection" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{t('nav.disease_detection')}</NavLink>
                                        <NavLink to="/market-prices" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{t('nav.market_prices')}</NavLink>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {isLoggedIn && <NavLink to="/dashboard" className={navLinkClass}>{t('nav.dashboard')}</NavLink>}
                        <NavLink to="/labs" className={navLinkClass}>{t('nav.labs')}</NavLink>
                        <NavLink to="/about" className={navLinkClass}>{t('nav.about')}</NavLink>
                        <NavLink to="/contact" className={navLinkClass}>{t('nav.contact')}</NavLink>
                    </div>

                    {/* Desktop Auth */}
                    <div className="hidden md:flex items-center space-x-4">
                        <LanguageSwitcher />
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className="flex items-center font-semibold text-gray-700 hover:text-red-600 transition-colors">
                                <LogOut size={18} className="mr-2"/>
                                {t('nav.logout')}
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className="font-semibold text-gray-700 hover:text-green-600 transition-colors">{t('nav.login')}</Link>
                                <Link to="/register" className="bg-green-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-green-700 transition-all">{t('nav.register')}</Link>
                            </>
                        )}
                    </div>
                    
                    {/* Mobile Menu Button */}
                    <div className="md:hidden z-50">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="md:hidden absolute top-0 left-0 w-full bg-white shadow-lg h-screen p-4 pt-20">
                        <div className="flex flex-col space-y-2">
                            <NavLink to="/" className={mobileNavLinkClass} end onClick={handleMobileLinkClick}>{t('nav.home')}</NavLink>
                            
                            <div onClick={(e) => e.stopPropagation()}>
                                <button onClick={handleMobileServicesToggle} className="w-full flex justify-between items-center py-3 text-lg text-gray-700 font-medium">
                                    <span>{t('nav.services')}</span>
                                    <ChevronDown size={20} className={`transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isMobileServicesOpen && (
                                    <div className="pl-4 border-l-2 border-green-200">
                                        <NavLink to="/recommend-crop" onClick={handleMobileLinkClick} className={`block ${mobileNavLinkClass({ isActive: false })} text-base`}>{t('nav.crop_recommendation')}</NavLink>
                                        <NavLink to="/predict-yield" onClick={handleMobileLinkClick} className={`block ${mobileNavLinkClass({ isActive: false })} text-base`}>{t('nav.yield_prediction')}</NavLink>
                                        <NavLink to="/recommend-fertilizer" onClick={handleMobileLinkClick} className={`block ${mobileNavLinkClass({ isActive: false })} text-base`}>{t('nav.fertilizer_recommendation')}</NavLink>
                                        <NavLink to="/disease-detection" onClick={handleMobileLinkClick} className={`block ${mobileNavLinkClass({ isActive: false })} text-base`}>{t('nav.disease_detection')}</NavLink>
                                        <NavLink to="/market-prices" onClick={handleMobileLinkClick} className={`block ${mobileNavLinkClass({ isActive: false })} text-base`}>{t('nav.market_prices')}</NavLink>
                                    </div>
                                )}
                            </div>

                            {isLoggedIn && <NavLink to="/dashboard" className={mobileNavLinkClass} onClick={handleMobileLinkClick}>{t('nav.dashboard')}</NavLink>}
                            <NavLink to="/labs" className={mobileNavLinkClass} onClick={handleMobileLinkClick}>{t('nav.labs')}</NavLink>
                            <NavLink to="/about" className={mobileNavLinkClass} onClick={handleMobileLinkClick}>{t('nav.about')}</NavLink>
                            <NavLink to="/contact" className={mobileNavLinkClass} onClick={handleMobileLinkClick}>{t('nav.contact')}</NavLink>
                            
                            <div className="border-t border-gray-200 pt-6 space-y-4">
                                <div className="flex justify-between items-center" onClick={(e) => e.stopPropagation()}>
                                    <span className="text-gray-700 font-medium">Language</span>
                                    <LanguageSwitcher />
                                </div>
                                {isLoggedIn ? (
                                    <button onClick={() => { handleMobileLinkClick(); handleLogout(); }} className="w-full text-center flex items-center justify-center font-semibold text-red-600 py-3 rounded-lg border border-red-300">
                                      <LogOut size={20} className="mr-2"/> {t('nav.logout')}
                                    </button>
                                ) : (
                                    <div className="flex flex-col space-y-3">
                                        <Link to="/login" onClick={handleMobileLinkClick} className="w-full text-center font-semibold text-gray-700 hover:text-green-600 py-3 rounded-lg border border-gray-300">{t('nav.login')}</Link>
                                        <Link to="/register" onClick={handleMobileLinkClick} className="w-full text-center bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700">{t('nav.register')}</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

