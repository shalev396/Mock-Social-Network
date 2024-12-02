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

// Add this route temporarily for testing
router.get("/test", async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("authorId")
      .populate("postId");
    res.json({
      count: comments.length,
      comments: comments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add this test route
router.get("/test/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    console.log("Testing postId:", postId);

    // Try both string and ObjectId
    const commentsWithString = await Comment.find({ postId: postId });
    const commentsWithObjectId = await Comment.find({
      postId: new mongoose.Types.ObjectId(postId),
    });

    res.json({
      searchedId: postId,
      commentsFoundWithString: commentsWithString.length,
      commentsFoundWithObjectId: commentsWithObjectId.length,
      sampleCommentString: commentsWithString[0],
      sampleCommentObjectId: commentsWithObjectId[0],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
