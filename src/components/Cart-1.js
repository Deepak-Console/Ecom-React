import React from 'react';
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
                        <span>Delivery Charges Free:</span>
                        <span className="text-green-600 font-bold">Free</span>
                    </div>
                    <div className="flex justify-between mb-3 font-bold mt-3">
                        <span>Total Price:</span>
                        <span>₹{getTotalPrice()}</span>
                    </div>
                    <div className="text-right mt-3 mb-3">
                        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
