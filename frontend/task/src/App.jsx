import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Catalog from './Catalog';
import Cart from './Cart';

const App = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-200">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 text-custom-purple text-center">Fruit Shop</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 pr-4">
              <h2 className="text-2xl font-bold mb-4 text-black">Catalog</h2>
              <Catalog />
            </div>
            <div className="md:w-1/3 mt-8 md:mt-0">
              <Cart />
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;