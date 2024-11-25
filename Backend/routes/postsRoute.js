//imports
import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

//import util js file
import util from "../utils/util.js";

//import middleware
import validator from "../middleware/validator.js";

//import models
import Post from "../models/post.js";

//import controllers
import postController from "../controllers/postController.js";
//configs
dotenv.config();
const router = express.Router();

//routes
//create new post
router.post(
  "/",
  validator.validatePost.createPostValidation,
  postController.createPost
);
export default router;
