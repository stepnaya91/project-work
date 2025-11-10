import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppState } from 'src/store/index';

export interface BasketProduct extends Product  {
  count: number
}
export type ProductList = BasketProduct[]

const basketSlice = createSlice({
  name: 'basket',
  initialState: [] as ProductList,
  reducers: {
    addItem: (state, action: PayloadAction<{product: Product}>) => {
      const p = action.payload.product;
      const basketProduct: BasketProduct = {
        count: 1,
        category: p.category,
        id: p.id,
        name: p.name,
        price: p.price,
        desc: p.desc,
        photo: p.photo,
        createdAt: p.createdAt,
        updatedAt: p.createdAt,
        commandId: p.commandId
      }
      state.push(basketProduct);
    },
    increaseProductCount:(state, action: PayloadAction<{ id: string }>)=>{
      const index = state.findIndex(item=>item.id==action.payload.id)
      state[index].count += 1;
    },
    decreaseProductCount:(state, action: PayloadAction<{ id: string }>)=>{
      const index = state.findIndex(item=>item.id==action.payload.id)  
      state[index].count -= 1;
      if(state[index].count==0){
        state.splice(index,1);  
      }
    },
    removeItem: (state, action: PayloadAction<{id:string}>) => {
      const index = state.findIndex(item=>item.id==action.payload.id) 
      state.splice(index,1);
    },
  },
});
export const basketActions = basketSlice.actions;


export const basketSelectors = {
  get: (state: AppState): AppState['basket'] => state.basket,
  getItemById:
    (id: string) =>
    (state: AppState): AppState['basket'][number] =>
      state.basket[state.basket.findIndex(item=>item.id==id)],
  getCountById:
    (id: string) =>
    (state: AppState): number => {
      const check = state.basket.findIndex(item=>item.id==id)>-1;
      const count = check?state.basket[state.basket.findIndex(item=>item.id==id)].count:0;
      return count;
    }
};

export const basket = basketSlice.reducer;
