export const getIsAuthenticated = (state) => state.auth.isLoggedIn;
export const getToken = (state) => state.auth.token;
export const getUser = (state) => state.auth.user;
export const getLoading = (state) => state.auth.isLoading;
export const getError = (state) => state.auth.error;
