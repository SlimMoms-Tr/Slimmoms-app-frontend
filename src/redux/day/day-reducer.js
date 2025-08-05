import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: new Date().toISOString().split("T")[0],
  kcalLeft: 0,
  kcalConsumed: 0,
  dailyRate: 0,
  percentsOfDailyRate: 0,
  products: [],
  isLoading: false,
  error: null,
};

const daySlice = createSlice({
  name: "day",
  initialState,
  reducers: {
    setDate: (state, { payload }) => {
      state.date = payload;
    },
    setKcalLeft: (state, { payload }) => {
      state.kcalLeft = payload;
    },
    setKcalConsumed: (state, { payload }) => {
      state.kcalConsumed = payload;
    },
    setDailyRate: (state, { payload }) => {
      state.dailyRate = payload;
    },
    setPercentsOfDailyRate: (state, { payload }) => {
      state.percentsOfDailyRate = payload;
    },
    setProducts: (state, { payload }) => {
      state.products = payload;
    },
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const {
  setDate,
  setKcalLeft,
  setKcalConsumed,
  setDailyRate,
  setPercentsOfDailyRate,
  setProducts,
  setLoading,
  setError,
} = daySlice.actions;
export default daySlice.reducer;
