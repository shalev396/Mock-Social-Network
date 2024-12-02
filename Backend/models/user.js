import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

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
  phoneNumber: {
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

// hash the password
userSchema.pre("save", async function (next) {
  //prevent hashing when password did not changed
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(
    this.password + "" + process.env.ENCRYPTION_KEY,
    10
  );
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(
    password + "" + process.env.ENCRYPTION_KEY,
    this.password
  );
};

export default mongoose.model("User", userSchema);
