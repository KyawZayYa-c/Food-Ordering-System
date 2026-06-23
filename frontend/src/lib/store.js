import { configureStore } from "@reduxjs/toolkit";
import { productApiSlice } from "./features/product/productApiSlice";
import { authApiSlice } from "./features/auth/authApiSlice";
import { orderApiSlice } from "./features/order/orderApiSlice";
import cartReducer from "./features/order/cart/cartSlice";
import authReducer from "./features/auth/authSlice";
import { userApiSlice } from "./features/user/userApiSlice";

export const store = configureStore({
  reducer: {
    [productApiSlice.reducerPath]: productApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [orderApiSlice.reducerPath]: orderApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,

    // Regular Reducers
    cart: cartReducer, 
    auth: authReducer ,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApiSlice.middleware)
      .concat(authApiSlice.middleware)
      .concat(userApiSlice.middleware)
      .concat(orderApiSlice.middleware),
});