//imports
import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import mongoose from "mongoose";

//import util js file
import util from "../utils/util.js";

//import middleware
import validator from "../middleware/validator.js";

//import models
import Comment from "../models/comment.js";

//import controllers
import commentController from "../controllers/commentController.js";
//configs
dotenv.config();
const router = express.Router();

//routes
//create new post
router.post(
  "/",
  validator.validateComment.createCommentValidation,
  commentController.createComment
);

//get post by id
router.get(
  "/post/:id",
  validator.validateComment.getCommentsByPostIdValidation,
  commentController.getCommentByPostId
);

export default router;
