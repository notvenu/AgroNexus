import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactUs = () => {
    const { t } = useTranslation();

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Message sent successfully!');
    };

    return (
        <div className="bg-gray-50">
            <div className="text-center py-20 bg-white">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">{t('contact.title')}</h1>
                <p className="mt-4 text-lg text-gray-600">{t('contact.subtitle')}</p>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-8 rounded-lg shadow-lg"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('contact.info_title')}</h2>
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                    <MapPin size={20} />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold">{t('contact.address_title')}</h3>
                                    <p className="text-gray-600">{t('contact.address_detail')}</p>
                                </div>
                            </div>
                             <div className="flex items-start">
                                <div className="flex-shrink-0 w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                    <Mail size={20} />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold">{t('contact.email_title')}</h3>
                                    <p className="text-gray-600 hover:text-green-600 transition"><a href="mailto:contact@cropadvisory.com">{t('contact.email_detail')}</a></p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                    <Phone size={20} />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold">{t('contact.phone_title')}</h3>
                                    <p className="text-gray-600 hover:text-green-600 transition"><a href="tel:+911234567890">{t('contact.phone_detail')}</a></p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white p-8 rounded-lg shadow-lg"
                    >
                         <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('contact.form_title')}</h2>
                         <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="sr-only">{t('contact.form_name')}</label>
                                <input type="text" id="name" placeholder={t('contact.form_name')} required className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">{t('contact.form_email')}</label>
                                <input type="email" id="email" placeholder={t('contact.form_email')} required className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                            </div>
                            <div>
                                <label htmlFor="message" className="sr-only">{t('contact.form_message')}</label>
                                <textarea id="message" rows="5" placeholder={t('contact.form_message')} required className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"></textarea>
                            </div>
                             <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300">
                                {t('contact.form_submit')}
                            </button>
                         </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
