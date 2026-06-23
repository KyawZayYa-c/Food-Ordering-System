import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseURL } from '../../api/BaseURL';
import { setCredentials, setUser, logout as logoutAction } from './authSlice'; // setUser 

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
      
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data && data?.token) {
            dispatch(setCredentials({ 
              user: data.data, 
              token: data.token 
            }));
          } else if (data?.data) {
            dispatch(setUser(data.data));
          }
        } catch (err) {
          console.error('Login error:', err);
        }
      },
      invalidatesTags: ['User'],
    }),
    
    logout: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
      
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logoutAction());
        } catch (err) {
          console.error('Logout error:', err);
        }
      },
      invalidatesTags: ['User'],
    }),
    
    getProfile: builder.query({
      query: () => '/users/profile',
      providesTags: ['User'],
      
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data) {
            dispatch(setUser(data.data));
          }
        } catch (err) {
          console.error('Get profile error:', err);
        }
      },
    }),
  }),
});

export const { 
  useRegisterMutation, 
  useLoginMutation, 
  useGetProfileQuery,
  useLogoutMutation,
} = authApiSlice;