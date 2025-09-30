import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BarChart3, FlaskConical, Stethoscope, Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FeatureCard = ({ icon, title, description, delay }) => (
    <motion.div
        className="rounded-xl bg-white p-6 text-center shadow-lg transition-transform duration-300 hover:-translate-y-2 h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay * 0.1 }}
    >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
            {icon}
        </div>
        <h3 className="mt-4 text-xl font-bold text-gray-800">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
    </motion.div>
);

const LandingPage = () => {
    const { t } = useTranslation();

    const features = [
        {
            icon: <BarChart3 size={32} />,
            title: t('landing.feature1.title'),
            description: t('landing.feature1.desc'),
            link: '/predict-yield'
        },
        {
            icon: <FlaskConical size={32} />,
            title: t('landing.feature2.title'),
            description: t('landing.feature2.desc'),
            link: '/recommend-fertilizer'
        },
        {
            icon: <Stethoscope size={32} />,
            title: t('landing.feature3.title'),
            description: t('landing.feature3.desc'),
            link: '/disease-detection'
        },
        {
            icon: <Lightbulb size={32} />,
            title: t('landing.feature4.title'),
            description: t('landing.feature4.desc'),
            link: '/recommend-crop'
        },
    ];

    const testimonials = t('landing.testimonials', { returnObjects: true }) || [];
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, [testimonials.length]);

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        if (testimonials.length > 1) {
            const timer = setTimeout(nextTestimonial, 5000); // Change testimonial every 5 seconds
            return () => clearTimeout(timer);
        }
    }, [currentIndex, nextTestimonial, testimonials.length]);

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-b from-green-50 to-white pt-20 pb-24 text-center">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                            {t('appName')}
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl">
                            {t('tagline')}
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <Link
                                to="/register"
                                className="transform rounded-full bg-green-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-green-700"
                            >
                                {t('landing.cta.main')}
                            </Link>
                            <Link
                                to="/labs"
                                className="transform rounded-full bg-white px-8 py-3 text-base font-semibold text-green-600 shadow-lg ring-1 ring-inset ring-gray-300 transition-transform duration-300 hover:scale-105 hover:bg-gray-50"
                            >
                                {t('landing.cta.secondary')}
                            </Link>
                        </div>
                    </motion.div>
                    <div className="mt-16">
                        <img src="https://placehold.co/1200x600/a7f3d0/14532d?text=Modern+Farming+Analytics&font=lora" alt="Modern Farming Analytics" className="rounded-lg shadow-xl" />
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
                            <Link to={feature.link} key={index} className="block">
                                <FeatureCard {...feature} delay={index + 1} />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Testimonial Section */}
            <section className="bg-green-50 py-20">
                <div className="container mx-auto max-w-4xl px-4 text-center relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p className="text-2xl font-medium text-gray-800">
                                "{testimonials[currentIndex]?.quote}"
                            </p>
                            <footer className="mt-6">
                                <p className="font-semibold text-gray-900">{testimonials[currentIndex]?.author}</p>
                                <p className="text-gray-600">{testimonials[currentIndex]?.location}</p>
                            </footer>
                        </motion.div>
                    </AnimatePresence>
                    
                    {testimonials.length > 1 && (
                        <>
                            <button onClick={prevTestimonial} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white transition-colors">
                                <ChevronLeft className="text-gray-700" />
                            </button>
                            <button onClick={nextTestimonial} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white transition-colors">
                                <ChevronRight className="text-gray-700" />
                            </button>
                        </>
                    )}
                </div>
            </section>
        </div>
    );
};

export default LandingPage;

