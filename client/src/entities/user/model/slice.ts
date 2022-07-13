import {createSlice} from '@reduxjs/toolkit';
import {removeJwtToken, setJwtToken} from 'shared/lib/utils/jwt';
import {api} from './api';
import {User, UserState} from './types';

const initialState: UserState = {
  user: {} as User,
  isAuthorized: false,
  isLoading: true,
  error: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state: UserState) {
      removeJwtToken();
      state.isAuthorized = false;
    }
  },
  extraReducers: builder => {
    builder.addMatcher(
      api.endpoints.verify.matchFulfilled,
      (state, action) => {
        state.isAuthorized = true;
        state.user = action.payload.user;
        state.isLoading = false;
      }
    );
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, action) => {
        setJwtToken(action.payload.token);
        state.isAuthorized = true;
        state.user = action.payload.user;
      }
    );
    builder.addMatcher(
      api.endpoints.signup.matchFulfilled,
      (state, action) => {
        setJwtToken(action.payload.token);
        state.isAuthorized = true;
        state.user = action.payload.user;
      }
    );
  }
});

export const actions = userSlice.actions;
export const reducer = userSlice.reducer;
