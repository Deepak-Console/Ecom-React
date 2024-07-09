import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";

const appStore = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer
  },
});

export default appStore;
