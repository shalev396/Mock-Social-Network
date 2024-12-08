import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useSelector } from "react-redux";

const Body = ({ isLikedByMe, postId, initialLikes, commentsCount, content, authorName }) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token); // Access token from Redux state
  const [isLiked, setIsLiked] = useState(isLikedByMe); // Track whether the post is liked
  const [likesCount, setLikesCount] = useState(initialLikes); // Track the number of likes
  const [isAnimating, setIsAnimating] = useState(false); // State to handle the animation

  const handleLikeToggle = async () => {
    try {
      // Trigger animation
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 200); // Animation duration matches transition

      // Send API request to toggle like
      const response = await axios.post(
        `http://85.250.95.96:3006/api/posts/like/${postId}`,
        {}, // No body required
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Toggle like state and update the count
      setIsLiked((prev) => !prev);
      setLikesCount(response.data.likes.length);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleViewComments = () => {
    navigate(`/p/${postId}/comments`);
  };

  return (
    <div className="w-full px-2 space-x-1">
      {/* Action Section */}
      <div className="flex items-center gap-6">
        {/* Like Button */}
        <div className="flex items-center cursor-pointer" onClick={handleLikeToggle}>
          {isLiked ? (
            <SolidHeart
              className={`w-6 h-6 text-red-500 transition-transform transform ${
                isAnimating ? "scale-125" : ""
              }`}
            />
          ) : (
            <OutlineHeart
              className={`w-6 h-6 text-gray-500 transition-transform transform ${
                isAnimating ? "scale-125" : ""
              }`}
            />
          )}
          <span className="text-gray-400 ml-2">{likesCount}</span>
        </div>

        {/* Comments Button */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleViewComments}
        >
          <ChatBubbleBottomCenterIcon className="w-6 h-6 text-gray-500" />
          <span className="text-gray-400">{commentsCount}</span>
        </div>
      </div>

      {/* Post Content */}
      <div className="my-4">
        <p className="text-gray-300">
          <strong>{authorName}</strong> {content}
        </p>
      </div>

      {/* View All Comments Button */}
      <button className="text-gray-300" onClick={handleViewComments}>
        View all {commentsCount} comments
      </button>
    </div>
  );
};

export default Body;
