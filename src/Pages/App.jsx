import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

// Lazy load the page components with correct, case-sensitive paths
const LandingPage = React.lazy(() => import('./Landing.jsx'));
const Login = React.lazy(() => import('./Login.jsx'));
const Register = React.lazy(() => import('./Register.jsx'));
const Dashboard = React.lazy(() => import('./Dashboard.jsx'));
const LabDirectory = React.lazy(() => import('./LabDirectory.jsx'));
const DiseaseDetection = React.lazy(() => import('./DiseaseDetection.jsx'));
const AboutUs = React.lazy(() => import('./Aboutus.jsx'));
const ContactUs = React.lazy(() => import('./Contactus.jsx'));
const CropYieldPrediction = React.lazy(() => import('./CropYieldPrediction.jsx'));
const CropRecommendation = React.lazy(() => import('./CropRecommendation.jsx'));
const FertilizerRecommendation = React.lazy(() => import('./FertilizerRecommendation.jsx'));
const Chatbot = React.lazy(() => import('../components/Chatbot.jsx'));

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

