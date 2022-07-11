import {createSlice} from '@reduxjs/toolkit';
import {removeJwtToken, setJwtToken} from '../../common/utils/jwt';
import User from '../users/user';
import {authApi} from './authService';
import {AuthState} from './types';

const initialState: AuthState = {
  isAuthorized: false,
  user: {} as User,
  isLoading: true,
  error: ''
};

export const authSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout(state: AuthState) {
      removeJwtToken();
      state.isAuthorized = false;
    }
  },
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.verify.matchFulfilled,
      (state, action) => {
        state.isAuthorized = true;
        state.user = action.payload.user;
        state.isLoading = false;
      }
    );
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        setJwtToken(action.payload.token);
        state.isAuthorized = true;
        state.user = action.payload.user;
      }
    );
    builder.addMatcher(
      authApi.endpoints.signup.matchFulfilled,
      (state, action) => {
        setJwtToken(action.payload.token);
        state.isAuthorized = true;
        state.user = action.payload.user;
      }
    );
  }
});

export const {logout} = authSlice.actions;

export const authReducer = authSlice.reducer;
