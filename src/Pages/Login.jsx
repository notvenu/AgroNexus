import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
    const { t } = useTranslation();

    const InputField = ({ icon, type, placeholder }) => (
        <div className="relative flex items-center mb-4">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                {icon}
            </div>
            <input
                type={type}
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
            />
        </div>
    );

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden md:flex flex-row-reverse"
            >
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('login.title_login')}</h2>
                    <p className="text-gray-500 mb-6">{t('login.login_to_continue')}</p>
                    
                    <form className="space-y-4">
                        <InputField icon={<Mail size={18} />} type="email" placeholder={t('register.email')} />
                        <InputField icon={<Lock size={18} />} type="password" placeholder={t('register.password')} />

                        <div className="flex items-center justify-end">
                            <div className="text-sm">
                                <a href="#" className="font-medium text-green-600 hover:underline">
                                    {t('login.forgot_password')}
                                </a>
                            </div>
                        </div>

                        <Link to="/dashboard">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300"
                            >
                                {t('login.button_login')}
                            </motion.button>
                        </Link>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        {t('login.no_account')}{' '}
                        <Link to="/register" className="font-semibold text-green-600 hover:underline">
                            {t('register.register_now')}
                        </Link>
                    </p>
                </div>
                
                <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{backgroundImage: "url('https://placehold.co/800x1200/22c55e/ffffff?text=AgroNexus&font=lora')"}}>
                    {/* Background Image */}
                </div>
            </motion.div>
        </div>
    );
};

export default Login;

