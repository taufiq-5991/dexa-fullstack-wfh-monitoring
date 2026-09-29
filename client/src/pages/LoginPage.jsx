import React, { useEffect } from 'react';
import LoginForm from '../components/Auth/LoginForm';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard'); // Redirect to dashboard if already logged in
    }
  }, [user, navigate]);

  const handleLogin = async (username, password) => {
    try {
      await login(username, password); // Call login from AuthContext
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid username or password. Please try again.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;