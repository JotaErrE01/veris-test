import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices';
import productsSlice from './slices/products/productsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    products: productsSlice,
  },
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;