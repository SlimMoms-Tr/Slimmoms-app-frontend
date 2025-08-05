import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
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
  async ({ date }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setDate(date));

      const response = await api.get("/daily", {
        params: { date },
      });

      const data = response.data.data; 

      const consumedProducts = data.consumedProducts || [];
      const totalCalories = consumedProducts.reduce(
        (sum, product) => sum + product.calories,
        0
      );

      dispatch(setKcalLeft(data.totalCalories - totalCalories || 0));
      dispatch(setKcalConsumed(totalCalories));
      dispatch(setDailyRate(data.totalCalories || 0));
      dispatch(
        setPercentsOfDailyRate(
          data.totalCalories ? (totalCalories / data.totalCalories) * 100 : 0
        )
      );
      dispatch(setProducts(consumedProducts));

      dispatch(setLoading(false));
    } catch (error) {
      console.error("Daily data fetch error:", error);
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

      const data = response.data.data; 

      toast.success(response.data.message);

      const consumedProducts = data.consumedProducts || [];
      const totalCalories = consumedProducts.reduce(
        (sum, product) => sum + product.calories,
        0
      );

      dispatch(setKcalLeft(data.totalCalories - totalCalories || 0));
      dispatch(setKcalConsumed(totalCalories));
      dispatch(
        setPercentsOfDailyRate(
          data.totalCalories ? (totalCalories / data.totalCalories) * 100 : 0
        )
      );
      dispatch(setProducts(consumedProducts));

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

      const data = response.data.data; 

      const consumedProducts = data.consumedProducts || [];
      const totalCalories = consumedProducts.reduce(
        (sum, product) => sum + product.calories,
        0
      );

      dispatch(setKcalLeft(data.totalCalories - totalCalories || 0));
      dispatch(setKcalConsumed(totalCalories));
      dispatch(
        setPercentsOfDailyRate(
          data.totalCalories ? (totalCalories / data.totalCalories) * 100 : 0
        )
      );
      dispatch(setProducts(consumedProducts));

      dispatch(setLoading(false));
    } catch (error) {
      console.error("Delete product error:", error);
      dispatch(
        setError(error.response?.data?.message || "Failed to delete product")
      );
      dispatch(setLoading(false));
    }
  }
);
