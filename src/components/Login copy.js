import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../appStore/authSlice';

const Login = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [timer, setTimer] = useState(60);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        let interval;
        if (isTimerActive && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsTimerActive(false);
        }
        return () => clearInterval(interval);
    }, [isTimerActive, timer]);

    const sendOtpHandler = async () => {
        setIsLoading(true);
        try {
            await axios.post('http://localhost:8080/auth/login/send-otp', { phoneNumber });
            setIsOtpSent(true);
            setIsTimerActive(true);
            setTimer(60);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Error sending OTP. Please try again.');
        }
        setIsLoading(false);
    };

    const loginHandler = async () => {
        setIsLoading(true);
        try {
            let res = await axios.post('http://localhost:8080/auth/login/verify-otp', { phoneNumber, otp });
            // Store token in cookies or localStorage
            const { token } = res.data;
            document.cookie = `token=${token};max-age=3600;path=/`; //
            dispatch(login({ name, phoneNumber })); // Replace with actual user details from your backend
            const redirectTo = location.state?.from || '/profile'; // Redirect to profile or another page
            navigate(redirectTo);
        } catch (error) {
            setErrorMessage('Invalid OTP. Please try again.');
        }
        setIsLoading(false);
    };

    const resendOtpHandler = () => {
        sendOtpHandler();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-3xl font-semibold mb-6">Login</h1>
                {errorMessage && (
                    <p className="text-red-500 mb-4">{errorMessage}</p>
                )}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Phone Number</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>
                {isOtpSent && (
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">OTP</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                )}
                <div>
                    {!isOtpSent ? (
                        <button
                            onClick={sendOtpHandler}
                            className={`w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Sending OTP...' : 'Send OTP'}
                        </button>
                    ) : (
                        <div>
                            <button
                                onClick={loginHandler}
                                className={`w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-2 ${otp === '' || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={otp === '' || isLoading}
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                            <button
                                onClick={resendOtpHandler}
                                className={`w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isTimerActive || isLoading}
                            >
                                {isLoading ? 'Resending OTP...' : `Resend OTP ${isTimerActive ? `(${timer}s)` : ''}`}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
