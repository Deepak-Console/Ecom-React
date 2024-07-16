import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, deleteIDFromcart } from '../appStore/cartSlice';
import { TrashIcon } from "@heroicons/react/24/outline";

const Cart = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const cartItems = Object.keys(state.cart).map((productId) => ({
        productId,
        quantity: state.cart[productId].quantity,
        productDetails: state.products[productId].details,
    }));

    const savedAddresses = useSelector(state => state.addresses.savedAddresses);
    const [selectedAddress, setSelectedAddress] = useState(savedAddresses.find(address => address.isDefault) || null);

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const deleteIDFromcartHandler = (productId) => {
        dispatch(deleteIDFromcart(productId));
    };

    const addToCartHandler = (productId, productDetails) => {
        dispatch(addToCart({ productId, productDetails }));
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.quantity * item.productDetails.price, 0);
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const handleAddressChange = (event) => {
        const addressId = parseInt(event.target.value);
        setSelectedAddress(savedAddresses.find(address => address.id === addressId));
    };

    return (
        <div className="container mx-auto mt-1 p-4 flex flex-col lg:flex-row">
            <div className="w-full lg:w-2/3 lg:mr-4 h-screen overflow-y-auto mb-8 lg:mb-0 bg-white p-4">
                <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                    <div>
                        {cartItems.map((item) => (
                            <div key={item.productId} className="grid grid-cols-12 gap-4 border-b border-gray-300 py-4 mb-4">
                                <div className="col-span-9 flex items-center">
                                    <img src={item.productDetails.imagePath} alt={item.productDetails.name} className="w-16 h-16 mr-4" />
                                    <div>
                                        <p className="text-lg font-semibold">{item.productDetails.name}</p>
                                        <p className="text-gray-600">{item.productDetails.description}</p>
                                    </div>
                                </div>
                                <div className="col-span-1 flex items-center justify-end">
                                    <div className="flex items-center border border-black px-2">
                                        <button
                                            className="text-black font-bold px-2 py-1 rounded-md hover:text-black-900 hover:scale-150 transform transition duration-300"
                                            onClick={() => removeFromCartHandler(item.productId)}
                                        >
                                            -
                                        </button>
                                        <span className="text-base md:text-lg font-bold text-black mx-2">
                                            {item.quantity}
                                        </span>
                                        <button
                                            className="text-black font-bold px-2 py-1 rounded-md hover:text-black-900 hover:scale-150 transform transition duration-300"
                                            onClick={() => addToCartHandler(item.productId, item.productDetails)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="col-span-1 flex items-center justify-end">
                                    <p className="text-lg font-semibold">₹{item.quantity * item.productDetails.price}</p>
                                </div>
                                <div className="col-span-1 flex items-center justify-start">
                                    <button
                                        className="text-red-600 hover:text-red-800 font-semibold"
                                        onClick={() => deleteIDFromcartHandler(item.productId)}
                                    >
                                        <TrashIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="w-full lg:w-1/3 bg-white p-4 lg:self-start">
                <div className="p-4 rounded">
                    <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
                    <div className="flex justify-between mb-2">
                        <span>Total Items:</span>
                        <span>{getTotalItems()}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Delivery Charges:</span>
                        <span className="text-green-600 font-bold">Free</span>
                    </div>
                    <div className="flex justify-between mb-3 font-bold mt-3">
                        <span>Total Price:</span>
                        <span>₹{getTotalPrice()}</span>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="addressSelect" className="block text-sm font-medium text-gray-700 mb-1">Select Address:</label>
                        <div className="relative">
                            <select
                                id="addressSelect"
                                className="w-full border-gray-300 rounded-md px-3 py-2 mb-2 appearance-none focus:outline-none focus:border-blue-500"
                                onChange={handleAddressChange}
                                value={selectedAddress ? selectedAddress.id : ''}
                            >
                                <option value="">Select an Address</option>
                                {savedAddresses.map(address => (
                                    <option key={address.id} value={address.id}>{address.name}, {address.addressLine1}, {address.city}, {address.state}, {address.zip}</option>
                                ))}
                            </select>
                            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2.14 5.44a.75.75 0 011.06-1.06l4.95 4.95a.75.75 0 010 1.06l-4.95 4.95a.75.75 0 11-1.06-1.06L5.44 8 2.14 4.72zM10.5 5a.75.75 0 00-.75.75v4.5a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75z" />
                            </svg>
                        </div>
                        <button
                            className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ${!selectedAddress ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={!selectedAddress}
                        >
                            Place Order
                        </button>
                    </div>
                    {savedAddresses.length === 0 && (
                        <p className="text-gray-500 text-center">No saved addresses. Please add an address in the Address Collection page.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
