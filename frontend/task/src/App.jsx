import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { store } from './store';
import Catalog from './Catalog';
import Cart from './Cart';
import Login from './login';
import Signup from './signup';
import AdminPage from './adminpage';
import { logout } from './authslice';

const PrivateRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, role } = useSelector(state => state.auth);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/shop" />;
  }
  return children;
};

const Navigation = () => {
  const { isAuthenticated, role } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="mb-4">
      <ul className="flex justify-center space-x-4">
        {isAuthenticated ? (
          <>
            <li><Link to="/shop" className="text-blue-500 hover:text-blue-700">Shop</Link></li>
            {role === 'admin' && <li><Link to="/admin" className="text-blue-500 hover:text-blue-700">Admin</Link></li>}
            <li><button onClick={handleLogout} className="text-red-500 hover:text-red-700">Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="text-blue-500 hover:text-blue-700">Login</Link></li>
            <li><Link to="/signup" className="text-blue-500 hover:text-blue-700">Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

const ShopPage = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-2/3 pr-4">
        <h2 className="text-2xl font-bold mb-4 text-black">Catalog</h2>
        <Catalog />
      </div>
      <div className="md:w-1/3 mt-8 md:mt-0">
        <Cart />
      </div>
    </div>
  );
};

const AppContent = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-200">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 text-custom-purple text-center">Fruit Shop</h1>
          <Navigation />
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/shop" 
              element={
                <PrivateRoute>
                  <ShopPage />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <PrivateRoute requiredRole="admin">
                  <AdminPage />
                </PrivateRoute>
              } 
            />
            <Route path="/" element={<Navigate replace to="/shop" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;