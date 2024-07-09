import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addToCart, removeFromCart } from '../appStore/cartSlice';
import { addToProducts } from '../appStore/productSlice';

const CrackerShop = () => {
  const dispatch = useDispatch();
  const cartCounters = useSelector((state) => state.cart);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('Relevance');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/product/')
      .then(response => {
        setProducts(response.data.data);
      })
      .catch(error => console.error('Error fetching product data:', error));
  }, []);

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory === '' || product.categoryId === selectedCategory || product.subCategoryId === selectedCategory)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'Popularity':
          return b.popularity - a.popularity;
        case 'Price -- Low to High':
          return a.price - b.price;
        case 'Price -- High to Low':
          return b.price - a.price;
        case 'Newest First':
          return new Date(b.dateAdded) - new Date(a.dateAdded);
        default:
          return 0; // Default to Relevance
      }
    });

  const addToCartHandler = (productId, productDetails) => {
    dispatch(addToCart({ productId, productDetails }));
    dispatch(addToProducts({ productId, productDetails }));
  };

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const isAddedToCart = (productId) => cartCounters[productId] && cartCounters[productId].quantity > 0;

  const uniqueCategories = Array.from(new Set(products.map((product) => product.subCategoryId)));

  return (
    <div className="container mx-auto mt-1 p-4 grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="col-span-1  bg-white p-4">
        <ul className="list-none p-0">
          <li className="mb-2">
            <button
              className={`text-gray-900 font-bold ${selectedCategory === '' ? 'border-b-2 border-black' : ''}`}
              onClick={() => setSelectedCategory('')}
            >
              All Categories
            </button>
          </li>
          {uniqueCategories.map((categoryId) => (
            <li key={categoryId} className="mb-2">
              <button
                className={`text-gray-900 font-bold ${selectedCategory === categoryId ? 'border-b-2 border-black' : ''}`}
                onClick={() => setSelectedCategory(categoryId)}
              >
                {products.find(product => product.subCategoryId === categoryId)?.subCategory || categoryId}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-4  bg-white p-4">
        <div className="mb-4">
          <div className="space-y-4 md:flex md:items-center md:justify-between">
            <div className="flex flex-col md:flex-row md:space-x-4">
              <label className="sr-only" htmlFor="search">Search Products:</label>
              <input
                id="search"
                type="text"
                placeholder="Search products..."
                className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-md text-gray-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {/* <label className="sr-only" htmlFor="category">Select Category:</label>
              <select
                id="category"
                className="w-full md:w-48 px-10 py-2 mt-2 md:mt-0 border border-gray-300 rounded-md text-gray-900"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {uniqueCategories.map((categoryId) => (
                  <option key={categoryId} value={categoryId}>
                    {products.find(product => product.subCategoryId === categoryId)?.subCategory || categoryId}
                  </option>
                ))}
              </select> */}
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <select
                className="w-full md:w-48 px-10 py-2 mt-2 md:mt-0 border border-gray-300 rounded-md text-gray-900"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="Relevance">Relevance</option>
                <option value="Popularity">Popularity</option>
                <option value="Price -- Low to High">Price -- Low to High</option>
                <option value="Price -- High to Low">Price -- High to Low</option>
                <option value="Newest First">Newest First</option>
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 mb-4"
            >
              <img
                className="w-full h-48 md:h-48 object-cover"
                src={product.imagePath || "https://placekitten.com/401/?random=1"}
                alt={product.name}
              />
              <div className="p-4 md:p-6 flex flex-col justify-between">
                <div>
                  <h2 className="mb-2 text-lg font-medium text-gray-900">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-700 mb-1 h-10 truncate">{product.description}</p>
                </div>
                <div className="flex items-center justify-between mt-2 md:mt-4">
                  <p className="text-lg font-bold text-gray-900">
                    ₹{product.price}
                  </p>
                  {isAddedToCart(product.id) ? (
                    <div className="flex items-center border border-black px-2">
                      <button
                        className="text-gray-900 font-bold px-2 py-1 rounded-md hover:text-gray-900 hover:scale-150 transform transition duration-300"
                        onClick={() => removeFromCartHandler(product.id)}
                      >
                        -
                      </button>
                      <span className="text-base md:text-lg font-bold text-gray-900 mx-2">
                        {cartCounters[product.id]?.quantity}
                      </span>
                      <button
                        className="text-gray-900 font-bold px-2 py-1 rounded-md hover:text-gray-900 hover:scale-150 transform transition duration-300"
                        onClick={() => addToCartHandler(product.id, product)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="text-gray-900 font-bold px-4 py-2 rounded-md hover:bg-gray-900 hover:text-white transition duration-300 mt-2 md:mt-0"
                      onClick={() => addToCartHandler(product.id, product)}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CrackerShop;
