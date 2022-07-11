import {BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/dist/query/react';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import IAuth from '../models/IAuth';
import {getJwtToken} from '../utils/jwt';
import {IAuthError} from './types';

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_API_URL}/auth`,
  prepareHeaders: (headers) => {
    const token = getJwtToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
}) as BaseQueryFn<string | FetchArgs, unknown, IAuthError>;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  tagTypes: ['Auth'],
  endpoints: build => ({
    verify: build.query<IAuth, {}>({
      query: () => ({
        url: '/verify'
      })
    }),
    signup: build.mutation({
      query: (user) => ({
        url: '/signup',
        method: 'POST',
        body: user
      })
    }),
    login: build.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials
      })
    })
  })
});
