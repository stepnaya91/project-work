import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import ProductList from '../../features/ProductList/ProductList'
import { AppState } from 'src/store/index';

export type ProductList = Product[]

const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    add: (state, action: PayloadAction<{product: Product}>) => {
      state.push(action.payload.product);
    },
    update: (state: ProductList, action: PayloadAction<{product: Product}>) => {
      state[state.findIndex(item=>item.id==action.payload.product.id)] = action.payload.product;
    }
  },
});
export const productsActions = productsSlice.actions;

export const productsSelectors = {
  get: (state: AppState): AppState['products'] => state.products,
  getProduct:
    (id: string) =>
    (state: AppState): AppState['products'][number] =>{
      return state.products[state.products.findIndex(item=>item.id==id)]
    }
};

export const products = productsSlice.reducer;
