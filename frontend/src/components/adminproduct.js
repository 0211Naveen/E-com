import React from 'react';
import { Navigate } from 'react-router-dom';

// Higher Order Component to protect routes
const AdminProtectedRoute = ({ children }) => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    return isLoggedIn ? children : <Navigate to="/adminlog" />;
};

export default AdminProtectedRoute;
