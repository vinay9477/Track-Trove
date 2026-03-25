const Sales = require('../models/Sales');
const Inventory = require('../models/Inventory');

/**
 * Service to handle complex aggregation pipelines for analytics
 */
class AnalyticsService {
  /**
   * Get basic metrics: Total Sales, Total Profit, Inventory Items
   */
  static async getSummaryMetrics(vendorId) {
    // Pipeline for total sales and profit
    const salesSummary = await Sales.aggregate([
      { $match: { vendor: vendorId } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: { $multiply: ['$salePrice', '$quantitySold'] } },
          totalProfit: { $sum: '$profit' },
          totalItemsSold: { $sum: '$quantitySold' }
        }
      }
    ]);

    // Count inventory items
    const inventoryCount = await Inventory.countDocuments({ vendor: vendorId });
    const lowStockCount = await Inventory.countDocuments({
      vendor: vendorId,
      $expr: { $lte: ['$quantity', '$reorderLevel'] }
    });

    return {
      revenue: salesSummary[0]?.totalRevenue || 0,
      profit: salesSummary[0]?.totalProfit || 0,
      itemsSold: salesSummary[0]?.totalItemsSold || 0,
      inventoryCount,
      alerts: lowStockCount
    };
  }

  /**
   * Get sales grouped by date for charts
   */
  static async getSalesTrend(vendorId, days = 30) {
    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - days);

    return await Sales.aggregate([
      { 
        $match: { 
          vendor: vendorId,
          saleDate: { $gte: dateLimit } 
        } 
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$saleDate" } },
          dailyRevenue: { $sum: { $multiply: ['$salePrice', '$quantitySold'] } },
          dailyProfit: { $sum: '$profit' },
          itemsSold: { $sum: '$quantitySold' }
        }
      },
      { $sort: { _id: 1 } } // Sort by date ascending
    ]);
  }
}

module.exports = AnalyticsService;
