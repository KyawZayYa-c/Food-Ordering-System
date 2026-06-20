import { configureStore } from "@reduxjs/toolkit";
import { productApiSlice } from "./features/product/productApiSlice";

export const store = configureStore({
  reducer: {
    [productApiSlice.reducerPath]: productApiSlice.reducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApiSlice.middleware),
});