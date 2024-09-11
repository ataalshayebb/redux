import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from './cartslice';

const fruits = [
  { id: 1, name: 'Apple', emoji: '🍎', price: 1.0 },
  { id: 2, name: 'Banana', emoji: '🍌', price: 0.5 },
  { id: 3, name: 'Orange', emoji: '🍊', price: 0.75 },
  { id: 4, name: 'Grapes', emoji: '🍇', price: 2.0 },
  { id: 5, name: 'Strawberry', emoji: '🍓', price: 1.5 },
];

const Catalog = () => {
  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {fruits.map((fruit) => (
        <div key={fruit.id} className="border border-custom-purple p-4 rounded-lg shadow-md bg-gray-100">
          <div className="text-4xl mb-2">{fruit.emoji}</div>
          <h3 className="text-lg font-semibold text-custom-purple">{fruit.name}</h3>
          <p className="text-gray-600">${fruit.price.toFixed(2)}</p>
          <button
            onClick={() => dispatch(addToCart(fruit))}
            className="mt-2 bg-custom-purple text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Catalog;