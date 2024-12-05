import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import axios from "axios";
import { Icon } from "@mui/material";
import TimeAgo from 'react-timeago';
import CommentForm from './CommentForm'



const CommentsPage = (PostContent) => {
  const navigate = useNavigate();
  const { postid } = useParams();
  const [comments, setComments] = useState([])

  const fetchData = async () => {
    const token = sessionStorage.getItem("authToken");
    
    try {
      const response = await axios.get(
        `http://85.250.88.33:3006/api/comments/post/${postid}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }          
      );
      const data= response.data
      setComments(data)
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData()
  }, [postid])

  return (
<div className="w-full flex flex-col h-screen">
  <div className="flex items-center border-b p-2 mb-4">
    <button onClick={() => navigate(-1)}>
      <ArrowBackIosNewIcon className="mr-2" />
    </button>
    <h1 className="flex-grow text-2xl text-center">Comments</h1>
  </div>

  <div className="flex-grow ">
    {comments.map((comment) => (
      <div className="pt-1 pl-2 mb-6 flex gap-4" key={comment.id}>
        <img
          src={comment.author.profilePic}
          alt="author profile picture"
          className="rounded-full size-9"
        />
        <div className="flex flex-col">
          <p>
            <strong>{comment.author.username}</strong> {comment.text}
          </p>
        </div>
      </div>
    ))}
  </div>

  <div className="self-stretch mb-20 bg-black ">
    <CommentForm postId={postid} />
  </div>
</div>

  )
}
  

export default CommentsPage;

