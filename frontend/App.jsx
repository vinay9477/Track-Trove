import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { authService } from './services/authService';

// Layout
import Layout from './components/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import Unauthorized from './pages/Unauthorized';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = authService.getCurrentUser();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Dashboard Routes */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'vendor']}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="sales" element={<Sales />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
