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
      const userData = response.data.data;

      const userInfo = {
        id: userData._id,
        name: userData.name,
        email: userData.email,
        notAllowedProducts: [],
        days: [],
      };

      dispatch(setUserInfo(userInfo));
      dispatch(setNotAllowedProducts(userInfo.notAllowedProducts || []));
      dispatch(setDays(userInfo.days || []));

      dispatch(setLoading(false));
    } catch (error) {
      if (error.response?.status === 401) {
        dispatch(setLoading(false));
        return;
      }

      dispatch(
        setError(error.response?.data?.message || "Failed to get user info")
      );
      dispatch(setLoading(false));
    }
  }
);
