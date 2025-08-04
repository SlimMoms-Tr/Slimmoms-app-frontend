export const getUserId = (state) => state.user.id;
export const getUserName = (state) => state.user.name;
export const getUserEmail = (state) => state.user.email;
export const getUserNickName = (state) => state.user.name;
export const getNotAllowedProductsAll = (state) =>
  state.user.notAllowedProducts;
export const getDays = (state) => state.user.days || []; // User's days array
export const getLoading = (state) => state.user.isLoading;
export const getError = (state) => state.user.error;
