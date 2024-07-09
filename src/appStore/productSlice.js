// productSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'products',
  initialState: {},
  reducers: {
    addToProducts: (state, action) => {
      const { productId, productDetails } = action.payload;
      state[productId] = {
        ...state[productId],
        details: productDetails
      };
    }
  },
});

export const { addToProducts } = productSlice.actions;

export default productSlice.reducer;
