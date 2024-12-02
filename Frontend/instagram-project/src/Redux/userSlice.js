import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  birthday: "",
  phoneNumber: "",
  username: "",
  profilePic: "",
  password: "",
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setBirthday: (state, action) => {
      state.birthday = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setProfilePic: (state, action) => {
      state.profilePic = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    resetUser: () => initialState,
  },
});

export const {
  setEmail,
  setProfilePic,
  setBirthday,
  setPhoneNumber,
  setUsername,
  setPassword,
  resetUser,
} = userSlice.actions;

export default userSlice.reducer;
