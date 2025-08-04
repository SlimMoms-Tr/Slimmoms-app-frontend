import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setCredentials,
  logOut as logOutAction,
  setLoading,
  setError,
} from "./auth_reducer";
import api from "../../utils/api";

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const response = await api.post("/auth/register", credentials);

      const data = response.data;
      localStorage.setItem("token", data.token);
      dispatch(setCredentials({ user: data.user, token: data.token }));
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Registration failed")
      );
      dispatch(setLoading(false));
      throw error;
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const response = await api.post("/auth/login", credentials);

      const data = response.data;
      localStorage.setItem("token", data.token);
      dispatch(setCredentials({ user: data.user, token: data.token }));
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      dispatch(setError(error.response?.data?.message || "Login failed"));
      dispatch(setLoading(false));
      throw error;
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (_, { dispatch, getState }) => {
    try {
      const { token } = getState().auth;

      if (!token) {
        return;
      }

      const response = await api.get("/auth/me");
      const data = response.data;
      dispatch(setCredentials({ user: data, token }));
    } catch (error) {
      dispatch(logOutAction());
    }
  }
);

export const logOut = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      dispatch(logOutAction());
    }
  }
);
