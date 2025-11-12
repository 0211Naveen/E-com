import React from 'react';
import { Navigate } from 'react-router-dom';

// Higher Order Component to protect routes
const StoreProtectedRoute = ({ children }) => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    return isLoggedIn ? children : <Navigate to="/storelog" />;
};

export default StoreProtectedRoute;
