const Sales = require('../models/Sales');
const Inventory = require('../models/Inventory');

// @desc    Get all sales
// @route   GET /api/sales
// @access  Private
const getSales = async (req, res) => {
  const query = req.user.role === 'admin' ? {} : { vendor: req.user._id };
  // populate inventory details for the sale
  const sales = await Sales.find(query).populate('item', 'productName sku category');
  res.json(sales);
};

// @desc    Get single sale by id
// @route   GET /api/sales/:id
// @access  Private
const getSaleById = async (req, res) => {
  const sale = await Sales.findById(req.params.id).populate('item', 'productName sku');
  
  if (sale) {
    if (req.user.role !== 'admin' && sale.vendor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this sale' });
    }
    res.json(sale);
  } else {
    res.status(404).json({ message: 'Sale not found' });
  }
};

// @desc    Record new sale
// @route   POST /api/sales
// @access  Private
const addSale = async (req, res) => {
  const { itemId, quantitySold, salePrice } = req.body;

  // Verify inventory item
  const item = await Inventory.findById(itemId);
  if (!item) {
    return res.status(404).json({ message: 'Inventory item not found' });
  }

  // Authorize check if not admin
  if (req.user.role !== 'admin' && item.vendor.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized to sell this item' });
  }

  // Check stock
  if (item.quantity < quantitySold) {
    return res.status(400).json({ message: 'Insufficient stock' });
  }

  // Record sale
  const sale = new Sales({
    vendor: req.user._id,
    item: itemId,
    quantitySold,
    salePrice,
    costPrice: item.unitPrice,
  });

  const createdSale = await sale.save();

  // Deduct inventory
  item.quantity -= quantitySold;
  await item.save();

  res.status(201).json(createdSale);
};

// @desc    Delete a sale record (often admin only or restrict time)
// @route   DELETE /api/sales/:id
// @access  Private
const deleteSale = async (req, res) => {
  const sale = await Sales.findById(req.params.id);

  if (sale) {
    if (req.user.role !== 'admin' && sale.vendor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Optional: Re-add to inventory
    const item = await Inventory.findById(sale.item);
    if (item) {
      item.quantity += sale.quantitySold;
      await item.save();
    }

    await sale.remove();
    res.json({ message: 'Sale removed and inventory updated' });
  } else {
    res.status(404).json({ message: 'Sale not found' });
  }
};

module.exports = {
  getSales,
  getSaleById,
  addSale,
  deleteSale
};
