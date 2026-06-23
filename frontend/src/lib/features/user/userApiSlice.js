import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseURL } from '../../api/BaseURL';

export const userApiSlice = createApi({
  reducerPath: 'userApi',
  tagTypes: ['Users'],
  baseQuery: fetchBaseQuery({
    baseUrl: BaseURL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => '/users',
      providesTags: ['Users'],
    }),

    getUserStats: builder.query({
      query: () => '/users/stats',
      providesTags: ['Users'],
    }),

    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: ['Users'],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserStatsQuery,
  useGetUserByIdQuery,
  useDeleteUserMutation,
} = userApiSlice;