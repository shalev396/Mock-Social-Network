//imports
import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

//import models
import Comment from "../models/comment.js";

async function createComment(req, res) {
  try {
    const comment = new Comment({
      postId: req.body.postId,
      authorId: req.body.authorId,
      text: req.body.text,
    });

    console.log(comment);
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getCommentByPostId(req, res) {
  try {
    const id = req.params.id;
    //filter by post id
    const comments = await Comment.find({ postId: id });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const commentsController = {
  createComment,
  getCommentByPostId,
};
export default commentsController;
