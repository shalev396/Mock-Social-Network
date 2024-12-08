//imports
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import authenticator from "../middleware/Authenticator.js";
//import models
import User from "../models/user.js";
import mongoose from "mongoose";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
async function createUser(req, res) {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      profilePic: req.body.profilePic,
      password: req.body.password,
      birthday: req.body.birthday,
      phoneNumber: req.body.phoneNumber,
    });
    if (!user.profilePic) {
      user.profilePic = "";
    }
    user.birthday = new Date(user.birthday);
    // encryption on save()
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      $or: [
        { username: username },
        { email: username },
        { phoneNumber: username },
      ],
    });
    if (!user)
      return res.status(401).json({ message: "Login credentials are invalid" });

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid)
      return res.status(401).json({ message: "Login credentials are invalid" });
    console.log(user);

    // Generate a JWT with only essential user data
    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });

    // res.cookie("jwt", token, {
    //   httpOnly: true, // Prevents JavaScript access to the cookie
    //   secure: true, // Use HTTPS in production
    //   sameSite: "None", // Protects against CSRF
    //   maxAge: 3600000 * 24, // 1 hour in milliseconds
    // });
    user.password = undefined;
    return res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function verifyUnique(req, res) {
  try {
    const { username, email, phoneNumber } = req.body;

    // Single query to check for any matching documents
    const existingUser = await User.findOne({
      $or: [
        { username: username },
        { email: email },
        { phoneNumber: phoneNumber },
      ],
    });

    const isUniqueUsername =
      !existingUser || existingUser.username !== username;
    const isUniqueEmail = !existingUser || existingUser.email !== email;
    const isUniquePhoneNumber =
      !existingUser || existingUser.phoneNumber !== phoneNumber;

    if (isUniqueUsername && isUniqueEmail && isUniquePhoneNumber) {
      return res.status(200).json({ Unique: true });
    } else {
      return res.status(400).json({
        Unique: false,
        details: {
          username: isUniqueUsername,
          email: isUniqueEmail,
          phoneNumber: isUniquePhoneNumber,
        },
      });
    }
  } catch (error) {
    console.error("Error verifying uniqueness:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
async function getSelf(req, res) {
  try {
    const uid = req.user.id;
    const user = await User.findOne({ _id: uid });
    const sendUser = user.toObject();
    delete sendUser.password;
    return res.status(200).json(sendUser);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getUserById(req, res) {
  try {
    //do not get some details
    const user = await User.findOne(
      { _id: req.params.id },
      { password: 0, email: 0, phoneNumber: 0, birthday: 0 }
    );
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
async function getUsersByUsername(req, res) {
  try {
    const username = req.params.username;
    const users = await User.find({
      username: { $regex: username, $options: "i" },
    });
    users.forEach((user) => {
      const sendUser = user.toObject();

      delete sendUser.password;
      delete sendUser.password;
      delete sendUser.email;
      delete sendUser.phoneNumber;
      delete sendUser.birthday;
      return sendUser;
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
async function followUserById(req, res) {
  try {
    const uid = req.params.id;
    const user = await User.findOne({ _id: req.user.id });
    const followedUser = await User.findOne({ _id: uid });

    if (!user.following.includes(followedUser.id)) {
      user.following.push(followedUser.id);
    } else {
      user.following.splice(user.following.indexOf(followedUser.id), 1);
    }
    await User.findOneAndReplace({ _id: user.id }, user);

    if (!followedUser.followers.includes(user.id)) {
      followedUser.followers.push(user.id);
    } else {
      followedUser.followers.splice(followedUser.followers.indexOf(user.id), 1);
    }
    await User.findOneAndReplace({ _id: followedUser.id }, followedUser);
    const checks = { me: user, him: followedUser };
    res.status(200).json(checks);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
async function editUser(req, res) {
  try {
    const uid = req.user.id;

    const updates = {
      ...(req.body.username && { username: req.body.username }),
      ...(req.body.email && { email: req.body.email }),
      ...(req.body.phoneNumber && { phoneNumber: req.body.phoneNumber }),
      ...(req.body.profilePic && { profilePic: req.body.profilePic }),
      ...(req.body.bio && { bio: req.body.bio }),
    };

    const updatedUser = await User.findOneAndUpdate(
      { _id: uid },
      { $set: updates },
      { new: false, upsert: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const userController = {
  createUser,
  loginUser,
  verifyUnique,
  getSelf,
  getUserById,
  getUsersByUsername,
  followUserById,
  editUser,
};
export default userController;
