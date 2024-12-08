import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login, logout } from "../Redux/authSlice";

const AppInitializer = ({ setLoading }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      // console.log("AppInitializer: Starting initialization...");
      const token = sessionStorage.getItem("authToken");
      //todo
      // const userData = sessionStorage.getItem("user");

      // console.log("AppInitializer: Retrieved token:", token);
      // console.log("AppInitializer: Retrieved user:", userData);

      if (
        !token
        //  || !userData
      ) {
        console.error("AppInitializer: No token or user found. Logging out...");
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("user");
        dispatch(logout()); // Clear Redux state
        setLoading(false); // Stop loading
        return;
      }

      try {
        // console.log("AppInitializer: Validating token...");
        const response = await axios.get(
          "http://85.250.95.96:3006/api/users/self",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // console.log(
        //   "AppInitializer: Token validation successful. User:",
        //   response.data
        // );
        dispatch(login({ token, user: response.data })); // Set Redux state
      } catch (error) {
        console.error("AppInitializer: Token validation failed:", error);
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("user");
        dispatch(logout()); // Clear Redux state
      } finally {
        // console.log("AppInitializer: Initialization complete.");
        setLoading(false); // Stop loading
      }
    };

    initializeAuth();
  }, [dispatch, setLoading]);

  return null;
};

export default AppInitializer;
