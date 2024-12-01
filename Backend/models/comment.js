import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    require: true,
  },
  likes: {
    type: Array,
    require: true,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    require: true,
  },
});

export default mongoose.model("Comment", commentSchema);
