import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_URL_VERSION}`;

export const clockIn = async (data) => {
  const response = await axios.post(`${API_URL}/attendances/clock-in`, data, {
    headers: { Authorization: `${localStorage.getItem('token')}` },
  });
  return response.data;
};

export const clockOut = async (data) => {
  const response = await axios.post(`${API_URL}/attendances/clock-out`, data, {
    headers: { Authorization: `${localStorage.getItem('token')}` },
  });
  return response.data;
};