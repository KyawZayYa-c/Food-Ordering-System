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
      addProduct: builder.mutation({
        query: (formData) => ({ url: 'products', method: 'POST', body:formData }),
        invalidatesTags: ['Products'],
      }),
      updateProduct: builder.mutation({
        query: ({ id, body }) => ({ url: `products/${id}`, method: 'PATCH', body: body,}),
        invalidatesTags: ['Products'],
      }),
      // Optimistic update
      deleteProduct: builder.mutation({
        query: (id) => ({ url: `products/${id}`, method: 'DELETE' }),

        async onQueryStarted(id, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            productApiSlice.util.updateQueryData('getProducts', undefined, (draft) => {
              if (draft && Array.isArray(draft.data)) {
                const index = draft.data.findIndex((product) => product._id === id);
                if (index !== -1) {
                  draft.data.splice(index, 1);
                }
              }
            })
          );
          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        },
      }),
    }),
  });

  export const { 
      useGetProductsQuery, 
      useAddProductMutation, 
      useUpdateProductMutation, 
      useDeleteProductMutation 
  } = productApiSlice;