import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Post from "../Post/Post";
import { ClipLoader } from "react-spinners"; // Import the spinner component

const SinglePostPage = () => {
  const { postid } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null); // State to store the post data
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate(); // For navigation to the Not Found page
  const baseUrl = useSelector((state) => state.url.url);
  const token = useSelector((state) => state.auth.token); // Access token from Redux state

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        console.error("No token available. Redirecting to login...");
        navigate("/", { replace: true }); // Redirect to login if no token
        return;
      }

      try {
        const response = await axios.get(`${baseUrl}/api/posts/${postid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.length === 0) {
          // If the post doesn't exist, navigate to the Not Found page
          navigate("/not-found", { replace: true });
        } else {
          setPost(response.data[0]); // Set the post data
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response && error.response.status === 404) {
          // If the backend returns a 404 error, navigate to Not Found
          navigate("/not-found", { replace: true });
        }
      } finally {
        setLoading(false); // Set loading to false
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
    <div>
      {post ? <Post post={post} showBackButton={true} /> : "Post not found"}
    </div>
  );
};

export default SinglePostPage;
