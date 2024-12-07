import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const CommentForm = ({ postId, onNewComment }) => {
  const [text, setText] = useState(""); // State for the comment text
  const user = useSelector((state) => state.auth.user); // Access user from Redux state
  const token = useSelector((state) => state.auth.token); // Access token from Redux state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error("User not authenticated");
      return;
    }

    const newComment = {
      postId,
      text,
      authorId: user.id, // Include the user ID from Redux state
    };

    try {
      const response = await axios.post(
        "http://85.250.88.33:3006/api/comments",
        newComment,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the request headers
          },
        }
      );

      console.log("Comment created:", response.data);

      // Invoke the parent callback to add the new comment to the list
      onNewComment(response.data);

      // Clear the input field after successful submission
      setText("");
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center space-x-2 border-t-2 bg-black p-2"
    >
      {/* Input Field for Writing Comments */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your comment..."
        required
        className="flex-grow bg-black text-white p-2 rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className={`px-4 py-2 font-semibold rounded-md ${
          text ? "bg-blue-500 text-white" : "bg-gray-400 text-gray-700"
        }`}
        disabled={!text} // Disable the button when input is empty
      >
        Post
      </button>
    </form>
  );
};

export default CommentForm;
