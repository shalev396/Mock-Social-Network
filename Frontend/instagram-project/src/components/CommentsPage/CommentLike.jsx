import React, { useState } from "react";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import axios from "axios";
import { useSelector } from "react-redux";

const CommentLike = ({ commentId, initialLikes, isLiked }) => {
  const token = useSelector((state) => state.auth.token); // Access token from Redux
  const [liked, setLiked] = useState(isLiked); // State to track if the comment is liked
  const [likesCount, setLikesCount] = useState(initialLikes); // State to track likes count
  const [isAnimating, setIsAnimating] = useState(false); // State to handle the animation
  const baseUrl = useSelector((state) => state.url.url);
  const handleToggleLike = async () => {
    try {
      // Trigger animation
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 200); // Animation duration matches transition

      // Optimistically update UI
      setLiked((prev) => !prev);

      // Make API call to toggle like
      const response = await axios.post(
        `${baseUrl}/api/comments/like/${commentId}`,
        {}, // No body required
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLikesCount(response.data.likes.length);
    } catch (error) {
      console.error("Error toggling like:", error);

      // Revert UI state on error
    }
  };

  return (
    <div
      className="flex items-center cursor-pointer"
      onClick={handleToggleLike}
    >
      {liked ? (
        <SolidHeart
          className={`w-5 h-5 text-red-500 transition-transform transform ${
            isAnimating ? "scale-125" : ""
          }`}
        />
      ) : (
        <OutlineHeart
          className={`w-5 h-5 text-gray-500 transition-transform transform ${
            isAnimating ? "scale-125" : ""
          }`}
        />
      )}
      <span className="ml-2 text-gray-400">{likesCount}</span>
    </div>
  );
};

export default CommentLike;
