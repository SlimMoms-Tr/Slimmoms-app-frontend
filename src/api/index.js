import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://slimmoms-app-backend.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          toast.error('Yetkilendirme hatası! Lütfen giriş yapın.');
          window.location.href = '/login';
          break;
        case 404:
          toast.error('İstek başarısız: Kaynak bulunamadı.');
          break;
        default:
          toast.error('Bir hata oluştu: ' + error.response.data?.message || error.message);
      }
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  getProfile: () => api.get('/auth/me'),
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

export const calorieApi = {
  getPublicCalories: () => api.get('/calorie/public-calories'),
  getCalorie: (id) => api.get(`/calorie/${id}`),
  createCalorie: (data) => api.post('/calorie', data),
  updateCalorie: (id, data) => api.put(`/calorie/${id}`, data),
  deleteCalorie: (id) => api.delete(`/calorie/${id}`),
};
