import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../src/cartslice';
import axios from 'axios';


const Catalog = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:4025/api/products`);
        setProducts(response.data);
      
      } catch (err) {
        console.error('rrr', err);
      }
    };

    fetchProducts();
  }, []);



  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border border-custom-purple p-4 rounded-lg shadow-md bg-gray-100">
          <div className="text-4xl mb-2">
            {product.emoji || '🍎'} 
          </div>
          <h3 className="text-lg font-semibold text-custom-purple">{product.name}</h3>
          <p className="text-gray-600">${parseFloat(product.price).toFixed(2)}</p>
          <p className="text-sm text-gray-500">Stock: {product.stock}</p>
          <button
            onClick={() => dispatch(addToCart(product))}
            className="mt-2 bg-custom-purple text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300"
            disabled={product.stock <= 0}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Catalog;