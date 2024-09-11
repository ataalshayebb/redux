import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from './cartslice';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-custom-purple">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b border-custom-purple py-2">
              <div className="flex items-center">
                <span className="text-2xl mr-2">{item.emoji}</span>
                <span className="text-custom-purple">{item.name}</span>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    dispatch(updateQuantity({ id: item.id, quantity: parseInt(e.target.value) }))
                  }
                  className="w-16 text-center border border-custom-purple rounded mr-2"
                />
                <span className="mr-4 text-custom-purple">${(item.price * item.quantity).toFixed(2)}</span>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 hover:text-red-700 transition duration-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 text-xl font-bold text-custom-purple">
            Total: ${total.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;