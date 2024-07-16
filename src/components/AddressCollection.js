import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addAddress, updateAddress, deleteAddress } from '../appStore/addressSlice';
import { PencilIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";

const AddressCollectionPage = () => {
    const dispatch = useDispatch();
    const savedAddresses = useSelector(state => state.addresses.savedAddresses);

    const [formData, setFormData] = useState({
        id: null,
        name: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zip: '',
        phoneNumber: '',
    });

    // Fetch addresses from API on component mount
    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await axios.get('http://localhost:8080/addresses');
                // Assuming response.data is an array of addresses
                // Dispatch an action to update Redux state with fetched addresses
                response.data.forEach(address => {
                    dispatch(addAddress(address)); // Assuming addAddress action handles adding to Redux state
                });
            } catch (error) {
                console.error('Error fetching addresses:', error.message);
                // Handle error gracefully, e.g., set error state, show message, or use stub data
                handleFetchError();
            }
        };

        fetchAddresses();
    }, [dispatch]); // Dependency array ensures useEffect runs only once on mount

    // Function to handle fetch error and use stub data
    const handleFetchError = () => {
        // Stub data for addresses (replace with your own stub data structure)
        const stubData = [
            {
                id: 1,
                name: 'John Doe',
                addressLine1: '123 Main St',
                addressLine2: '',
                city: 'Anytown',
                state: 'CA',
                zip: '12345',
                phoneNumber: '123-456-7890',
                isDefault: true,
            },
            {
                id: 2,
                name: 'Jane Smith',
                addressLine1: '456 Elm St',
                addressLine2: 'Apt 2B',
                city: 'Anycity',
                state: 'NY',
                zip: '54321',
                phoneNumber: '987-654-3210',
                isDefault: false,
            },
        ];

        // Dispatch an action to update Redux state with stub data
        stubData.forEach(address => {
            dispatch(addAddress(address));
        });
    };

    const handleSaveAddress = () => {
        if (formData.name && formData.addressLine1 && formData.city && formData.state && formData.zip && formData.phoneNumber) {
            const existingAddressIndex = savedAddresses.findIndex(address => address.id === formData.id);

            if (existingAddressIndex !== -1) {
                // Update existing address
                dispatch(updateAddress({ id: formData.id, updatedAddress: formData }));
            } else {
                // Create new address
                const newAddress = {
                    id: savedAddresses.length + 1,
                    ...formData,
                    isDefault: false,
                };
                dispatch(addAddress(newAddress));
            }

            // Clear form data after saving
            setFormData({
                id: null,
                name: '',
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                zip: '',
                phoneNumber: '',
            });
        } else {
            alert('Please fill out all required fields.');
        }
    };

    const handleDeleteAddress = (id) => {
        dispatch(deleteAddress(id));
    };

    const handleEditAddress = (address) => {
        // Set form data for editing
        setFormData({
            id: address.id,
            name: address.name,
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2,
            city: address.city,
            state: address.state,
            zip: address.zip,
            phoneNumber: address.phoneNumber,
        });
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-semibold mb-4">Address Collection Page</h1>

            {/* Saved addresses section */}
            <div className='mb-4'>
                <h2 className="text-lg font-semibold mb-4">Saved Addresses</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedAddresses.map(address => (
                        <div key={address.id} className="bg-white p-4 rounded-lg shadow-md">
                            <div className="flex justify-between mb-2">
                                <div>
                                    <p className="font-semibold">{address.name}</p>
                                    <p>{address.addressLine1}</p>
                                    {address.addressLine2 && <p>{address.addressLine2}</p>}
                                    <p>{address.city}, {address.state} {address.zip}</p>
                                    {address.phoneNumber && <p>Phone: {address.phoneNumber}</p>}
                                </div>
                                <div className="flex items-center">
                                    {!address.isDefault && (
                                        <button className="text-blue-500 mr-2" onClick={() => handleEditAddress(address)}> <PencilIcon className="h-5 w-5" aria-hidden="true" /></button>
                                    )}
                                    {!address.isDefault && (
                                        <button className="text-red-500" onClick={() => handleDeleteAddress(address.id)}>  <TrashIcon className="h-6 w-6" aria-hidden="true" /></button>
                                    )}
                                </div>
                            </div>
                            {address.isDefault && <span className="text-sm text-gray-500">Default Address</span>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Address form section */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Create Addresses</h2>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        id="name"
                        type="text"
                        className="w-full border-gray-300 rounded-md px-3 py-2 mb-2"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />

                    <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                    <input
                        id="addressLine1"
                        type="text"
                        className="w-full border-gray-300 rounded-md px-3 py-2 mb-2"
                        value={formData.addressLine1}
                        onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                    />

                    <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 mb-1">Address Line 2 (Optional)</label>
                    <input
                        id="addressLine2"
                        type="text"
                        className="w-full border-gray-300 rounded-md px-3 py-2 mb-2"
                        value={formData.addressLine2}
                        onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                    />

                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                        id="city"
                        type="text"
                        className="w-full border-gray-300 rounded-md px-3 py-2 mb-2"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />

                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                        id="state"
                        type="text"
                        className="w-full border-gray-300 rounded-md px-3 py-2 mb-2"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    />

                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                    <input
                        id="zip"
                        type="text"
                        className="w-full border-gray-300 rounded-md px-3 py-2 mb-2"
                        value={formData.zip}
                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    />

                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                    <input
                        id="phoneNumber"
                        type="text"
                        className="w-full border-gray-300 rounded-md px-3 py-2 mb-4"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    />

                    <div className="flex justify-end">
                        <button
                            className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                            onClick={handleSaveAddress}
                        >
                            {formData.id ? 'Update Address' : 'Save Address'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressCollectionPage;
