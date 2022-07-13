import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getJwtToken} from 'shared/lib/utils/jwt';
import {User, UserError} from './types';

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_API_URL}/auth`,
  prepareHeaders: (headers) => {
    const token = getJwtToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
}) as BaseQueryFn<string | FetchArgs, unknown, UserError>;

export const api = createApi({
  reducerPath: 'userApi',
  baseQuery,
  tagTypes: ['User'],
  endpoints: build => ({
    verify: build.query<{ token: string, user: User }, {}>({
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
