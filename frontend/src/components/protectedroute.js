// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true"; // Check if logged in

    return isLoggedIn ? children : <Navigate to="/" replace />; // Redirect to login if not logged in
};

export default ProtectedRoute;

