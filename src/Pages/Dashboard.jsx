import React from 'react';
import { useTranslation } from 'react-i18next';
import { Droplets, BarChart, FlaskConical, Sprout, Wheat } from 'lucide-react';
import { Link } from 'react-router-dom';
import farmerData from '../data/farmer.json'; // Sample farmer data

const DashboardCard = ({ icon, title, children, link, linkText, delay }) => (
  <div className="animate-fadeIn rounded-lg bg-surface p-6 shadow-md transition-transform duration-300 hover:-translate-y-1" style={{ animationDelay: `${delay * 100}ms` }}>
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-primary-light/20 p-3 text-primary">{icon}</div>
        <h3 className="text-xl font-semibold text-text">{title}</h3>
      </div>
    </div>
    <div className="text-text-muted">{children}</div>
    {link && (
      <div className="mt-4">
        <Link to={link} className="font-semibold text-primary transition-colors hover:text-primary-dark">
          {linkText} &rarr;
        </Link>
      </div>
    )}
  </div>
);

const Dashboard = () => {
  const { t } = useTranslation();
  const { name, soilHealth, yieldPrediction, fertilizerPlan, cropRecommendation } = farmerData;

  return (
    <div className="bg-background py-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-3xl font-bold tracking-tight text-text animate-fadeIn">
          {t('dashboard.welcome', { name })}
        </h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Soil Health Card */}
          <DashboardCard icon={<Droplets />} title={t('dashboard.soilHealth')} delay={1} link="/soil-records" linkText={t('dashboard.viewRecords')}>
            <p><strong>pH:</strong> {soilHealth.ph}</p>
            <p><strong>Organic Carbon:</strong> {soilHealth.organicCarbon}%</p>
            <p className="mt-2 text-sm text-secondary">{t('dashboard.retestReminder', { months: soilHealth.monthsToRetest })}</p>
          </DashboardCard>
          
          {/* Yield Prediction Card */}
          <DashboardCard icon={<BarChart />} title={t('dashboard.yieldPrediction')} delay={2}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm">{t('dashboard.crop')}</p>
                    <p className="text-lg font-medium">{yieldPrediction.crop}</p>
                </div>
                <div>
                    <p className="text-sm">{t('dashboard.predictedYield')}</p>
                    <p className="text-lg font-medium">{yieldPrediction.yield} tons/acre</p>
                </div>
                <Wheat size={32} className="text-yellow-500" />
            </div>
          </DashboardCard>

          {/* Fertilizer Plan Card */}
          <DashboardCard icon={<FlaskConical />} title={t('dashboard.fertilizerPlan')} delay={3} link="/fertilizer-plan" linkText={t('dashboard.viewPlan')}>
            <ul className="list-inside list-disc space-y-1">
                {Object.entries(fertilizerPlan.nutrients).map(([key, value]) => (
                    <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
            </ul>
          </DashboardCard>

          {/* Crop Recommendation Card */}
          <DashboardCard icon={<Sprout />} title={t('dashboard.cropRec')} delay={4}>
            <p className="mb-2 text-sm">{t('dashboard.nextSeason')}</p>
            <p className="text-2xl font-bold text-primary">{cropRecommendation.crop}</p>
            <p className="text-sm">Market Price: ₹{cropRecommendation.marketPrice}/quintal</p>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
