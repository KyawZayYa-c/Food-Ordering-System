import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseURL } from '../../api/BaseURL';

export const productApiSlice = createApi({
    reducerPath: 'productApi', 
    baseQuery: fetchBaseQuery({ baseUrl: BaseURL }),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
      getProducts: builder.query({
        query: () => 'products',
        providesTags: ['Products'],
      }),
      
    }),
  });

  export const { 
      useGetProductsQuery, 
  } = productApiSlice;