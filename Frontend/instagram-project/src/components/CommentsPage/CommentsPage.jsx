import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CommentForm from "./CommentForm";
import CommentLike from "./CommentLike";
import { ClipLoader } from "react-spinners"; // Loading spinner

const CommentsPage = () => {
  const navigate = useNavigate();
  const { postid } = useParams(); // Fetch post ID from route
  const token = useSelector((state) => state.auth.token); // Access token from Redux
  const user = useSelector((state) => state.auth.user); // Access user from Redux state

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch comments from the API
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://85.250.95.96:3006/api/comments/post/${postid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      if (error.response && error.response.status === 401) {
        navigate("/not-found", { replace: true });
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch comments on mount and when postid changes
  useEffect(() => {
    if (postid && token) {
      fetchComments();
    } else {
      console.error("Missing post ID or token. Redirecting to login...");
      navigate("/", { replace: true });
    }
  }, [postid, token, navigate]);

  // Update comments by re-fetching after a new comment is added
  const handleNewComment = () => {
    fetchComments();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <ClipLoader color="#ffffff" size={50} />
      </div>
    );
  }


  return (
    <div className="w-full flex flex-col h-screen">
      <div className="flex items-center border-b p-2 mb-4">
        <button onClick={() => navigate(-1)}>
          <ArrowBackIosNewIcon className="mr-2" />
        </button>
        <h1 className="flex-grow text-2xl text-center">Comments</h1>
      </div>

      <div className="flex-grow overflow-y-auto">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div className="pt-1 pl-2 mb-6 flex gap-4" key={comment.id}>
              <img
                src={comment.author?.profilePic || ""}
                alt="author profile picture"
                className="rounded-full size-9"
              />
              <div className="flex flex-col">
                <p>
                  <strong>{comment.author?.username || "Unknown"}</strong> {comment.text}
                </p>
                
                <CommentLike
                  commentId={comment.id}
                  initialLikes={comment.likes.length}
                  isLiked={comment.likes.includes(user._id)} // Check if the user liked the comment
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-white text-center">No comments yet.</div>
        )}
      </div>

      <div className="self-stretch mb-20 bg-black">
        <CommentForm postId={postid} onNewComment={handleNewComment} />
      </div>
    </div>
  );
};

export default CommentsPage;
