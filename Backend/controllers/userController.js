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
      phoneNumber: req.body.phoneNumber,
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

async function loginUser(req, res) {
  try {
    const loginAttempt = {
      username: req.body.username,
      password: req.body.password,
    };
    //TODO: encryption
    // user.password = await encryption(user.password);
    console.log(loginAttempt);
    const AttemptUsername = await User.findOne({
      username: loginAttempt.username,
      password: loginAttempt.password,
    });
    const AttemptEmail = await User.findOne({
      email: loginAttempt.username,
      password: loginAttempt.password,
    });
    const AttemptPhoneNumber = await User.findOne({
      phoneNumber: loginAttempt.username,
      password: loginAttempt.password,
    });
    if (!AttemptEmail && !AttemptPhoneNumber && !AttemptUsername) {
      res.status(401).json(`"message":"login credential are invalid"`);
    } else {
      if (AttemptUsername) {
        res.status(201).json(AttemptUsername);
      }
      if (AttemptEmail) {
        res.status(201).json(AttemptEmail);
      }
      if (AttemptPhoneNumber) {
        res.status(201).json(AttemptPhoneNumber);
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const userController = {
  createUser,
  loginUser,
};
export default userController;
