// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/Login" />;
  }

  if (adminOnly && role !== "Admin") {
    return <Navigate to="/" />; // Redirect to home if not admin
  }

  return children;
};

export default ProtectedRoute;
