import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./Redux/authSlice";
import Cookies from "js-cookie";

const AppInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      dispatch(login({ token }));
    }
  }, [dispatch]);

  return null;
};

export default AppInitializer;
