import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "./Header";

const Post = () => {
  const { postid } = useParams();
  const [post, setPost] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://85.250.88.33:3006/api/posts/${postid}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDlmZTYwMmIxOTc2ZDNlNjk2YWEyZCIsInVzZXJuYW1lIjoicm9uICIsImVtYWlsIjoiMTIxQGdtYS5jb20iLCJpYXQiOjE3MzMwNTc0MzIsImV4cCI6MTczMzA2MTAzMn0.pCRCv_9ykw93q1wspfzEFeS7EWHPoCddr6dHhk6E2LQ",
          },
        }
      );
      const postData = response.data[0];
      setPost(postData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [postid]);

  return (
    <div>
      {post ? (
        <>
          {/* Pass the authorId as a prop to Header */}
          <Header authorId={post.title}
          profilePic={post.media}
          media= {post.media}
          />
          <div className="p-4">

          </div>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default Post;
