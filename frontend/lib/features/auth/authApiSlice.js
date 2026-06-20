import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseURL } from '../../api/BaseURL';


export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
      baseUrl: BaseURL,
      credentials: 'include',
    prepareHeaders: (headers) => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.token) {
        headers.set('Authorization', `Bearer ${user.token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: '/users/register',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
        }),
        
    }),
    logout: builder.mutation({
        query: () => ({
            url: '/users/logout',
            method: 'POST',
        }),
    }),
    getProfile: builder.query({
      query: () => '/users/profile',
    }),
  }),
});

export const { 
  useRegisterMutation, 
  useLoginMutation, 
  useGetProfileQuery,
  useLogoutMutation,
} = authApiSlice;