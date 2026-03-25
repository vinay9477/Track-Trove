import api from './api';

const getSales = async () => {
  const response = await api.get('/sales');
  return response.data;
};

const addSale = async (saleData) => {
  const response = await api.post('/sales', saleData);
  return response.data;
};

const deleteSale = async (id) => {
  const response = await api.delete(`/sales/${id}`);
  return response.data;
};

export const salesService = {
  getSales,
  addSale,
  deleteSale,
};
