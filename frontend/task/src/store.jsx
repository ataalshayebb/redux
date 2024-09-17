import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartslice';
import authReducer from './authslice';
import productsReducer from './productsslice';

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
    auth: authReducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});