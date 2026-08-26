import axios from 'axios';
import { env } from '../env';

// Separate refresh client with NO response interceptors — prevents infinite loop on 401
export const refreshClient = axios.create({
  baseURL: env.VITE_API_BASE_URL + '/api/v1',
  withCredentials: true, // sends HttpOnly refresh cookie
});

// Read CSRF token from cookie and attach as header (required by requireCsrf middleware)
refreshClient.interceptors.request.use((config) => {
  const csrfToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('ktux_csrf='))
    ?.split('=')[1];
  if (csrfToken) {
    config.headers['x-csrf-token'] = csrfToken;
  }
  return config;
});
