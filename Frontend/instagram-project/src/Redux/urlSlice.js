import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: "http://85.250.95.96:3006",
};

const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {},
});

export default urlSlice.reducer;
