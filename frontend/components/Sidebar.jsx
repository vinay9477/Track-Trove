import React from 'react';
import { NavLink } from 'react-router-dom';
import { authService } from '../services/authService';

const Sidebar = () => {
  const user = authService.getCurrentUser();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4 flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-6 text-gray-300 border-b border-gray-700 pb-2">Menu</h2>
      
      <NavLink 
        to="/" 
        className={({isActive}) => `p-2 rounded hover:bg-gray-700 transition ${isActive ? 'bg-blue-600' : ''}`}
        end
      >
        Dashboard
      </NavLink>

      <NavLink 
        to="/inventory" 
        className={({isActive}) => `p-2 rounded hover:bg-gray-700 transition ${isActive ? 'bg-blue-600' : ''}`}
      >
        Inventory Management
      </NavLink>

      <NavLink 
        to="/sales" 
        className={({isActive}) => `p-2 rounded hover:bg-gray-700 transition ${isActive ? 'bg-blue-600' : ''}`}
      >
        Sales Records
      </NavLink>

      {isAdmin && (
        <div className="mt-8 border-t border-gray-700 pt-4 flex flex-col gap-2">
          <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-2">Admin Panel</h3>
          <NavLink 
            to="/users" 
            className={({isActive}) => `p-2 rounded hover:bg-gray-700 transition ${isActive ? 'bg-blue-600' : ''}`}
          >
            Manage Vendors
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
