import { configureStore } from "@reduxjs/toolkit";
import { productApiSlice } from "./features/product/productApiSlice";
import { authApiSlice } from "./features/auth/authApiSlice";

export const store = configureStore({
  reducer: {
    [productApiSlice.reducerPath]: productApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApiSlice.middleware)
      .concat(authApiSlice.middleware),
});