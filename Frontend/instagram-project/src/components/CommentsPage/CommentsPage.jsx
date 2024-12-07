import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import axios from "axios";
import CommentForm from "./CommentForm";
import { ClipLoader } from "react-spinners"; // Import the spinner component


const CommentsPage = () => {
  const navigate = useNavigate();
  const { postid } = useParams();
  const token = useSelector((state) => state.auth.token); // Access token from Redux
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        console.error("No token available. Redirecting to login...");
        navigate("/", { replace: true });
        return;
      }

      try {
        const response = await axios.get(
          `http://85.250.88.33:3006/api/comments/post/${postid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setComments(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response && error.response.status === 401) {
          console.error("Token is invalid. Redirecting to login...");
          navigate("/", { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postid, token, navigate]);

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
        {comments.map((comment) => (
          <div className="pt-1 pl-2 mb-6 flex gap-4" key={comment.id}>
            <img
              src={comment.author.profilePic}
              alt="author profile picture"
              className="rounded-full size-9"
            />
            <div className="flex flex-col">
              <p>
                <strong>{comment.author.username}</strong> {comment.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="self-stretch mb-20 bg-black">
        <CommentForm postId={postid} />
      </div>
    </div>
  );
};

export default CommentsPage;
