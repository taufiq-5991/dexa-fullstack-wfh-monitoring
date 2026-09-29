import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getEmployees = async () => {
  const response = await axios.get(`${API_URL}/admin-monitoring`, {
    headers: { Authorization: `${localStorage.getItem('token')}` },
  });
  return response.data;
};

export const createEmployee = async (data) => {
  const response = await axios.post(`${API_URL}/admin-monitoring`, data, {
    headers: { Authorization: `${localStorage.getItem('token')}` },
  });
  return response.data;
};