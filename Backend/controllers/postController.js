//imports
import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import mongoose from "mongoose";

//import models
import Post from "../models/post.js";
import User from "../models/user.js";
import Comment from "../models/comment.js";
import post from "../models/post.js";

async function createPost(req, res) {
  try {
    const post = new Post({
      content: req.body.content,
      media: req.body.media,
      authorId: req.user.id,
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
      const firstComment = commentsForPost[0];

      return {
        _id: post._id,
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
    const post = await Post.find({ _id: id })
      .populate("authorId", "username profilePic")
      .lean();
    post[0].author = post[0].authorId;
    delete post[0].authorId;
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
async function likePostById(req, res) {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    //I AM COOKING !!!!!!! TOOK 2 HOURS TO MAKE IN 1 CALL TO MONGODB
    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId },
      [
        {
          //replaces
          $set: {
            likes: {
              //mongodb if syntax
              $cond: {
                if: { $in: [userId, "$likes"] },
                then: {
                  //filter that is mongodb if
                  $filter: {
                    input: "$likes",
                    //ne=not the same $$this=likes array
                    //so it filters out the userId
                    cond: { $ne: ["$$this", userId] },
                  },
                },
                // /combine array
                else: { $concatArrays: ["$likes", [userId]] },
              },
            },
          },
        },
      ],
      //true if needs update in db
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getPostByUserId(req, res) {
  //i know this isnt efficient but i cant learn all of mongodb syntax by myself ($match,$lookup,$unwind,$group,$sort,$project)
  try {
    const id = req.params.id;
    const posts = await Post.find({ authorId: id })
      .populate("authorId", "username profilePic")
      .lean();

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
async function getFollowerPost(req, res) {
  try {
    const posts = [];
    const userId = req.user.id;
    const fullUser = await User.findOne({ _id: userId });
    console.log(fullUser.following);

    for (const followed of fullUser.following) {
      const post = await Post.find({ authorId: followed })
        .populate("authorId", "username profilePic")
        .lean();
      console.log(post);
      posts.push(...post);
    }
    console.log(posts);

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
const postController = {
  createPost,
  getAllPosts,
  getPostById,
  likePostById,
  getPostByUserId,
  getFollowerPost,
};
export default postController;
