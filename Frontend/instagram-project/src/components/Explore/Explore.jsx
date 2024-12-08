import React from "react";
import BottomNav from "../Nav/BottomNav";
import Grid from "../Profile/Grid";
import Search from "./Search";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";




const Explore = () => {

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
    <div>
    <div>
    <Search className={'w-'}/>
    </div>
      <div className="grid">
          <Grid images={posts} />
      </div>
      <BottomNav index={1} />
    </div>
  );
};

export default Explore;
