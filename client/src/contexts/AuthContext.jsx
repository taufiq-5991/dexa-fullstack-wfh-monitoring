import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginApi, getAuthApi } from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      getAuthApi(token)
        .then(setUser)
        .catch(() => logout());
    }
  }, [token]);

  const login = async (username, password) => {
    try {
      const { token, user } = await loginApi({ username, password });
      setToken(token);
      setUser(user);
      localStorage.setItem('token', token); // Save token to localStorage
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Rethrow error to handle it in the login form
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token'); // Remove token from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);