import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from './Avatar'; // Assuming you have an Avatar component
import { logout, updateUser } from '../appStore/authSlice'; // Update the path as per your file structure
import { useNavigate } from 'react-router-dom'; // Ensure you have react-router-dom installed
import { PencilIcon } from "@heroicons/react/24/outline";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { name: initialName, phoneNumber } = useSelector((state) => state.auth.user); // Assuming auth slice contains user details

    const [name, setName] = useState(initialName);
    const [editMode, setEditMode] = useState(false);

    const handleSave = () => {
        dispatch(updateUser({ name })); // Dispatch updateUser action to update the user name in Redux state
        setEditMode(false); // Exit edit mode after saving
    };

    const handleLogout = () => {
        dispatch(logout()); // Dispatch logout action from authSlice
        // Perform additional logout tasks if needed (e.g., clear session, redirect)
    };

    const handleAddressPage = () => {
        navigate('/address'); // Navigate to the address page
    };

    const handleOrderPage = () => {
        navigate('/orders'); // Navigate to the orders page
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <div className="flex flex-col items-center mb-6">
                    <Avatar size="xl" /> {/* Increased avatar size */}
                    <div className="mt-4 text-center w-full">
                        {editMode ? (
                            <div className="flex items-center justify-center gap-2">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                                <button
                                    className="text-gray-600 hover:text-gray-800"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-2 relative w-full">
                                <h1 className="text-3xl font-semibold">{name}</h1>
                                <button
                                    className="text-gray-600 hover:text-gray-800"
                                    onClick={() => setEditMode(true)}
                                >
                                    <PencilIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                        )}
                        <p className="text-gray-600 mt-2">{phoneNumber}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 mt-8 w-full">
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 w-full"
                        onClick={handleAddressPage}
                    >
                        Manage Addresses
                    </button>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 w-full"
                        onClick={handleOrderPage}
                    >
                        Manage Orders
                    </button>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 w-full"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
