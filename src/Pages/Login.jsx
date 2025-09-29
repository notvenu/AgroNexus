import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Lock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);

  const InputField = ({ icon, type, placeholder }) => (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        {icon}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="block w-full rounded-md border-gray-300 py-3 pl-10 pr-3 shadow-sm focus:border-primary focus:ring-primary"
      />
    </div>
  );

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="transform animate-fadeIn rounded-xl bg-white p-8 shadow-2xl transition-transform duration-500 hover:scale-105">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              {isLogin ? t('login.title_login') : t('login.title_register')}
            </h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <div className="space-y-4 rounded-md shadow-sm">
              {!isLogin && (
                <InputField
                  icon={<User className="h-5 w-5 text-gray-400" />}
                  type="text"
                  placeholder={t('login.name_placeholder')}
                />
              )}
              <InputField
                icon={<Mail className="h-5 w-5 text-gray-400" />}
                type="email"
                placeholder={t('login.email_placeholder')}
              />
              <InputField
                icon={<Lock className="h-5 w-5 text-gray-400" />}
                type="password"
                placeholder={t('login.password_placeholder')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-primary-dark">
                  {t('login.forgot_password')}
                </a>
              </div>
            </div>

            <div>
              <Link to="/dashboard">
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary py-3 px-4 text-sm font-medium text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {isLogin ? t('login.button_login') : t('login.button_register')}
                </button>
              </Link>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? t('login.no_account') : t('login.has_account')}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium text-primary hover:text-primary-dark"
              >
                {isLogin ? t('login.switch_to_register') : t('login.switch_to_login')}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
