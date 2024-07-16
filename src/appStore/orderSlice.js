// orderSlice.js

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    orders: [], // Assuming this holds all orders fetched from API
    orderDetails: null,
    loading: false,
    error: null,
};

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload;
        },
        setOrderDetails: (state, action) => {
            state.orderDetails = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setOrders, setOrderDetails, setLoading, setError } = orderSlice.actions;

// Thunk action to fetch order details
export const fetchOrderDetails = (orderId) => async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
        console.log('getState', getState)
        const response = await axios.get(`http://localhost:8080/orders/${orderId}`);
        dispatch(setOrderDetails(response.data));
        dispatch(setLoading(false));
    } catch (error) {
        console.error('Error fetching order details:', error);
        //dispatch(setError('Failed to fetch order details.'));

        // Accessing Redux state directly to retrieve order details if available
        const { orders } = getState().orders;
        const order = orders.find(order => order.id === orderId);
        if (order) {
            dispatch(setOrderDetails(order));
        } else {
            dispatch(setError('Order not found.'));
        }

        dispatch(setLoading(false));
    }
};

export default orderSlice.reducer;
