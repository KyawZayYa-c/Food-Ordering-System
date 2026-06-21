import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseURL } from '../../api/BaseURL';


export const authApiSlice = createApi({
  reducerPath: 'authApi',
  tagTypes: ['User'],
  baseQuery: fetchBaseQuery({ 
      baseUrl: BaseURL,
      credentials: 'include',
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: '/users/register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
        }),
        invalidatesTags: ['User'],
    }),
    logout: builder.mutation({
        query: () => ({
            url: '/users/logout',
            method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    getProfile: builder.query({
      query: () => '/users/profile',
      providesTags: ['User'],
    }),
  }),
});

export const { 
  useRegisterMutation, 
  useLoginMutation, 
  useGetProfileQuery,
  useLogoutMutation,
} = authApiSlice;