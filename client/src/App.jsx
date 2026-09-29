import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AdminMonitoringPage from './pages/AdminMonitoringPage';
import ProtectedRoute from './components/Shared/ProtectedRoute';
import Header from './components/Shared/Header';
import Navbar from './components/Shared/Navbar';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header  style={{ margin: '25px', width: '90%' }} />
        <Navbar/>
        <main style={{ margin: '25px', width: '90%'}}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-monitoring"
              element={
                <ProtectedRoute>
                  <AdminMonitoringPage />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
};

export default App;