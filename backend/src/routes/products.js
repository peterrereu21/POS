const express = require('express');
const router = express.Router();

// Temporary in-memory products (replace with Prisma DB calls later)
const products = [
  { id: 1, sku: 'P001', name: 'Coca Cola 330ml', price: 1.5, quantity: 100 },
  { id: 2, sku: 'P002', name: 'Bread Loaf', price: 0.8, quantity: 50 }
];

router.get('/', (req, res) => res.json(products));

router.get('/:id', (req, res) => {
  const p = products.find(x => x.id === parseInt(req.params.id));
  if (!p) return res.status(404).json({ error: 'Not found' });
  res.json(p);
});

module.exports = router;
