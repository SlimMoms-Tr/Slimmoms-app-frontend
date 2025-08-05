import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
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
  async (error) => {
    const originalRequest = error.config;

    if (error.response) {
      switch (error.response.status) {
        case 401:
          if (!originalRequest._retry) {
            originalRequest._retry = true;
            try {
              const refreshResponse = await api.post("/auth/refresh");
              const newAccessToken = refreshResponse.data.data.accessToken;
              localStorage.setItem("accessToken", newAccessToken);

              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return api(originalRequest);
            } catch (refreshError) {
              localStorage.removeItem("accessToken");
              window.location.href = "/login";
              return Promise.reject(refreshError);
            }
          }
          break;
        case 404:
          toast.error("Request failed: The resource was not found.");
          break;
        default:
          toast.error(
            "Bir hata oluştu: " + error.response.data?.message || error.message
          );
      }
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  logout: () => api.post("/auth/logout"),
  refresh: () => api.post("/auth/refresh"),
};

export const calorieApi = {
  getPublicCalories: () => api.post("/calorie/public-calories"),
  getPrivateCalories: (data) => api.post("/calorie/private-calories", data),
};

export const dailyApi = {
  getDaily: (date) => api.get("/daily", { params: { date } }),
  addProduct: (data) => api.patch("/daily/add-product", data),
  deleteProduct: (data) => api.patch("/daily/delete-product", data),
};

export const productApi = {
  searchProducts: (query) =>
    api.get("/products/search", { params: { search: query } }),
  getAllProducts: () => api.get("/products"),
};
