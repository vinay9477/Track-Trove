const Inventory = require('../models/Inventory');

// @desc    Get all inventory for a vendor
// @route   GET /api/inventory
// @access  Private
const getInventory = async (req, res) => {
  const query = req.user.role === 'admin' ? {} : { vendor: req.user._id };
  const inventory = await Inventory.find(query);
  res.json(inventory);
};

// @desc    Get single inventory item
// @route   GET /api/inventory/:id
// @access  Private
const getInventoryById = async (req, res) => {
  const item = await Inventory.findById(req.params.id);

  if (item) {
    // Check if the user is authorized to view this item
    if (req.user.role !== 'admin' && item.vendor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this item' });
    }
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
};

// @desc    Add new inventory item
// @route   POST /api/inventory
// @access  Private
const addInventory = async (req, res) => {
  const { productName, sku, category, quantity, reorderLevel, unitPrice } = req.body;

  const item = new Inventory({
    vendor: req.user._id,
    productName,
    sku,
    category,
    quantity,
    reorderLevel,
    unitPrice,
  });

  const createdItem = await item.save();
  res.status(201).json(createdItem);
};

// @desc    Update inventory item
// @route   PUT /api/inventory/:id
// @access  Private
const updateInventory = async (req, res) => {
  const item = await Inventory.findById(req.params.id);

  if (item) {
    if (req.user.role !== 'admin' && item.vendor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this item' });
    }

    item.productName = req.body.productName || item.productName;
    item.quantity = req.body.quantity !== undefined ? req.body.quantity : item.quantity;
    item.unitPrice = req.body.unitPrice || item.unitPrice;
    
    // other fields as needed

    const updatedItem = await item.save();
    res.json(updatedItem);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
};

// @desc    Delete inventory item
// @route   DELETE /api/inventory/:id
// @access  Private
const deleteInventory = async (req, res) => {
  const item = await Inventory.findById(req.params.id);

  if (item) {
    if (req.user.role !== 'admin' && item.vendor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this item' });
    }

    await item.remove();
    res.json({ message: 'Item removed' });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
};

module.exports = {
  getInventory,
  getInventoryById,
  addInventory,
  updateInventory,
  deleteInventory
};
