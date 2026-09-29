import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Login API
export const loginApi = async (data) => {
  const response = await axios.post(`${API_URL}/auth/login`, data);
  return response.data; // Expected to return { token, user }
};

// Get authenticated user API
export const getAuthApi = async (token) => {
  const response = await axios.get(`${API_URL}/auth/verifyToken`, {
    headers: { Authorization: `${token}` },
  });
  return response.data; // Expected to return user data
};