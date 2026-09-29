import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AdminMonitoringPage from './pages/AdminMonitoringPage';
import ProtectedRoute from './components/Shared/ProtectedRoute';
import Header from './components/Shared/Header';
import Sidebar from './components/Shared/Sidebar';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <AuthProvider>
      <Router>
        <Header toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} />
        <main>
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