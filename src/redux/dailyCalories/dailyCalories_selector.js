export const getDailyCalories = (state) => state.dailyCalories.dailyCalories;
export const getNotAllowedProducts = (state) =>
  state.dailyCalories.notAllowedProducts;
export const getLoading = (state) => state.dailyCalories.isLoading;
export const getError = (state) => state.dailyCalories.error;

// Sidebar selectors
export const getSideBarDailyCalories = (state) =>
  state.dailyCalories.dailyCalories;
export const getSideBarEatenCalories = (state) =>
  state.dailyCalories.eatenCalories || 0;
export const getSideBarDailyRate = (state) => state.dailyCalories.dailyCalories;
export const getSideBarPercents = (state) => {
  const dailyCalories = state.dailyCalories.dailyCalories;
  const eatenCalories = state.dailyCalories.eatenCalories || 0;
  return dailyCalories ? Math.round((eatenCalories / dailyCalories) * 100) : 0;
};
