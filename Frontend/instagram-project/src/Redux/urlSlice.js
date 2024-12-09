import { createSlice } from "@reduxjs/toolkit";
//http://85.250.95.96:3006
const initialState = {
  url: "https://mock-social-network.onrender.com",
};

const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {},
});

export default urlSlice.reducer;
