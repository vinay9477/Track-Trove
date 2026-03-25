const express = require('express');
const router = express.Router();
const {
  getSales,
  getSaleById,
  addSale,
  deleteSale,
} = require('../controllers/salesController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
  .get(getSales)
  .post(addSale);

router.route('/:id')
  .get(getSaleById)
  // Only admins can delete sales to prevent tampering
  .delete(authorize('admin'), deleteSale);

module.exports = router;
