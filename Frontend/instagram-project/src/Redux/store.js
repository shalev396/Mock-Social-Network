import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice"; // Existing slice
import urlReducer from "./urlSlice";

const store = configureStore({
  reducer: {
    user: userReducer, // Existing reducer
    auth: authReducer, // New auth reducer
    url: urlReducer,
  },
});

export default store;
