import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// InputField component defined outside to prevent re-rendering issues
const InputField = ({ icon, name, type, placeholder }) => (
    <div className="relative flex items-center mb-6">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            required
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
        />
    </div>
);

const Login = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { login } = useAuth(); // Get the login function

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you would validate credentials with a backend API
        login(); // Set the login state to true
        navigate('/dashboard'); // Redirect to dashboard
    };

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden md:flex"
            >
                <div className="w-full md:w-1/2 p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('login.title_login')}</h2>
                    <p className="text-gray-500 mb-8">{t('login.login_to_continue')}</p>
                    
                    <form onSubmit={handleSubmit}>
                        <InputField icon={<Mail size={20} />} name="email" type="email" placeholder={t('login.email_placeholder')} />
                        <InputField icon={<Lock size={20} />} name="password" type="password" placeholder={t('login.password_placeholder')} />
                        
                        <div className="flex items-center justify-between mb-6">
                            <a href="#" className="text-sm font-semibold text-green-600 hover:underline">{t('login.forgot_password')}</a>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300"
                        >
                            {t('login.button_login')}
                        </motion.button>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-8">
                        {t('login.no_account')} <Link to="/register" className="font-semibold text-green-600 hover:underline">{t('login.switch_to_register')}</Link>
                    </p>
                </div>
                
                <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{backgroundImage: "url('https://placehold.co/800x1200/16a34a/ffffff?text=AgroNexus&font=lora')"}}>
                    {/* Background Image */}
                </div>
            </motion.div>
        </div>
    );
};

export default Login;

