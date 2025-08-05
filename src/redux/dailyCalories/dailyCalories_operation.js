import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setDailyCalories,
  setNotAllowedProducts,
  setLoading,
  setError,
  resetDailyCalories,
} from "./dailyCalories_reducer";
import api, { hasValidToken } from "../../utils/api";

const checkTokenAndSetLoading = (dispatch) => {
  if (!hasValidToken()) {
    dispatch(setLoading(false));
    return false;
  }
  return true;
};

export const dailyCalories = createAsyncThunk(
  "dailyCalories/calculate",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const response = await api.post("/calorie/public-calories", values);

      const data = response.data.data;
      dispatch(setDailyCalories(data.totalCalories));
      dispatch(setNotAllowedProducts(data.notRecommendedFoods || []));
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
  async ({ values, date }, { dispatch }) => {
    try {
      if (!checkTokenAndSetLoading(dispatch)) {
        return;
      }

      dispatch(setLoading(true));

      const response = await api.post("/calorie/private-calories", {
        ...values,
        date: date,
      });

      const data = response.data.data;
      dispatch(setDailyCalories(data.totalCalories));
      dispatch(setNotAllowedProducts(data.notRecommendedFoods || []));
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      if (error.response?.status === 401) {
        dispatch(setLoading(false));
        return;
      }

      console.error("Daily calories auth error:", error);
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

export const getUserCalories = createAsyncThunk(
  "dailyCalories/getUserCalories",
  async (_, { dispatch }) => {
    try {
      if (!checkTokenAndSetLoading(dispatch)) {
        dispatch(resetDailyCalories());
        return;
      }

      dispatch(setLoading(true));

      const response = await api.get("/calorie/user-calories");

      const data = response.data.data;

      if (!data.totalCalories || data.totalCalories === 0) {
        dispatch(resetDailyCalories());
      } else {
        dispatch(setDailyCalories(data.totalCalories));
        dispatch(setNotAllowedProducts(data.notRecommendedFoods || []));
      }

      dispatch(setLoading(false));
      return data;
    } catch (error) {
      if (error.response?.status === 401) {
        dispatch(resetDailyCalories());
        dispatch(setLoading(false));
        return;
      }

      console.error("Get user calories error:", error);
      dispatch(
        setError(error.response?.data?.message || "Failed to get user calories")
      );
      dispatch(setLoading(false));
      throw error;
    }
  }
);
