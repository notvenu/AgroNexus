import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import LabDirectoryPage from '../pages/LabDirectoryPage';
import DiseaseDetectionPage from '../pages/DiseaseDetectionPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRouter = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/labs" element={<LabDirectoryPage />} />
          <Route path="/disease-detection" element={<DiseaseDetectionPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

export default AppRouter;