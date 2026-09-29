import React from 'react';
import LoginForm from '../components/Auth/LoginForm';

const LoginPage = () => {
  const handleLogin = () => {
    window.location.href = '/attendance';
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;