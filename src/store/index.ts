import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { sagas } from './sagas';
import { token } from './slices/token';
import { basket } from './slices/basket';
import { baseApi } from './services/api';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    token,
    basket
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
        .concat(baseApi.middleware)
        .concat(sagaMiddleware),
});

sagaMiddleware.run(sagas);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
