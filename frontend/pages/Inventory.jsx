import React, { useEffect, useState } from 'react';
import { inventoryService } from '../services/inventoryService';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const data = await inventoryService.getInventory();
        setItems(data);
      } catch (error) {
        console.error('Failed to load inventory', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Inventory...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Inventory Management</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
          + Add New Item
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 border-b">
              <th className="p-3">SKU</th>
              <th className="p-3">Product Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Unit Price</th>
              <th className="p-3">In Stock</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-500">No inventory items found.</td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3 text-sm text-gray-500">{item.sku}</td>
                  <td className="p-3 font-medium text-gray-800">{item.productName}</td>
                  <td className="p-3 text-sm">{item.category}</td>
                  <td className="p-3 text-sm">${item.unitPrice.toFixed(2)}</td>
                  <td className="p-3 text-sm">{item.quantity}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${item.quantity <= item.reorderLevel ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {item.quantity <= item.reorderLevel ? 'Low Stock' : 'In Stock'}
                    </span>
                  </td>
                  <td className="p-3 text-center gap-2 flex justify-center">
                    <button className="text-blue-500 hover:text-blue-700 text-sm">Edit</button>
                    <button className="text-red-500 hover:text-red-700 text-sm">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
