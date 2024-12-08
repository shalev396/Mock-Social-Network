import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  // console.log("ProtectedRoute: Rendering..."); // Add this log
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // console.log("ProtectedRoute: isAuthenticated:", isAuthenticated);

  if (!isAuthenticated) {
    console.error(
      "ProtectedRoute: User is not authenticated. Redirecting to login..."
    );
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
