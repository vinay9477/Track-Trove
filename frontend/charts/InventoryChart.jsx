import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const InventoryChart = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-80 w-full cursor-default">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Inventory Levels by Category</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip cursor={{fill: 'transparent'}}/>
          <Legend />
          <Bar dataKey="count" name="Items in Stock" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InventoryChart;
