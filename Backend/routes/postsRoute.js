//imports
import express from "express";
import dotenv from "dotenv";
//import middleware
import validator from "../middleware/validator.js";
//import controllers
import postController from "../controllers/postController.js";
//configs
dotenv.config();
const router = express.Router();

//Routes

//Post

//Likes post by id
router.post(
  "/like/:id",
  validator.validatePost.LikePostValidation,
  postController.likePostById
);

//Create new post
router.post(
  "/",
  validator.validatePost.createPostValidation,
  postController.createPost
);

//Get

//Followed posts
router.get(
  "/followed",
  validator.validatePost.getFollowerPostValidation,
  postController.getFollowerPost
);

//Get user by id
router.get(
  "/user/:id",
  validator.validatePost.getPostByUserIdValidation,
  postController.getPostByUserId
);

//Get post by id
router.get(
  "/:id",
  validator.validatePost.getPostByIdValidation,
  postController.getPostById
);

//Get all posts
router.get(
  "/",
  validator.validatePost.getallPostValidation,
  postController.getAllPosts
);

export default router;
