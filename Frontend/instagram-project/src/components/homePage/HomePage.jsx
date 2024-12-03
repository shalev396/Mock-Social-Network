import React, { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const [posts, setPosts] = useState([]); // Initialize posts as an empty array

  // Fetch posts from API
  const fetchData = async () => {
    const token = sessionStorage.getItem("authToken"); // Retrieve token from sessionStorage

    try {
      const response = await axios.get("http://85.250.88.33:3006/api/posts", {
        headers: {
          Authorization: `Bearer ${token}`, // Dynamically use the token
        },
      });

      setPosts(response.data); // Update posts state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle like toggle
  const handleLike = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === id
          ? {
              ...post,
              likes: post.likes.includes("currentUserLike")
                ? post.likes.filter((like) => like !== "currentUserLike") // Unlike
                : [...post.likes, "currentUserLike"], // Like
            }
          : post
      )
    );
  };

  return (
    <div className="bg-black text-white p-0">
      {posts.map((post) => (
        <div key={post._id} className="p-4 mb-6">
          {/* Title */}
          <h3 className="text-xl font-bold mb-2">{post.title}</h3>

          {/* Media */}
          {post.media && (
            <div className="-mx-4">
              <img
                src={post.media}
                alt={`Post: ${post.title}`}
                className="w-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <p className="text-gray-300 mt-2">
            <span className="font-bold">{post.title}</span> {post.content}
          </p>

          {/* Like Button */}
          <button
            onClick={() => handleLike(post._id)}
            className="text-white px-4 py-2 mr-2"
          >
            {post.likes.includes("currentUserLike") ? "💗" : "𖹭"} (
            {post.likes.length}) {/* Toggle button text and show like count */}
          </button>

          {/* Comments Count */}
          <button className="text-white px-4 py-2">
            💬 ({post.commentsCount})
          </button>

          {/* Created At */}
          <p className="text-gray-500 text-sm mt-4">
            Posted on: {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
