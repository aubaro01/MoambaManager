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
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');

        const res = await axios.post(
          `${SERVER_URL}/user/auth/refresh`,
          {},
          {
            headers: {
              'Refresh-Token': `Bearer ${refreshToken}`,
            },
          }
        );
        const newAccessToken = res.data.accessToken;
        localStorage.setItem('jwt_token', newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { api };
