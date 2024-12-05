//imports
import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import mongoose from "mongoose";

//import models
import Post from "../models/post.js";
import User from "../models/user.js";
import Comment from "../models/comment.js";

async function createPost(req, res) {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      media: req.body.media,
      authorId: req.body.authorId,
    });

    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function getAllPosts(req, res) {
  try {
    //populate author details
    const allPosts = await Post.find()
      .populate("authorId", "username profilePic")
      .lean();

    //first c
    const allComments = await Comment.find()
      .populate("authorId", "username profilePic")
      .sort({ createdAt: 1 })
      .lean();
    //first c+author
    const postsWithComments = allPosts.map((post) => {
      const postIdString = post._id.toString();

      const commentsForPost = allComments.filter(
        (comment) => comment.postId.toString() === postIdString
      );
      console.log(commentsForPost);

      const firstComment = commentsForPost[0];

      return {
        _id: post._id,
        title: post.title,
        content: post.content,
        media: post.media,
        author: {
          _id: post.authorId._id,
          username: post.authorId.username,
          profilePic: post.authorId.profilePic,
        },
        likes: post.likes,
        commentsCount: commentsForPost.length,
        createdAt: post.createdAt,
        firstComment: firstComment
          ? {
              _id: firstComment._id,
              text: firstComment.text,
              createdAt: firstComment.createdAt,
              author: {
                _id: firstComment.authorId._id,
                username: firstComment.authorId.username,
                profilePic: firstComment.authorId.profilePic,
              },
            }
          : null,
      };
    });

    res.status(200).json(postsWithComments);
  } catch (error) {
    console.error("Error in getAllPosts:", error);
    res.status(500).json({ message: error.message });
  }
}

async function getPostById(req, res) {
  try {
    const id = req.params.id;
    const post = await Post.find({ _id: id });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const postController = {
  createPost,
  getAllPosts,
  getPostById,
};
export default postController;
