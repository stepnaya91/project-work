import { createSlice } from '@reduxjs/toolkit';
import { AppState } from 'src/store/index';


const tokenSlice = createSlice({
  name: 'token',
  initialState: localStorage.getItem('token'),
  reducers: {
    set: (_, action) => action.payload,
    empty: () => null,
  },
});
export const tokenActions = tokenSlice.actions;

export const tokenSelectors = {
  get: (state: AppState): AppState['token'] => {
    return state.token;
  },
};

export const token = tokenSlice.reducer;