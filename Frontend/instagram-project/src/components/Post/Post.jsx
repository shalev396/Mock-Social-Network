import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Body from "./body";
import Header from "./Header";

const Post = () => {
  const { postid } = useParams();
  const [post, setPost] = useState(null);

  const fetchData = async () => {
    const token = sessionStorage.getItem("authToken");
    try {
      const response = await axios.get(
        `http://85.250.88.33:3006/api/posts/${postid}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
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
          {/* Pass the auth name as the post title for now,  the  media as the profile pic for now */}
          <Header authorName={post.title}
          profilePic={post.media}
          media= {post.media}
          />

          {/* body part */}
          <Body 
          commentsCount={post.commentsCount}
          likes= {post.likes.length}
          content={post.content}
          postId= {post._id}
          />

        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default Post;
