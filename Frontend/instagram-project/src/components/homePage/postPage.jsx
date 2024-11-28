import React, { useState } from "react";
import { data } from "../data/PostData"; // Import your data correctly

const PostPage = () => {
  // Initialize state with imported data
  const [posts, setPosts] = useState(data);

  // Handle like action
  const handleLike = (id) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
  };

  // Toggle comments visibility
  const handleToggleComments = (id) => {
    const updatedPosts = posts.map((post) =>
      post.id === id
        ? { ...post, showComments: !post.showComments }
        : post
    );
    setPosts(updatedPosts);
  };

  return (
    <div className="bg-black text-white min-h-screen p-1">
      {posts.map((post) => (
        <div
          key={post.id}
          className="p-4 mb-6"
        >
          {/* Username */}
          <h3 className="text-xl font-bold mb-2">{post.username}</h3>

          {/* Post Image */}
          <img
            src={post.image}
            alt={`Post by ${post.username}`}
            className="p-1"
          />

          {/* Like Button */}
          <button
            onClick={() => handleLike(post.id)}
            className=" text-white  px-4 "
          >
            ♥ ({post.likes})
          </button>

          {/* Toggle Comments Button */}
          <button
            onClick={() => handleToggleComments(post.id)}
            className="px-4"
          >
            {post.showComments ? "Hide Comments" : `💬${post.comments.length}`}
          </button>

          {/* Comments Section */}
          {post.showComments && (
            <div className="mt-4">
              <h4 className="text-lg font-bold mb-2">Comments:</h4>
              <ul className="list-disc ml-6">
                {post.comments.map((comment, index) => (
                  <li key={index} className="mb-1">
                    {comment}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostPage;
