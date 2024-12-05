import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
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
      console.log(response.data);
      
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
        {/* my defult header for  single post  */}
        <div className="flex items-center justify-between pt-1">
          <ChevronLeftIcon className="size-9 text-gray-500 flex-none" />
          <h1 className="text-1.5xl  text-center flex-grow pr-5">Post</h1>
        </div>

          {/* pass the pfp username and the media of post*/}
          <Header authorName={post.authorId.username}
          profilePic={post.authorId.profilePic}
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
