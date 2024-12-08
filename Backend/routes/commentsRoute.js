//imports
import express from "express";
import dotenv from "dotenv";

//import middleware
import validator from "../middleware/validator.js";

//import controllers
import commentController from "../controllers/commentController.js";
//configs
dotenv.config();
const router = express.Router();

//Routes
//Post
//likes comment
//TODO PATCH
router.post(
  "/like/:id",
  validator.validateComment.LikeCommentValidation,
  commentController.likeCommentById
);
// Create new comment
router.post(
  "/",
  validator.validateComment.createCommentValidation,
  commentController.createComment
);

//posts
//Get comments of post by id
router.get(
  "/post/:id",
  validator.validateComment.getCommentsByPostIdValidation,
  commentController.getCommentByPostId
);

export default router;
