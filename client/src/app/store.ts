import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {authApi} from '../features/auth/authService';
import {authReducer} from '../features/auth/authSlice';

const rootReducer = combineReducers({
  authReducer,
  [authApi.reducerPath]: authApi.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware)
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];