import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import {IAuth} from '../models/IAuth';

interface AuthError {
  data: {
    message: string;
    errors: []
  },
  status: number;
}

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5001/api/auth',
  prepareHeaders: (headers) => {
    const token = Cookies.get('jwtToken');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }
}) as BaseQueryFn<string | FetchArgs, unknown, AuthError>;

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