import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: SERVER_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (refreshToken) {
      config.headers['Refresh-Token'] = `Bearer ${refreshToken}`; 
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api };
