//imports
import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

//import models
import User from "../models/user.js";

async function createUser(req, res) {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      profilePic: req.body.profilePic,
      password: req.body.password,
      birthday: req.body.birthday,
    });
    if (!user.profilePic) {
      user.profilePic = "";
    }
    user.birthday = new Date(user.birthday);
    //TODO: encryption
    // user.password = await encryption(user.password);
    console.log(user);

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const userController = {
  createUser,
};
export default userController;
