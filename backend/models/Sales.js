const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Inventory',
      required: true,
    },
    quantitySold: {
      type: Number,
      required: true,
      min: 1,
    },
    salePrice: {
      type: Number,
      required: true,
    },
    costPrice: {
      type: Number,
      required: true,
    },
    profit: {
      type: Number,
      // Calculated before save
    },
    saleDate: {
      type: Date,
      default: Date.now,
    },
    customerDetails: {
      name: String,
      contact: String,
    }
  },
  {
    timestamps: true,
  }
);

// Calculate profit margin automatically
salesSchema.pre('save', function(next) {
  this.profit = (this.salePrice - this.costPrice) * this.quantitySold;
  next();
});

module.exports = mongoose.model('Sales', salesSchema);
