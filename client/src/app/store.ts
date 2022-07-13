import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {userModel} from 'entities/user';

const rootReducer = combineReducers({
  userReducer: userModel.reducer,
  [userModel.api.reducerPath]: userModel.api.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userModel.api.middleware)
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
