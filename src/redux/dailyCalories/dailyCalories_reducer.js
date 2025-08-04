import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dailyCalories: null,
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
    setNotAllowedProducts: (state, { payload }) => {
      state.notAllowedProducts = payload;
    },
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { setDailyCalories, setNotAllowedProducts, setLoading, setError } =
  dailyCaloriesSlice.actions;
export default dailyCaloriesSlice.reducer;
