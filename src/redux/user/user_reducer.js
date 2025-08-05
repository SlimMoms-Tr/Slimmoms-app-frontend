import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: null,
  email: null,
  notAllowedProducts: [],
  days: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, { payload }) => {
      state.id = payload.id;
      state.name = payload.name;
      state.email = payload.email;
    },
    setNotAllowedProducts: (state, { payload }) => {
      state.notAllowedProducts = payload;
    },
    setDays: (state, { payload }) => {
      state.days = payload;
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
  setUserInfo,
  setNotAllowedProducts,
  setDays,
  setLoading,
  setError,
} = userSlice.actions;
export default userSlice.reducer;
