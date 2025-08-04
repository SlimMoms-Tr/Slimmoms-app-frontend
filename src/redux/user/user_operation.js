import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setUserInfo,
  setNotAllowedProducts,
  setDays,
  setLoading,
  setError,
} from "./user_reducer";
import api from "../../utils/api";

export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const response = await api.get("/auth/me");
      const data = response.data;

      dispatch(setUserInfo(data));
      dispatch(setNotAllowedProducts(data.notAllowedProducts || []));
      dispatch(setDays(data.days || []));

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Failed to get user info")
      );
      dispatch(setLoading(false));
    }
  }
);
