import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../Post/Post';

const HomePage = () => {

  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem('authToken');
      try {
        const response = await axios.get('http://85.250.88.33:3006/api/posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-black text-white p-0">
      {posts.map((post) => (
        <Post key={post._id} post={post} showBackButton={false} />
      ))}
    </div>
  );
};

export default HomePage;
