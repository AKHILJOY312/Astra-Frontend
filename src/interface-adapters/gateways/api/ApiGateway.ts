import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

// Interceptor to attach JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('astra_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
