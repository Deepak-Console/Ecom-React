import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  savedAddresses: [],
};

const addressSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {
    addAddress: (state, action) => {
      state.savedAddresses.push(action.payload); // Assuming action.payload is a new address object
    },
    updateAddress: (state, action) => {
      const { id, updatedAddress } = action.payload;
      const index = state.savedAddresses.findIndex(address => address.id === id);
      if (index !== -1) {
        state.savedAddresses[index] = { ...updatedAddress, id }; // Update existing address
      }
    },
    deleteAddress: (state, action) => {
      const id = action.payload;
      state.savedAddresses = state.savedAddresses.filter(address => address.id !== id);
    },
  },
});

export const { addAddress, updateAddress, deleteAddress } = addressSlice.actions;
export default addressSlice.reducer;
