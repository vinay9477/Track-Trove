const express = require('express');
const router = express.Router();
const {
  getInventory,
  getInventoryById,
  addInventory,
  updateInventory,
  deleteInventory,
} = require('../controllers/inventoryController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
  .get(getInventory)
  .post(addInventory);

router.route('/:id')
  .get(getInventoryById)
  .put(updateInventory)
  .delete(deleteInventory);

module.exports = router;
