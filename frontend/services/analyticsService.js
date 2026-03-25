import api from './api';

const getDashboardSummary = async () => {
  const response = await api.get('/analytics/summary');
  return response.data;
};

const getSalesTrend = async (days = 30) => {
  const response = await api.get(`/analytics/sales-trend?days=${days}`);
  return response.data;
};

export const analyticsService = {
  getDashboardSummary,
  getSalesTrend,
};
