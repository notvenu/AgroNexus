import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load the page components
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Registeration'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const LabDirectory = React.lazy(() => import('./pages/LabDirectory'));
const DiseaseDetection = React.lazy(() => import('./pages/DiseaseDetection'));
const AboutUs = React.lazy(() => import('./pages/Aboutus'));
const ContactUs = React.lazy(() => import('./pages/Contactus'));
const CropYieldPrediction = React.lazy(() => import('./pages/CropYieldPrediction'));
const CropRecommendation = React.lazy(() => import('./pages/CropRecommendation'));
const FertilizerRecommendation = React.lazy(() => import('./pages/FertilizerRecommendation'));
const Chatbot = React.lazy(() => import('./components/Chatbot'));

const AppContent = () => {
  const location = useLocation();
  const noNavFooterPaths = ['/login', '/register'];

  return (
    <div className="flex flex-col min-h-screen">
      {!noNavFooterPaths.includes(location.pathname) && <Navbar />}
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
          </Routes>
        </Suspense>
      </main>
      <Chatbot />
      {!noNavFooterPaths.includes(location.pathname) && <Footer />}
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

