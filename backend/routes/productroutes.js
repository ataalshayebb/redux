const express = require('express');
const router = express.Router();
const productController = require('../controllers/productscontroller');
const auth = require('../middlewares/auth');
const roleAuth = require('../middlewares/roleauth');

// Get all products
router.get('/', productController.getAllProducts);

// Add a new product
router.post('/', auth, roleAuth(['admin']), productController.addProduct);

// Update a product
router.put('/:id', auth, roleAuth(['admin']), productController.updateProduct);

// Soft delete a product
router.delete('/:id', auth, roleAuth(['admin']), productController.deleteProduct);

module.exports = router;