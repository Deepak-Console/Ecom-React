import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addToCart, removeFromCart } from '../appStore/cartSlice';
import { addToProducts } from '../appStore/productSlice';

const FeaturedProductsCarousel = () => {
  const dispatch = useDispatch();
  const cartCounters = useSelector((state) => state.cart);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/product/')
      .then(response => {
        setProducts(response.data.data);
      })
      .catch(error => console.error('Error fetching product data:', error));
  }, []);

  const addToCartHandler = (productId, productDetails) => {
    dispatch(addToCart({ productId, productDetails }));
    dispatch(addToProducts({ productId, productDetails }));
  };

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const isAddedToCart = (productId) => cartCounters[productId] && cartCounters[productId].quantity > 0;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold mb-8 text-center">Featured Products</h2>
        <Slider {...settings} className="mx-auto">
          {products.map((product) => (
            <div key={product.id} className="px-2">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={product.imagePath || "/path/to/default/image.jpg"} alt={product.name} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600">{product.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="font-bold text-lg">₹{product.price}</span>
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
                        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
                        onClick={() => addToCartHandler(product.id, product)}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default FeaturedProductsCarousel;
