import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductItem = ({ name, price, imageUrl = 'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500' }) => {
  return (
    <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <img className="w-full h-48 object-cover" src={imageUrl} alt={name} />
      <div className="px-6 py-4">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-gray-700">${price}</p>
        {/* Add more details or actions as needed */}
      </div>
    </div>
  );
};

const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </div>
  );
};

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product data using Axios
    axios.get('http://localhost:8080/product/')
      .then(response => {
        console.log('(response.data.data)', response.data.data)
        setProducts(response.data.data)
      })
      .catch(error => console.error('Error fetching product data:', error));
  }, []); // The empty dependency array ensures that the effect runs once after the initial render

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Product View</h2>
      <ProductList products={products} />
    </div>
  );
};

export default ProductPage;
