// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProtectedRoute = () => {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Check authentication status

//   if (!isAuthenticated) {
//     console.error("ProtectedRoute: User is not authenticated. Redirecting to login...");
//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />; // Render the nested routes if authenticated
// };

// export default ProtectedRoute;

import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logout } from "../Redux/authSlice";

const ProtectedRoute = () => {
  const token = useSelector((state) => state.auth.token); // Get token from Redux
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Authentication state
  const dispatch = useDispatch();
  const baseUrl = useSelector((state) => state.url.url);

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsAuthenticated(false); // No token means unauthenticated
        return;
      }

      try {
        // Validate the token
        await axios.get(`${baseUrl}/api/users/self`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsAuthenticated(true); // Token is valid
      } catch (error) {
        console.error(
          "ProtectedRoute: Token validation failed. Logging out...",
          error
        );
        dispatch(logout()); // Clear Redux state
        setIsAuthenticated(false); // Mark as unauthenticated
      }
    };

    validateToken();
  }, [token, dispatch]);

  if (isAuthenticated === null) {
    // Show a loading state while validating the token
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        Validating authentication...
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
