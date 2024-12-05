import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  media: {
    type: String,
    require: false,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: {
    type: Array,
    require: true,
    default: [],
  },
  commentsCount: {
    type: Number,
    require: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    require: true,
  },
});

export default mongoose.model("Post", postSchema);
