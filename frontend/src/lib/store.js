import { configureStore } from "@reduxjs/toolkit";
import { productApiSlice } from "./features/product/productApiSlice";
import { authApiSlice } from "./features/auth/authApiSlice";
import { orderApiSlice } from "./features/order/orderApiSlice";
import cartReducer from "./features/order/cart/cartSlice";

export const store = configureStore({
  reducer: {
    [productApiSlice.reducerPath]: productApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [orderApiSlice.reducerPath]: orderApiSlice.reducer,

    // Regular Reducers
    cart: cartReducer , 
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApiSlice.middleware)
      .concat(authApiSlice.middleware)
      .concat(orderApiSlice.middleware),
});