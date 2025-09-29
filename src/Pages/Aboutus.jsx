import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Target, Users, HeartHandshake, BrainCircuit } from 'lucide-react';

const AboutUs = () => {
    const { t } = useTranslation();

    const teamMembers = [
        { name: 'Dr. Alisha Verma', role: t('about.team.role1'), image: 'https://placehold.co/400x400/a7f3d0/14532d?text=AV' },
        { name: 'Rohan Sharma', role: t('about.team.role2'), image: 'https://placehold.co/400x400/a7f3d0/14532d?text=RS' },
        { name: 'Priya Mehta', role: t('about.team.role3'), image: 'https://placehold.co/400x400/a7f3d0/14532d?text=PM' },
    ];

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.5,
            },
        }),
    };

    return (
        <div className="bg-white">
            {/* Header */}
            <div className="bg-green-50 py-20 text-center">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-extrabold text-gray-800"
                >
                    {t('about.title')}
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto px-4"
                >
                    {t('about.subtitle')}
                </motion.p>
            </div>

            {/* Our Mission Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div initial="hidden" animate="visible" custom={1} variants={fadeIn}>
                        <img src="https://placehold.co/600x400/dcfce7/166534?text=Our+Mission" alt="Our Mission" className="rounded-lg shadow-lg" />
                    </motion.div>
                    <motion.div initial="hidden" animate="visible" custom={2} variants={fadeIn}>
                        <div className="flex items-center text-green-600 mb-2">
                            <Target size={24} className="mr-2" />
                            <h3 className="text-xl font-semibold">{t('about.mission.heading')}</h3>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('about.mission.title')}</h2>
                        <p className="text-gray-600 leading-relaxed">{t('about.mission.text')}</p>
                    </motion.div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="bg-gray-50 py-16">
                 <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-12">{t('about.values.title')}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeIn} className="p-6">
                            <HeartHandshake size={40} className="mx-auto text-green-600 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">{t('about.values.value1_title')}</h3>
                            <p className="text-gray-600">{t('about.values.value1_text')}</p>
                        </motion.div>
                         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeIn} className="p-6">
                            <BrainCircuit size={40} className="mx-auto text-green-600 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">{t('about.values.value2_title')}</h3>
                            <p className="text-gray-600">{t('about.values.value2_text')}</p>
                        </motion.div>
                         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3} variants={fadeIn} className="p-6">
                            <Users size={40} className="mx-auto text-green-600 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">{t('about.values.value3_title')}</h3>
                            <p className="text-gray-600">{t('about.values.value3_text')}</p>
                        </motion.div>
                    </div>
                 </div>
            </section>

             {/* Our Team Section */}
             <section className="py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-12">{t('about.team.title')}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                             <motion.div key={index} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={index} variants={fadeIn} className="text-center">
                                <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 shadow-md" />
                                <h3 className="text-xl font-semibold">{member.name}</h3>
                                <p className="text-green-600">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
