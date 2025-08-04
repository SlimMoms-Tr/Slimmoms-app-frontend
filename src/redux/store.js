import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./auth/auth_reducer";
import dailyRate from "./dailyCalories/dailyCalories_reducer";
import dayReducer from "./day/day-reducer";
import user from "./user/user_reducer";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
    dailyCalories: dailyRate,
    day: dayReducer,
    user,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: import.meta.env.MODE === "development",
});

const persistor = persistStore(store);

export { store, persistor };
