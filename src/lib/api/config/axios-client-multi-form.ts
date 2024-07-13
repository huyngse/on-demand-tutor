import axios from 'axios';
export const BASE_URL = 'https://localhost:7120/';

export const axiosClientMultipart = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'multipart/form-data',
  },
});

axiosClientMultipart.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.Accept = '*/*';
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);
