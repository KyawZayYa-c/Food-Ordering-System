import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseURL } from '../../api/BaseURL';

export const orderApiSlice = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: BaseURL,
    credentials: 'include',
  }),
  tagTypes: ['AllOrders', 'MyOrders'], 
  
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: '/orders',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['AllOrders', 'MyOrders'],
    }),

    getAllOrders: builder.query({
      query: () => '/orders/all',
      providesTags: ['AllOrders'],
    }),

    getMyOrders: builder.query({
      query: () => '/orders/my-order',
      providesTags: ['MyOrders'],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/orders/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['AllOrders', 'MyOrders'],
    }),
    generateHash: builder.mutation({
    query: (hashData) => ({
      url: '/orders/generate-hash',
      method: 'POST',
      body: hashData, // { order_id: '...', amount: ... }
    }),
  }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetMyOrdersQuery,
  useUpdateOrderStatusMutation,
  useGenerateHashMutation,
} = orderApiSlice;