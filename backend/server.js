// src/server.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authroutes');
const productRoutes = require('./routes/productroutes');

const auth = require('./middlewares/auth');
const roleAuth = require('./middlewares/roleauth');

require('dotenv').config();

const pool = require('../backend/config/db'); // Import the database connection

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);


// Example of a route with role-based access control
app.get('/api/admin', auth, roleAuth(['admin']), (req, res) => {
  res.json({ message: 'Admin access granted' });
});

// Database connection test route
app.get('/api/db-test', (req, res) => {
  pool.query('SELECT NOW()', (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json({ time: result.rows[0].now });
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  app.close(() => {
    console.log('HTTP server closed');
    pool.end(() => {
      console.log('Database pool has ended');
    });
  });
});