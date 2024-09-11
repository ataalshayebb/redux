

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// Middleware to save cart to local storage
const localStorageMiddleware = ({ getState }) => {
  return next => action => {
    const result = next(action);
    localStorage.setItem('cart', JSON.stringify(getState().cart));
    return result;
  };
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});