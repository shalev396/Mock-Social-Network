import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import axios from "axios";
import { Icon } from "@mui/material";




const CommentsPage = (PostContent) => {
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
    <div className="w-full flex flex-col">
<div className="flex items-center border-b p-2">
  <ArrowBackIosNewIcon className="mr-2" />
  <h1 className="flex-grow text-2xl text-center">Comments</h1>
</div>


      {comments.map((comment) => (
      <div className="pt-2" key={comment._id}>
          <h1><strong>{comment.authorId}</strong>: {comment.text}</h1>
      </div>
      ))}
    </div>
  )
}
  

export default CommentsPage;

