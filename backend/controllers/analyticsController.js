const AnalyticsService = require('../services/analyticsService');

// @desc    Get dashboard summary cards
// @route   GET /api/analytics/summary
// @access  Private
const getDashboardSummary = async (req, res) => {
  try {
    const summary = await AnalyticsService.getSummaryMetrics(req.user._id);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving analytics summary', error: error.message });
  }
};

// @desc    Get sales trend for graphs
// @route   GET /api/analytics/sales-trend
// @access  Private
const getSalesTrend = async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const trend = await AnalyticsService.getSalesTrend(req.user._id, days);
    res.json(trend);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving sales trend', error: error.message });
  }
};

module.exports = {
  getDashboardSummary,
  getSalesTrend
};
