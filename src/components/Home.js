import React from 'react';
import { Link } from 'react-router-dom';
import FeaturedProductsCarousel from './FeaturedProductsCarousel'

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100">

            {/* Hero Section */}
            <section className="bg-blue-500 text-white py-24 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Pattasu.shop!</h1>
                    <p className="text-lg md:text-xl mb-8">Discover a wide range of crackers for every occasion.</p>
                    <Link
                        to="/product"
                        className="bg-white text-blue-500 py-2 px-6 rounded-full font-semibold uppercase tracking-wide inline-block hover:bg-blue-600 hover:text-white transition duration-300"
                    >
                        Explore Products
                    </Link>
                </div>
            </section>

            {/* Featured Products Section */}
            {/* <section className="py-16 px-4">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-semibold mb-8 text-center">Featured Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <img src="/path/to/image.jpg" alt="Product" className="w-full h-64 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">Product Name</h3>
                                <p className="text-gray-600">Product description or details</p>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="font-bold text-lg">₹Price</span>
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section> */}

            <FeaturedProductsCarousel />

            {/* Promotional Banner Section */}
            <section className="bg-gray-800 text-white py-12 px-4">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-semibold mb-4">Special Offer!</h2>
                    <p className="text-lg mb-6">Limited-time discounts on selected products.</p>
                    <Link
                        to="/product"
                        className="bg-white text-gray-800 py-2 px-6 rounded-full font-semibold uppercase tracking-wide inline-block hover:bg-gray-600 hover:text-white transition duration-300"
                    >
                        Shop Now
                    </Link>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="bg-gray-900 text-white py-8 px-4 mt-12">
                <div className="container mx-auto text-center">
                    <p>&copy; 2024 Pattasu.shop. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
