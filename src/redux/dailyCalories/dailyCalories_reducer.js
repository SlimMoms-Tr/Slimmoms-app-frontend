import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dailyCalories: null,
  eatenCalories: 0,
  notAllowedProducts: [],
  isLoading: false,
  error: null,
};

const dailyCaloriesSlice = createSlice({
  name: "dailyCalories",
  initialState,
  reducers: {
    setDailyCalories: (state, { payload }) => {
      state.dailyCalories = payload;
    },
    setEatenCalories: (state, { payload }) => {
      state.eatenCalories = payload;
    },
    setNotAllowedProducts: (state, { payload }) => {
      state.notAllowedProducts = payload;
    },
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    resetDailyCalories: (state) => {
      state.dailyCalories = null;
      state.eatenCalories = 0;
      state.notAllowedProducts = [];
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setDailyCalories,
  setEatenCalories,
  setNotAllowedProducts,
  setLoading,
  setError,
  resetDailyCalories,
} = dailyCaloriesSlice.actions;
export default dailyCaloriesSlice.reducer;
