import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const SalesChart = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-80 w-full cursor-default">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Daily Revenue Trend</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="dailyRevenue" 
            name="Revenue ($)" 
            stroke="#3b82f6" 
            activeDot={{ r: 8 }} 
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
