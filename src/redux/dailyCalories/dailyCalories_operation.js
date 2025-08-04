import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setDailyCalories,
  setNotAllowedProducts,
  setLoading,
  setError,
} from "./dailyCalories_reducer";
import api from "../../utils/api";

export const dailyCalories = createAsyncThunk(
  "dailyCalories/calculate",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const response = await api.post("/calorie/public-calories", values);

      const data = response.data;
      dispatch(setDailyCalories(data.dailyCalories));
      dispatch(setNotAllowedProducts(data.notAllowedProducts || []));
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message || "Failed to calculate daily calories"
        )
      );
      dispatch(setLoading(false));
      throw error;
    }
  }
);

export const dailyCaloriesAuth = createAsyncThunk(
  "dailyCalories/calculateAuth",
  async ({ values, userId }, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const response = await api.post("/calorie/private-calories", {
        ...values,
        userId,
      });

      const data = response.data;
      dispatch(setDailyCalories(data.dailyCalories));
      dispatch(setNotAllowedProducts(data.notAllowedProducts || []));
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message || "Failed to calculate daily calories"
        )
      );
      dispatch(setLoading(false));
      throw error;
    }
  }
);
