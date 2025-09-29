import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Pages/Navbar';
import Footer from './Pages/Footer';
import LoadingSpinner from './Pages/LoadingSpinner';
import Chatbot from './Pages/Chatbot';

// Lazy load pages for better performance
const Dashboard = React.lazy(() => import('./Pages/DashboardPage'));
const LabDirectory = React.lazy(() => import('./Pages/LabDirectoryPage'));
const DiseaseDetection = React.lazy(() => import('./Pages/DiseaseDetection'));
const Login = React.lazy(() => import('./Pages/Login'));
const LandingPage = React.lazy(() => import('./Pages/LandingPage'));
//const AdminPanel = React.lazy(() => import('./Pages/AdminPanel'));


function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/labs" element={<LabDirectory />} />
              <Route path="/disease-detection" element={<DiseaseDetection />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;

