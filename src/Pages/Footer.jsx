import React from 'react';
import { useTranslation } from 'react-i18next';
import { Leaf } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="mt-12 bg-slate-800 text-slate-300">
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary-light" />
            <span className="text-lg font-semibold text-white">{t('appName')}</span>
          </div>
          <p className="text-center text-sm">
            &copy; {new Date().getFullYear()} {t('appName')}. All Rights Reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
    