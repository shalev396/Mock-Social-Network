import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Post from "../Post/Post";
import BottomNav from "../Nav/BottomNav";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  const token = useSelector((state) => state.auth.token); // Access token from Redux

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        console.error("No token available.");
        return;
      }
      try {
        const response = await axios.get("http://85.250.95.96:3006/api/posts", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        });
        setPosts(response.data);
      } catch (error) {

        console.error("Error fetching posts:", error);

      }
    };

    fetchData();
  }, [token]); // Re-fetch if token changes

  return (
    <div className="bg-black text-white p-0" style={{ paddingBottom: "56px" }}>
      {/* Bottom Navigation */}
      <BottomNav
        index={0}
        sx={{
          position: "fixed", // Fix to viewport
          bottom: 0,
          width: "100%",
          zIndex: 1000, // Keep above other elements
        }}
      />

      {/* Render Posts */}
      {posts.map((post) => (
        <Post key={post._id} post={post} showBackButton={false} />
      ))}
      <BottomNav index={0} />
    </div>
  );
};

export default HomePage;
