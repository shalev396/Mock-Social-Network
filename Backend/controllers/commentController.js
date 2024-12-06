//imports
import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import mongoose from "mongoose";

//import models
import Comment from "../models/comment.js";
import Post from "../models/post.js";

async function createComment(req, res) {
  try {
    const comment = new Comment({
      postId: new mongoose.Types.ObjectId(req.body.postId),
      authorId: new mongoose.Types.ObjectId(req.user.id),
      text: req.body.text,
    });

    const newComment = await comment.save();

    // Update the post's comment count
    await Post.findByIdAndUpdate(req.body.postId, {
      $inc: { commentsCount: 1 },
    });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getCommentByPostId(req, res) {
  try {
    const id = req.params.id;
    console.log(id);

    const comments = await Comment.find({ postId: id })
      .populate("authorId", "username profilePic") //  author
      .sort({ createdAt: -1 })
      .lean();
    console.log(comments);

    if (!comments) {
      return res
        .status(404)
        .json({ message: "No comments found for this post" });
    }

    // Format
    const formattedComments = comments.map((comment) => ({
      postId: comment.postId,
      text: comment.text,
      authorId: comment.authorId._id,
      author: {
        username: comment.authorId.username,
        profilePic: comment.authorId.profilePic,
      },
      likes: comment.likes,
      id: comment._id,
      createdAt: comment.createdAt,
    }));

    res.status(200).json(formattedComments);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid post ID format" });
    }
    res.status(500).json({ message: error.message });
  }
}
async function likeCommentById(req, res) {
  try {
    const CommentId = req.params.id;
    const userId = req.user.id;
    const result = await Comment.find({ _id: CommentId });
    const comment = result[0];
    console.log(comment);

    if (!comment.likes.includes(userId)) {
      comment.likes.push(userId);
    } else {
      comment.likes.splice(comment.likes.indexOf(userId), 1);
    }
    console.log(comment);
    await Comment.findOneAndReplace({ _id: comment.id }, comment);

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const commentsController = {
  createComment,
  getCommentByPostId,
  likeCommentById,
};
export default commentsController;
