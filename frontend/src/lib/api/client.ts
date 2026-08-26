import axios from 'axios';
import { tokenStore } from '../../auth/tokenStore';
import { refreshClient } from './refreshClient';
import { env } from '../env';

export const client = axios.create({
  baseURL: env.VITE_API_BASE_URL + '/api/v1',
  withCredentials: true,
  timeout: 10_000,
});

// Attach access token from memory and CSRF token from cookie to every request
client.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;

  if (typeof document !== 'undefined') {
    const csrfToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('ktux_csrf='))
      ?.split('=')[1];
    if (csrfToken) {
      config.headers['x-csrf-token'] = csrfToken;
    }
  }
  return config;
});

// Single-flight refresh on 401 — prevents multiple parallel refresh calls
let isRefreshing = false;
let refreshQueue: Array<{ resolve: (token: string) => void; reject: (err: unknown) => void }> = [];

client.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    const isTokenExpired =
      error.response?.status === 401 &&
      error.response?.data?.error?.code === 'TOKEN_EXPIRED' &&
      !original._retry;

    if (!isTokenExpired) return Promise.reject(error);

    original._retry = true;

    if (isRefreshing) {
      // Queue up while a refresh is in flight
      return new Promise<string>((resolve, reject) => {
        refreshQueue.push({ resolve, reject });
      }).then((token) => {
        original.headers.Authorization = `Bearer ${token}`;
        return client(original);
      });
    }

    isRefreshing = true;
    try {
      const { data } = await refreshClient.post<{ data: { accessToken: string } }>('/auth/refresh');
      const newToken = data.data.accessToken;
      tokenStore.set(newToken);
      refreshQueue.forEach((p) => p.resolve(newToken));
      refreshQueue = [];
      original.headers.Authorization = `Bearer ${newToken}`;
      return client(original);
    } catch (refreshErr) {
      refreshQueue.forEach((p) => p.reject(refreshErr));
      refreshQueue = [];
      tokenStore.clear();
      window.location.href = '/login';
      return Promise.reject(refreshErr);
    } finally {
      isRefreshing = false;
    }
  }
);
