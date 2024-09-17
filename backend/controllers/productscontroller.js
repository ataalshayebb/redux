const pool = require('../config/db');

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM taskcart.products WHERE is_deleted = FALSE');
      res.json(result.rows);
    } catch (error) {
      console.error('Error in getAllProducts:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  addProduct: async (req, res) => {
    const { name, description, price, stock } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO taskcart.products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, description, price, stock]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error in addProduct:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  updateProduct: async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    try {
      const result = await pool.query(
        'UPDATE taskcart.products SET name = $1, description = $2, price = $3, stock = $4 WHERE id = $5 AND is_deleted = FALSE RETURNING *',
        [name, description, price, stock, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error in updateProduct:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  deleteProduct: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query(
        'UPDATE taskcart.products SET is_deleted = TRUE WHERE id = $1 RETURNING *',
        [id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error in deleteProduct:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
};

module.exports = productController;