import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageToggle';
import { Leaf } from 'lucide-react';

const Navbar = () => {
  const { t } = useTranslation();

  const navLinkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'bg-primary text-white'
        : 'text-text hover:bg-green-100 hover:text-primary-dark'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-surface/80 shadow-sm backdrop-blur-lg">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex flex-shrink-0 items-center gap-2">
              <Leaf className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold tracking-tight text-text">
                {t('appName')}
              </span>
            </Link>
          </div>
          <nav className="hidden items-center space-x-4 md:flex">
            <NavLink to="/dashboard" className={navLinkClass}>
              {t('nav.dashboard')}
            </NavLink>
            <NavLink to="/labs" className={navLinkClass}>
              {t('nav.labs')}
            </NavLink>
            <NavLink to="/disease-detection" className={navLinkClass}>
              {t('nav.diseaseDetection')}
            </NavLink>
          </nav>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link
              to="/login"
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-105 hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {t('nav.login')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
