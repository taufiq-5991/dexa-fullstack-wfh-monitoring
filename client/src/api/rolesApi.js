import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getRoles = async () => {
  const response = await axios.get(`${API_URL}/roles`, {
    headers: { Authorization: `${localStorage.getItem('token')}` },
  });
  return response.data;
};