import React from "react";
import BottomNav from "../Nav/BottomNav";
import Grid from "../Profile/Grid";
import Search from "./Search";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Explore = () => {
  const baseUrl = useSelector((state) => state.url.url);
  const [posts, setPosts] = useState([]);

  const token = useSelector((state) => state.auth.token); // Access token from Redux

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        console.error("No token available.");
        return;
      }
      try {
        const response = await axios.get(`${baseUrl}/api/posts`, {
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
    <div>
      <div>
        <Search className={""} />
      </div>
      <div className="grid">
        <Grid images={posts} />
      </div>
      <BottomNav index={1} />
    </div>
  );
};

export default Explore;
