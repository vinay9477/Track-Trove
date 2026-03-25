import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-100 p-4">
      <h1 className="text-6xl font-bold text-red-500 mb-4">403</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Access Denied</h2>
      <p className="text-gray-500 text-center max-w-md mb-8">
        You do not have permission to view this page. This area requires different privileges (e.g., Administrator access).
      </p>
      <Link 
        to="/" 
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition"
      >
        Return to Dashboard
      </Link>
    </div>
  );
};

export default Unauthorized;
