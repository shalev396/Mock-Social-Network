import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profilePic: {
    type: String,
    require: false,
  },
  bio: {
    type: String,
    require: false,
  },
  followers: {
    type: Array,
    require: true,
    default: [],
  },
  following: {
    type: Array,
    require: true,
    default: [],
  },
  isPublic: {
    type: Boolean,
    require: true,
    default: true,
  },
  password: {
    type: String,
    require: true,
  },
  birthday: {
    type: Date,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    require: true,
  },
});

export default mongoose.model("User", userSchema);
