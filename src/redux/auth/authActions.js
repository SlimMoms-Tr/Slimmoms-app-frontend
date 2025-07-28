
import axios from "axios";
import {
  loginSuccess,
  logout,
  setUser,
  setIsAuthenticated,
} from "./authSlice";
import { toast, Bounce } from "react-toastify";


export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    await dispatch(
      loginSuccess({
        user: response.data.user,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      })
    );
    toast.success("Giriş başarılı", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  } catch (error) {
    toast.error("Kullanıcı veya şifre yanlış", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    console.error("Giriş hatası", error);
  }
};

export const getUser = (token) => async (dispatch) => {
  if (!token) {
    await dispatch(setIsAuthenticated(false));
    return { success: false };
  }

  try {
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (response.status === 200 || response.status === 201) {
      const userData = response.data.data.user;
      const refreshToken = response.data.data.refreshToken;
      dispatch(
        setUser({
          user: userData,
          refreshToken,
        })
      );
      return { success: true };
    }
    return { success: false };
  } catch (error) {
    console.error("Kullanıcı bilgisi alma hatası:", error);
    if (error.response && error.response.status === 401) {
      dispatch(logout());
    }
    return { success: false, error };
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { name, email, password });
    
    toast.success("Kayıt başarılı! Giriş yapabilirsiniz.", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    
    return response.data;
  } catch (error) {
    toast.error("Kayıt hatası: " + (error.response?.data?.message || "Bir hata oluştu"), {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    console.error("Register error:", error);
    throw error;
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(logout());
};
