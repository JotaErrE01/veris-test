import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../../interfaces';

interface ProductsSlice {
  products: IProduct[];
  isLoadingProducts: boolean;
  isError: boolean;
  errorMessage: string | null;
  hasMore: boolean;
}

const initialState: ProductsSlice = {
  products: [],
  isLoadingProducts: true,
  isError: false,
  errorMessage: null,
  hasMore: true,
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    onLoadProductsSuccess: (state, action: PayloadAction<{ products: IProduct[]; total: number }>) => {
      state.products = action.payload.products;
      state.hasMore = action.payload.products.length !== action.payload.total;
      state.isLoadingProducts = false;
    },
    setLoadingProducts: (state, action: PayloadAction<boolean>) => {
      state.isLoadingProducts = action.payload;
    },
    setError: (state, action: PayloadAction<{ isError: boolean; errorMsg: string }>) => {
      state.isError = action.payload.isError;
      state.errorMessage = action.payload.errorMsg;
    },
    onLoadMoreProductsSuccess: (state, action: PayloadAction<{ products: IProduct[]; total: number }>) => {
      state.isLoadingProducts = false;
      state.products = [ ...state.products, ...action.payload.products ]
      state.hasMore = action.payload.products.length !== action.payload.total;
    }
  },
})

export const { onLoadProductsSuccess, setLoadingProducts, setError } = productsSlice.actions

export default productsSlice.reducer;