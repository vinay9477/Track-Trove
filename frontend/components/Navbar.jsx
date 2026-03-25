import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <div className="font-bold text-xl">
        TrackTrove
      </div>
      
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm">
            Welcome, <strong>{user.name}</strong> ({user.role})
          </span>
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
