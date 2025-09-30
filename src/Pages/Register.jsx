import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, MapPin, Compass, Home, Key, ChevronsRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const soilTypes = ["Alluvial", "Black", "Red", "Laterite", "Arid", "Forest", "Peat", "Saline"];
const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", 
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", 
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", 
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", 
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

// Components defined outside to prevent re-rendering issues
const InputField = ({ icon, name, type, placeholder, value, onChange }) => (
    <div className="relative flex items-center mb-4">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
        />
    </div>
);

const SelectField = ({ icon, name, value, onChange, children }) => (
    <div className="relative flex items-center mb-4">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
        <select
            name={name}
            value={value}
            onChange={onChange}
            required
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 appearance-none"
        >
            {children}
        </select>
    </div>
);

const Register = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        password: '',
        state: '',
        district: '',
        city: '',
        pincode: '',
        landArea: '',
        soilType: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you would send formData to your backend API here
        console.log('Form Submitted:', formData);
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
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('register.create_account')}</h2>
                    <p className="text-gray-500 mb-6">{t('register.join_community')}</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                            <InputField icon={<User size={18} />} name="fullName" type="text" placeholder={t('register.full_name')} value={formData.fullName} onChange={handleChange} />
                            <InputField icon={<Phone size={18} />} name="phone" type="tel" placeholder={t('register.phone_number')} value={formData.phone} onChange={handleChange} />
                        </div>
                        <InputField icon={<Mail size={18} />} name="email" type="email" placeholder={t('register.email')} value={formData.email} onChange={handleChange} />
                        <InputField icon={<Lock size={18} />} name="password" type="password" placeholder={t('register.password')} value={formData.password} onChange={handleChange} />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                           <SelectField icon={<MapPin size={18} />} name="state" value={formData.state} onChange={handleChange}>
                                <option value="">{t('register.select_state')}</option>
                                {indianStates.map(s => <option key={s} value={s}>{s}</option>)}
                           </SelectField>
                           <InputField icon={<Compass size={18} />} name="district" type="text" placeholder={t('register.district')} value={formData.district} onChange={handleChange} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                          <InputField icon={<Home size={18} />} name="city" type="text" placeholder={t('register.city_village')} value={formData.city} onChange={handleChange} />
                          <InputField icon={<Key size={18} />} name="pincode" type="text" placeholder={t('register.pincode')} value={formData.pincode} onChange={handleChange} />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                          <InputField icon={<ChevronsRight size={18} />} name="landArea" type="number" placeholder={t('register.land_area_acres')} value={formData.landArea} onChange={handleChange} />
                           <SelectField icon={<Compass size={18} />} name="soilType" value={formData.soilType} onChange={handleChange}>
                                <option value="">{t('register.select_soil_type')}</option>
                                {soilTypes.map(type => <option key={type} value={type}>{type}</option>)}
                           </SelectField>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 mt-4"
                        >
                            {t('register.register_button')}
                        </motion.button>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        {t('register.already_have_account')} <Link to="/login" className="font-semibold text-green-600 hover:underline">{t('login.button_login')}</Link>
                    </p>
                </div>
                
                <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{backgroundImage: "url('https://placehold.co/800x1200/22c55e/ffffff?text=Smart+Farm\\nAdvisory&font=lora')"}}>
                    {/* Background Image */}
                </div>
            </motion.div>
        </div>
    );
};

export default Register;

