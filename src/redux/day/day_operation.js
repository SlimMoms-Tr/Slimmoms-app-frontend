import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setDate,
  setKcalLeft,
  setKcalConsumed,
  setDailyRate,
  setPercentsOfDailyRate,
  setProducts,
  setLoading,
  setError,
} from "./day-reducer";
import api from "../../utils/api";

export const getDay = createAsyncThunk(
  "day/getDay",
  async ({ userId, date }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setDate(date));

      const response = await api.get("/daily", {
        params: { date },
      });

      const data = response.data;
      dispatch(setKcalLeft(data.kcalLeft || 0));
      dispatch(setKcalConsumed(data.kcalConsumed || 0));
      dispatch(setDailyRate(data.dailyRate || 0));
      dispatch(setPercentsOfDailyRate(data.percentsOfDailyRate || 0));
      dispatch(setProducts(data.products || []));

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Failed to get day data")
      );
      dispatch(setLoading(false));
    }
  }
);

export const addProduct = createAsyncThunk(
  "day/addProduct",
  async ({ date, product, weight }, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const response = await api.patch("/daily/add-product", {
        date,
        productId: product._id,
        weight: weight,
      });

      const data = response.data;
      dispatch(setKcalLeft(data.kcalLeft || 0));
      dispatch(setKcalConsumed(data.kcalConsumed || 0));
      dispatch(setPercentsOfDailyRate(data.percentsOfDailyRate || 0));
      dispatch(setProducts(data.products || []));

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Failed to add product")
      );
      dispatch(setLoading(false));
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "day/deleteProduct",
  async ({ date, productId }, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const response = await api.patch("/daily/delete-product", {
        date,
        productId,
      });

      const data = response.data;
      dispatch(setKcalLeft(data.kcalLeft || 0));
      dispatch(setKcalConsumed(data.kcalConsumed || 0));
      dispatch(setPercentsOfDailyRate(data.percentsOfDailyRate || 0));
      dispatch(setProducts(data.products || []));

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Failed to delete product")
      );
      dispatch(setLoading(false));
    }
  }
);
