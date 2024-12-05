import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const CommentForm = ({ postId }) => {
  const [text, setText] = useState('');
  const user = useSelector((state) => state.auth.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      console.error('User not authenticated');
      return;
    }

    const newComment = {
      postId,
      text,
      authorId: user.id,
    };

    try {
      const token = sessionStorage.getItem('authToken');
      const response = await axios.post('http://85.250.88.33:3006/api/comments', newComment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Comment created:', response.data);
      // Optionally, update the UI or state to reflect the new comment
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your comment..."
        required
        className="flex-grow bg-gray-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className={`px-4 py-2 font-semibold rounded-md ${
          text ? 'bg-blue-500 text-white' : 'bg-gray-400 text-gray-700'
        }`}
        disabled={!text}
      >
        Post
      </button>
    </form>
  );
};

export default CommentForm;
