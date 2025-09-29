import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Search, FlaskConical } from 'lucide-react';
import labData from '../data/labs.json';

const LabCard = ({ lab }) => (
    <div className="transform animate-fadeIn rounded-lg bg-white p-5 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="flex items-start justify-between">
            <div>
                <h3 className="text-lg font-bold text-gray-800">{lab.name}</h3>
                <p className="mt-1 flex items-center text-sm text-gray-500">
                    <MapPin size={14} className="mr-2 shrink-0" />
                    {lab.address}
                </p>
            </div>
            <div className="ml-4 rounded-full bg-primary-light/20 p-3 text-primary">
                <FlaskConical size={20} />
            </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
            <p className="flex items-center text-sm text-gray-700">
                <Phone size={14} className="mr-2" />
                {lab.contact}
            </p>
            <button className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105">
                {/* {t('labs.book_now')} - This would need to be passed down or use context */}
                Book Now
            </button>
        </div>
    </div>
);

const LabDirectory = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLabs = useMemo(() => {
    if (!searchTerm) return labData;
    return labData.filter(lab =>
      lab.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lab.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="bg-gray-50 py-10">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center animate-fadeIn">
          <h1 className="text-4xl font-extrabold text-gray-900">{t('labs.title')}</h1>
          <p className="mt-4 text-lg text-gray-600">{t('labs.subtitle')}</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column: Search and List */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="relative">
                <Search className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('labs.search_placeholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-full border-gray-300 py-3 pl-11 pr-4 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
              <div className="mt-6 h-[60vh] space-y-4 overflow-y-auto pr-2">
                {filteredLabs.length > 0 ? (
                    filteredLabs.map(lab => <LabCard key={lab.id} lab={lab} />)
                ) : (
                    <p className="p-4 text-center text-gray-500">{t('labs.no_results')}</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Map */}
          <div className="h-96 rounded-lg bg-gray-300 shadow-lg lg:col-span-2 lg:h-auto">
             {/* This is a placeholder for a real map like Google Maps, Leaflet, etc. */}
             <div className="flex h-full w-full items-center justify-center rounded-lg bg-cover bg-center" style={{backgroundImage: "url('https://placehold.co/1000x800/e2e8f0/64748b?text=Map+of+India')"}}>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabDirectory;
