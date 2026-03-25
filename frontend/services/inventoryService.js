import api from './api';

const getInventory = async () => {
  const response = await api.get('/inventory');
  return response.data;
};

const getInventoryById = async (id) => {
  const response = await api.get(`/inventory/${id}`);
  return response.data;
};

const addInventory = async (itemData) => {
  const response = await api.post('/inventory', itemData);
  return response.data;
};

const updateInventory = async (id, itemData) => {
  const response = await api.put(`/inventory/${id}`, itemData);
  return response.data;
};

const deleteInventory = async (id) => {
  const response = await api.delete(`/inventory/${id}`);
  return response.data;
};

export const inventoryService = {
  getInventory,
  getInventoryById,
  addInventory,
  updateInventory,
  deleteInventory,
};
