// cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {},
  reducers: {
    addToCart: (state, action) => {
      const { productId, productDetails } = action.payload;
      state[productId] = {
        ...state[productId],
        details: productDetails,
        quantity: (state[productId]?.quantity || 0) + 1,
      };
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      if (state[productId]?.quantity > 1) {
        state[productId].quantity -= 1;
      } else {
        delete state[productId];
      }
    },
    deleteIDFromcart: (state, action) => {
      const productId = action.payload;
      delete state[productId];
    }
  },
});

export const { addToCart, removeFromCart, deleteIDFromcart } = cartSlice.actions;

export default cartSlice.reducer;
