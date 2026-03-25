import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const ProfitChart = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-80 w-full cursor-default border-t-4 border-purple-500">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Profit Margins</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="_id" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area 
            type="monotone" 
            dataKey="dailyProfit" 
            name="Profit ($)" 
            stroke="#8b5cf6" 
            fillOpacity={1} 
            fill="url(#colorProfit)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProfitChart;
