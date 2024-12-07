import React from "react";
import BottomNav from "../Nav/BottomNav";
import axios from "axios";

// import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Grid from "./Grid";

import img from "../../assets/images/IMG_5310.jpg";
const Profile = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("authToken");
      try {
        const response = await axios.get("http://85.250.88.33:3006/api/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  // const user = useSelector((state) => state.auth.user);
  // const token = sessionStorage.getItem("authToken");

  return (
    <div className="flex items-center justify-center w-[450px]">
      <div className="m-4">
        <h1 className="p-4">sasha.griss</h1>
        <div>
          <div className="flex items-center justify-center gap-4 p-4">
            <img
              className="w-20 h-20 rounded-full "
              src={img}
              alt="profile pic"
            />
            <div>
              <span></span> Posts
            </div>
            <div>
              <span></span> Followers
            </div>
            <div>
              <span></span> Following
            </div>
          </div>
        </div>
        <div>
          <h2>Name</h2>
          <p>Bio</p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button className="font-bold text-sm border-0 rounded-md mt-4 bg-slate py-2 w-[248px]">
            Edit profile
          </button>
        </div>
        <div className="grid">
          <Grid images={posts} />
        </div>
      </div>
      <BottomNav index={4} />
    </div>
  );
};

export default Profile;
