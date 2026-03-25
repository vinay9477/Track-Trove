import React, { useEffect, useState } from 'react';
import { analyticsService } from '../services/analyticsService';
import SalesChart from '../charts/SalesChart';
import ProfitChart from '../charts/ProfitChart';
import InventoryChart from '../charts/InventoryChart';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [salesTrend, setSalesTrend] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mocking Inventory Chart Data for visualization
  const mockInventoryData = [
    { category: 'Electronics', count: 120 },
    { category: 'Clothing', count: 300 },
    { category: 'Food', count: 450 },
    { category: 'Home', count: 80 }
  ];

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const summaryData = await analyticsService.getDashboardSummary();
        const trendData = await analyticsService.getSalesTrend(30);
        
        setSummary(summaryData);
        setSalesTrend(trendData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load dashboard data', error);
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Dashboard...</div>;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-800">Business Dashboard</h1>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
          <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
          <h3 className="text-2xl font-bold text-gray-800">${summary?.revenue?.toLocaleString() || '0'}</h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
          <p className="text-sm text-gray-500 mb-1">Total Profit</p>
          <h3 className="text-2xl font-bold text-gray-800">${summary?.profit?.toLocaleString() || '0'}</h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
          <p className="text-sm text-gray-500 mb-1">Items Sold</p>
          <h3 className="text-2xl font-bold text-gray-800">{summary?.itemsSold || '0'}</h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
          <p className="text-sm text-gray-500 mb-1">Low Stock Alerts</p>
          <h3 className="text-2xl font-bold text-red-500">{summary?.alerts || '0'}</h3>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart data={salesTrend.length > 0 ? salesTrend : []} />
        <ProfitChart data={salesTrend.length > 0 ? salesTrend : []} />
      </div>
      
      <div className="w-full">
        <InventoryChart data={mockInventoryData} />
      </div>
    </div>
  );
};

export default Dashboard;
