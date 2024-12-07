import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false, // Tracks if the user is logged in
  token: null, // Stores the user's token
  user: null, // Stores user details (optional)
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token; // Save token
      state.user = action.payload.user; // Save user info
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null; // Clear token
      state.user = null; // Clear user data
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
