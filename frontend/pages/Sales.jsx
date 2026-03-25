import React, { useEffect, useState } from 'react';
import { salesService } from '../services/salesService';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const data = await salesService.getSales();
        setSales(data);
      } catch (error) {
        console.error('Failed to load sales', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Sales Records...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Sales Records</h2>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition">
          + Record New Sale
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 border-b">
              <th className="p-3">Date</th>
              <th className="p-3">Item Name</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Sale Price</th>
              <th className="p-3">Total Revenue</th>
              <th className="p-3">Profit</th>
            </tr>
          </thead>
          <tbody>
            {sales.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">No sales recorded yet.</td>
              </tr>
            ) : (
              sales.map((sale) => (
                <tr key={sale._id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3 text-sm text-gray-500">
                    {new Date(sale.saleDate).toLocaleDateString()}
                  </td>
                  <td className="p-3 font-medium text-gray-800">{sale.item?.productName || 'Unknown Item'}</td>
                  <td className="p-3 text-sm">{sale.quantitySold}</td>
                  <td className="p-3 text-sm">${sale.salePrice.toFixed(2)}</td>
                  <td className="p-3 text-sm font-semibold text-gray-700">
                    ${(sale.salePrice * sale.quantitySold).toFixed(2)}
                  </td>
                  <td className="p-3 text-sm font-semibold text-green-600">
                    ${sale.profit?.toFixed(2) || '0.00'}
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

export default Sales;
