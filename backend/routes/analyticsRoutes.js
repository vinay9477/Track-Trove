const express = require('express');
const router = express.Router();
const {
  getDashboardSummary,
  getSalesTrend,
} = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/summary', getDashboardSummary);
router.get('/sales-trend', getSalesTrend);

module.exports = router;
