import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice"; // Existing slice

const store = configureStore({
  reducer: {
    user: userReducer, // Existing reducer
    auth: authReducer, // New auth reducer
  },
});

export default store;
