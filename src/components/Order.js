import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setOrders, setLoading, setError } from '../appStore/orderSlice';
import { useNavigate } from 'react-router-dom'; // Ensure you have react-router-dom installed

const OrderPage = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders.orders);
    const loading = useSelector((state) => state.orders.loading);
    const error = useSelector((state) => state.orders.error);
    const navigate = useNavigate(); // Get the navigate function from useNavigate

    useEffect(() => {
        dispatch(setLoading(true));
        axios.get('http://localhost:8080/orders')
            .then(response => {
                dispatch(setOrders(response.data.data)); // Assuming response.data is an array of orders
                dispatch(setLoading(false));
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
                // Mock data to visualize orders
                const mockOrders = [
                    {
                        id: '1',
                        address: '123 Main St, Cityville',
                        billAmount: 2500,
                        paymentId: 'PAY-1234567890',
                        statusCode: 'Pending',
                        trackingUrl: 'https://example.com/tracking/1',
                        items: [
                            {
                                itemId: '1',
                                item_id: '1', // Assuming it matches product ID or object ID
                                name: 'Firecrackers',
                                quantity: 2,
                                price: 1200
                            },
                            {
                                itemId: '2',
                                item_id: '2',
                                name: 'Sparklers',
                                quantity: 1,
                                price: 800
                            }
                        ]
                    },
                    {
                        id: '2',
                        address: '456 Elm St, Townsville',
                        billAmount: 1800,
                        paymentId: 'PAY-0987654321',
                        statusCode: 'Shipped',
                        trackingUrl: 'https://example.com/tracking/2',
                        items: [
                            {
                                itemId: '3',
                                item_id: '3',
                                name: 'Rocket Fireworks',
                                quantity: 3,
                                price: 600
                            }
                        ]
                    },
                    {
                        id: '3',
                        address: '789 Oak St, Villagetown',
                        billAmount: 3200,
                        paymentId: 'PAY-9876543210',
                        statusCode: 'Delivered',
                        trackingUrl: 'https://example.com/tracking/3',
                        items: [
                            {
                                itemId: '4',
                                item_id: '4',
                                name: 'Fountain Fireworks',
                                quantity: 1,
                                price: 3200
                            }
                        ]
                    }
                ];
                dispatch(setOrders(mockOrders));
                dispatch(setLoading(false));
            });
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-semibold mb-6">My Orders</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {orders.map(order => (
                    <div key={order.id} className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg" onClick={() => navigate(`/orders/${order.id}`)}>
                        <div className="flex justify-between mb-4">
                            <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                            <p className={`text-gray-600 ${getStatusColor(order.statusCode)}`}>{order.statusCode}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-700"><span className="font-semibold">Address:</span> {order.address}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-700"><span className="font-semibold">Bill Amount:</span> ₹{order.billAmount}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-700"><span className="font-semibold">Payment ID:</span> {order.paymentId}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-700"><span className="font-semibold">Tracking URL:</span> <a href={order.trackingUrl} className="text-blue-600 hover:underline">{order.trackingUrl}</a></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Helper function to set status color based on order status
const getStatusColor = (statusCode) => {
    switch (statusCode) {
        case 'Pending':
            return 'text-yellow-600';
        case 'Shipped':
            return 'text-blue-600';
        case 'Delivered':
            return 'text-green-600';
        default:
            return 'text-gray-600';
    }
};

export default OrderPage;
