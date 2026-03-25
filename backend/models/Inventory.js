const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productName: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Electronics', 'Clothing', 'Food', 'Home', 'Other'],
      default: 'Other',
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    reorderLevel: {
      type: Number,
      default: 10,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Inventory', inventorySchema);
