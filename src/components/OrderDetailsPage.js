import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchOrderDetails, setLoading, setError } from '../appStore/orderSlice';

const OrderDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Use useParams to get the 'id' parameter from the route
  const order = useSelector((state) => state.orders.orderDetails);
  const loading = useSelector((state) => state.orders.loading);
  const error = useSelector((state) => state.orders.error);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]); // Ensure 'id' is in the dependency array to fetch order details when 'id' changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-6">Order Details</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
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

        <h2 className="text-xl font-semibold mt-6 mb-4">Items</h2>
        <div className="divide-y divide-gray-200">
          {order.items.map(item => (
            <div key={item.itemId} className="py-2">
              <p className="text-gray-700"><span className="font-semibold">Item Name:</span> {item.name}</p>
              <p className="text-gray-700"><span className="font-semibold">Quantity:</span> {item.quantity}</p>
              <p className="text-gray-700"><span className="font-semibold">Price:</span> ₹{item.price}</p>
            </div>
          ))}
        </div>
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

export default OrderDetailsPage;
