// src/utils/authUtils.js
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://127.0.0.1:8001/api/token/';

export const verifyToken = async (token) => {
  try {
    console.log('Verifying token:', token);
    console.log('refresh_token:', localStorage.getItem('refresh_token'));
    const response = await axios.post(`${API_URL}verify/`, { token });
    if (response.status === 200) {
      // Token is valid, return true
      return true;
    }
  } catch (error) {
    console.log('Token is invalid:', error);
    return false; // Token is invalid
  }
};

export const refreshToken = async (refreshToken) => {
  try {
    const response = await axios.post(`${API_URL}refresh/`, { refresh: refreshToken });
    if (response.status === 200) {
      return response.data.token.access; // Return new access token
    }
  } catch (error) {
    console.log('Failed to refresh token:', error);
    return null; // Refresh failed
  }
};

export const getUserFromToken = (token) => {
  return jwtDecode(token);
};
