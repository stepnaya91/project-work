import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { sagas } from './sagas';
import { token } from './slices/token';
import { profile } from './slices/profile';
import { userApi } from './services/userApi';
import { profileApi } from './services/profileApi';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    token,
    profile
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
        .concat(userApi.middleware)
        .concat(profileApi.middleware)
        .concat(sagaMiddleware),
});

sagaMiddleware.run(sagas);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
