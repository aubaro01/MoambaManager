import axios from 'axios';

const api = axios.create({
baseURL: 'http://localhost:5000/api/v1'
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export { api };