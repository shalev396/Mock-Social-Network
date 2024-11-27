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
async function getAllPosts(req, res) {
  try {
    const allPosts = await Post.find();
    res.status(200).json(allPosts);
  } catch (error) {
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
