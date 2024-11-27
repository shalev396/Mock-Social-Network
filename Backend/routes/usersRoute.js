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
router.post(
  "/login",
  validator.validateUser.loginUserValidation,
  userController.loginUser
);
//encryption
// async function encryption(str) {
//   try {
//     const hash = await bcrypt.hash(str + process.env.ENCRYPTION_KEY, 10);
//     return hash;
//   } catch (err) {
//     throw new Error("Error in encryption: " + err.message);
//   }
// }
// async function compareHash(str, hashedPassword) {
//   return await bcrypt.compare(str + process.env.ENCRYPTION_KEY, hashedPassword);
// }
export default router;
