import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

// import axios from "axios";

// const CommentsPage = () => {
//   const { postId } = useParams(); // Extract postId from the route
//   const [comments, setComments] = useState([]);

//   useEffect(() => {
//     // Fetch comments
//     axios
//       .get(`/api/comments/post/${postId}`)
//       .then((response) => setComments(response.data))
//       .catch((err) => console.error("Error fetching comments:", err));
//   }, [postId]);


const CommentsPage = () => {
  // const  { postId } = useParams(); // Extract postId from the route


  return (
    <div className="w-full">
      {/* <div className="border-"></div> */}
      <h1>Hello, World!</h1>
    </div>
  );
};

export default CommentsPage;

