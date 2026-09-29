import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_URL_VERSION}`;

export const getEmployees = async () => {
  const response = await axios.get(`${API_URL}/admin-monitoring`, {
    headers: { Authorization: `${localStorage.getItem('token')}` },
  });
  return response.data;
};

export const getEmployeesDetail = async (id) => {
  const response = await axios.get(`${API_URL}/admin-monitoring/${id}`, {
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

export const updateEmployee = async (id, data) => {
  const response = await axios.put(`${API_URL}/admin-monitoring/${id}`, data, {
    headers: { Authorization: `${localStorage.getItem('token')}` },
  });
  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await axios.delete(`${API_URL}/admin-monitoring/${id}`, {
    headers: { Authorization: `${localStorage.getItem('token')}` },
  });
  return response.data;
};