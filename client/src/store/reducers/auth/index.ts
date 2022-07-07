import {createSlice} from '@reduxjs/toolkit';
import {IUser} from '../../../models/IUser';
import {authApi} from '../../../services/AuthService';
import {saveJwtToken} from '../../../utils/jwt';
import {AuthState} from './types';

const initialState: AuthState = {
  isAuthorized: false,
  user: {} as IUser,
  isLoading: true,
  error: ''
};

export const authSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.verify.matchFulfilled,
      (state, action) => {
        console.log(action.payload);
        state.isAuthorized = true;
        state.user = action.payload.user;
        state.isLoading = false;
      }
    );

    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        saveJwtToken(action.payload.token);
        state.isAuthorized = true;
        state.user = action.payload.user;
      }
    );

    builder.addMatcher(
      authApi.endpoints.signup.matchFulfilled,
      (state, action) => {
        saveJwtToken(action.payload.token);
        state.isAuthorized = true;
        state.user = action.payload.user;
      }
    )
  }
});

export default authSlice.reducer;
