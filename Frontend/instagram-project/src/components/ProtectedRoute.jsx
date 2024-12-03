import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("authToken"); // Check token in sessionStorage

  if (!token) {
    return <Navigate to="/" replace />; // Redirect to login if no token
  }

  return children; // Render protected content
};

export default ProtectedRoute;
