import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";
import authReducer from "./authSlice";
import addressReducer from './addressSlice';
import orderReducer from './orderSlice';

const appStore = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    auth: authReducer,
    addresses: addressReducer,
    orders: orderReducer
  },
});

export default appStore;
