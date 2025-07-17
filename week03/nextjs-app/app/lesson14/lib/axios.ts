import axios from 'axios';
import { useAuthStore } from '../stores/useAuthStore';

const baseURL = 'https://server.aptech.io';

// Create axios instance
export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    // Wait for hydration
    if (typeof window !== 'undefined') {
      const { waitForHydration } = useAuthStore.getState();
      await waitForHydration();
    }
    // Get token from store or localStorage
    let token = useAuthStore.getState().token;
    if (!token && typeof window !== 'undefined') {
      token = localStorage.getItem('access_token');
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      const { logout } = useAuthStore.getState();
      logout();
      if (typeof window !== 'undefined') {
        window.location.href = '/lesson14/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;