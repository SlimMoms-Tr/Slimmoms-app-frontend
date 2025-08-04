export const getKcalLeft = (state) => state.day.kcalLeft;
export const getKcalConsumed = (state) => state.day.kcalConsumed;
export const getDailyRate = (state) => state.day.dailyRate;
export const getPercentsOfDailyRate = (state) => state.day.percentsOfDailyRate;
export const getProducts = (state) => state.day.products;
export const eatenProducts = (state) => state.day.products; // Alias for getProducts
export const getLoading = (state) => state.day.isLoading;
export const getError = (state) => state.day.error;
export const date = (state) => state.day.date;
