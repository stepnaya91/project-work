import { createSlice } from '@reduxjs/toolkit';
import { Profile } from '../types/Profile';
import { AppState } from '..';

const initialState: Profile = null;

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    set: (_, action) => action.payload
  },
});
export const profileActions = profileSlice.actions;

export const profileSelectors = {
  get: (state: AppState): AppState['profile'] => state.profile
};

export const profile = profileSlice.reducer;
