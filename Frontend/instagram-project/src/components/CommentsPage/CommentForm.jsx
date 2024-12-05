import React, { useRef ,useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const CommentForm = ({ postId }) => {
  const [text, setText] = useState('');
  const user = useSelector((state) => state.auth.user); // Access user from Redux state

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
      setText(''); // Clear the input field
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
      <form onSubmit={handleSubmit} className="flex items-center space-x-2 border-t-2 bg-black">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your comment..."
          required
          className="flex-grow bg-black text-white p-2 rounded-md"
        />
        <button
          type="submit"
          className={`px-4 py-2 font-semibold rounded-md ${
            text ? ' text-blue-500' : ' text-gray-700'
          }`}
          disabled={!text}
        >
          {text ? 'Post' : ''}
        </button>
      </form>
    );
    
};

export default CommentForm;
