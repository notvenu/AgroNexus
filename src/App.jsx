import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';
import Chatbot from './components/chatbot/Chatbot';

// Lazy load the page components
const LandingPage = React.lazy(() => import('./Pages/LandingPage.jsx'));
const Login = React.lazy(() => import('./Pages/Login.jsx'));
const Register = React.lazy(() => import('./Pages/Register.jsx'));
const Dashboard = React.lazy(() => import('./Pages/Dashboard.jsx'));
const LabDirectory = React.lazy(() => import('./Pages/LabDirectory.jsx'));
const DiseaseDetection = React.lazy(() => import('./Pages/DiseaseDetection.jsx'));
const AboutUs = React.lazy(() => import('./Pages/AboutUs.jsx'));
const ContactUs = React.lazy(() => import('./Pages/ContactUs.jsx'));
const CropYieldPrediction = React.lazy(() => import('./Pages/CropYieldPrediction.jsx'));
const CropRecommendation = React.lazy(() => import('./Pages/CropRecommendation.jsx'));
const FertilizerRecommendation = React.lazy(() => import('./Pages/FertilizerRecommendation.jsx'));
const MarketPrices = React.lazy(() => import('./Pages/MarketPrices.jsx')); // New import

const AppContent = () => {
    const location = useLocation();
    const noNavFooterPaths = ['/login', '/register'];
    const showNavAndFooter = !noNavFooterPaths.includes(location.pathname);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {showNavAndFooter && <Navbar />}
            <main className="flex-grow">
                <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/labs" element={<LabDirectory />} />
                        <Route path="/disease-detection" element={<DiseaseDetection />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/contact" element={<ContactUs />} />
                        <Route path="/predict-yield" element={<CropYieldPrediction />} />
                        <Route path="/recommend-crop" element={<CropRecommendation />} />
                        <Route path="/recommend-fertilizer" element={<FertilizerRecommendation />} />
                        <Route path="/market-prices" element={<MarketPrices />} /> {/* New Route */}
                    </Routes>
                </Suspense>
            </main>
            <Chatbot />
            {showNavAndFooter && <Footer />}
        </div>
    );
};

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;

