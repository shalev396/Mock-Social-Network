//imports
import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

//import models
import Post from "../models/post.js";

async function createPost(req, res) {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      media: req.body.media,
      authorId: req.body.authorId,
    });

    console.log(post);

    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const postController = {
  createPost,
};
export default postController;
