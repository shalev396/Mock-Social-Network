import React from "react";
import { useNavigate } from "react-router-dom";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";

const Body = ({ postId, likes, commentsCount, content }) => {
  const navigate = useNavigate(); // Correct way to programmatically navigate

  const handleViewComments = () => {
    navigate(`/p/${postId}/comments`); // Navigate to the comments page
  };

  return (
    <div className="w-full px-2 space-x-6">
      {/* Action Section */}
      <div className="flex items-center gap-6">
        {/* Like Button */}
        <div className="flex items-center cursor-pointer">
          <OutlineHeart className="w-6 h-6 text-red-500" />
        </div>

        {/* Comments Button */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleViewComments}
        >
          <ChatBubbleBottomCenterIcon className="w-6 h-6 text-gray-500" />
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-gray-300">{content}</p>
      </div>

      {/* View All Comments Button */}
      <button
        className="text-gray-300"
        onClick={handleViewComments}
      >
        View all {commentsCount} comments
      </button>
    </div>
  );
};

export default Body;