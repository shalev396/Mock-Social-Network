//imports
import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

//import util js file
import util from "../utils/util.js";

//import middleware
import validator from "../middleware/validator.js";

//import models
import User from "../models/user.js";

//import controllers
import userController from "../controllers/userController.js";
//configs
dotenv.config();
const router = express.Router();

//routes
//create new user
router.post(
  "/",
  validator.validateUser.createUserValidation,
  userController.createUser
);
//login user
router.post(
  "/login",
  validator.validateUser.loginUserValidation,
  userController.loginUser
);
//verify before
router.post(
  "/verify",
  validator.validateUser.verifyUniqueValidation,
  userController.verifyUnique
);

export default router;
