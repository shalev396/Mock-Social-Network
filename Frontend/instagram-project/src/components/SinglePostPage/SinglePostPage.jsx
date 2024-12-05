import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Post from '../Post/Post';

const SinglePostPage = () => {
  const { postid } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem('authToken');
      try {
        const response = await axios.get(
          `http://85.250.88.33:3006/api/posts/${postid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPost(response.data[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [postid]);

  return (
    <div>
      {post ? <Post post={post} showBackButton={true} /> : 'Loading...'}
    </div>
  );
};

export default SinglePostPage;
