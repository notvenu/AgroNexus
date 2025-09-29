import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BarChart3, FlaskConical, Stethoscope, Lightbulb, CheckCircle } from 'lucide-react';

const FeatureCard = ({ icon, title, description, delay }) => (
  <div
    className="transform animate-fadeIn rounded-xl bg-white p-6 text-center shadow-lg transition-transform duration-300 hover:-translate-y-2"
    style={{ animationDelay: `${delay * 150}ms`, opacity: 0, animationFillMode: 'forwards' }}
  >
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-light/20 text-primary">
      {icon}
    </div>
    <h3 className="mt-4 text-xl font-bold text-gray-800">{title}</h3>
    <p className="mt-2 text-gray-600">{description}</p>
  </div>
);

const LandingPage = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <BarChart3 size={32} />,
      title: t('landing.feature1.title'),
      description: t('landing.feature1.desc'),
    },
    {
      icon: <FlaskConical size={32} />,
      title: t('landing.feature2.title'),
      description: t('landing.feature2.desc'),
    },
    {
      icon: <Stethoscope size={32} />,
      title: t('landing.feature3.title'),
      description: t('landing.feature3.desc'),
    },
    {
      icon: <Lightbulb size={32} />,
      title: t('landing.feature4.title'),
      description: t('landing.feature4.desc'),
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-green-50 to-white pt-20 pb-24 text-center">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fadeIn" style={{ animationDelay: '100ms', opacity: 0 }}>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              {t('appName')}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl">
              {t('tagline')}
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                to="/dashboard"
                className="transform rounded-full bg-primary px-8 py-3 text-base font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-primary-dark"
              >
                {t('landing.cta.main')}
              </Link>
              <Link
                to="/labs"
                className="transform rounded-full bg-white px-8 py-3 text-base font-semibold text-primary shadow-lg ring-1 ring-inset ring-gray-300 transition-transform duration-300 hover:scale-105 hover:bg-gray-50"
              >
                {t('landing.cta.secondary')}
              </Link>
            </div>
          </div>
          <div className="mt-16">
            {/* You can place a large, appealing image of a farm or technology here */}
            [Image of a modern farm with digital data overlays]
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-28">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('landing.featuresTitle')}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {t('landing.featuresSubtitle')}
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} delay={index + 1} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="bg-green-50 py-20">
          <div className="container mx-auto max-w-3xl px-4 text-center">
              <div className="animate-fadeIn" style={{ animationDelay: '300ms', opacity: 0 }}>
                  <p className="text-2xl font-medium text-gray-800">
                      "{t('landing.testimonial.quote')}"
                  </p>
                  <footer className="mt-6">
                      <p className="font-semibold text-gray-900">{t('landing.testimonial.author')}</p>
                      <p className="text-gray-600">{t('landing.testimonial.location')}</p>
                  </footer>
              </div>
          </div>
      </section>
    </div>
  );
};

export default LandingPage;
