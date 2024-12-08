import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import BottomNav from "../Nav/BottomNav";
import Grid from "./Grid";
import img from "../../assets/images/IMG_5310.jpg";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Redux/authSlice.js";
import LogoutIcon from "@mui/icons-material/Logout";
import EditProfile from "./EditProfile.jsx";
import { useParams } from "react-router-dom";
import { use } from "react";


const Profile = (userId) => {
  let viewUser = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(viewUser);
  const [posts, setPosts] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const Dev_Url = "http://85.250.95.96:3006/";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openEditProfileDialog, setOpenEditProfileDialog] = useState(false);
  console.log(user.followers , viewUser._id);
const bool =   user.followers.includes(viewUser._id.toString())

  const [isFollow, setIsFollow] = useState(false);
  console.log(isFollow);
  

  const { id } = useParams(); // Get the post ID from the URL
  // const fetchData = async () =>{ try{
  // const response = await axios.get(`${Dev_Url}api/users/${id}`,{
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },}
  
// );
// console.log(response.data);
// setUser(response.data)
// }catch{
//   console.error("Error fetching user posts:", error);
//   navigate("/");
// }}
useEffect(() => {
  const fetchData = async () => {
    if (!id) return; // Exit if no ID is provided

    try {
      const response = await axios.get(`${Dev_Url}api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user posts:", error);
      navigate("/"); // Redirect to home on error
    }
  };

  fetchData();
}, [id, token, navigate]);

  

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user || !token) {
        console.error("User or token is missing.");
        return;
      }

      try {
        const response = await axios.get(
          `${Dev_Url}api/posts/user/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts(response.data);
        setIsFollow(user.followers.includes(viewUser._id.toString()))
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    fetchUserPosts();
  }, [user, token, Dev_Url]);

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("user");
    dispatch(logout());
    navigate("/");
  };
  const formatFollowers = (followersCount) => {
    if (followersCount >= 1000) {
      return (followersCount / 1000).toFixed(1) + "k";
    }
    return followersCount;
  };

  async function handleFollow() {
    try {
      const response = await axios.post(
        `${Dev_Url}api/users/follow/${id}`, // Ensure `Dev_Url` and `id` are correct
        {}, // No body needed, pass an empty object
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure token is correct
          },
        }
      );
      console.log(response.data);
      setIsFollow(!isFollow)
    } catch (error) {
      console.error("Error following user:", error);
    }
  }
  


  const openDialog = () => setOpenEditProfileDialog(true);
  const closeDialog = () => setOpenEditProfileDialog(false);
  
  return (
    <div className="flex items-center justify-center w-[450px]">
      <div className="m-4">
        <div className="flex justify-between">
          <h1 className=" text-xl font-bold p-4">
            {user?.username || "Username"}
          </h1>
          <button
            onClick={handleLogout}
            className="font-bold text-sm border-1 rounded-md border border-gray-800 mt-4 py-2 w-[100px] hover:bg-gray-800"
          >
            Log Out
            <LogoutIcon sx={{ fontSize: 20 }} className="pl-2" />
          </button>
        </div>
        <div>
          <div className="flex items-center justify-center gap-4 p-4">
            <img
              className="w-20 h-20 rounded-full object-cover"
              src={user?.profilePic || img}
              alt="profile pic"
            />
            <div className="flex flex-row gap-6 text-center">
              <div className="mb-4">
                <span className="text-base font-bold">{posts.length}</span>
                <div>Posts</div>
              </div>
              <div className="mb-4">
                <span className="text-base font-bold">
                  {formatFollowers(user?.followers?.length || 0)}
                </span>
                <div>Followers</div>
              </div>
              <div>
                <span className="text-base font-bold">
                  {user?.following?.length || 0}
                </span>
                <div>Following</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p>{user?.bio || "Bio"}</p>
        </div>
        <div className="flex items-center justify-center gap-4">
        {!id ? (
          <button
            onClick={openDialog}
            className="font-bold text-sm border-0 rounded-md mt-4 bg-gray-800 py-2 w-[248px] hover:bg-gray-700"
          >
            Edit profile
          </button>):
          (<button
           onClick={handleFollow}
           className="font-bold text-sm border-0 rounded-md mt-4 bg-gray-800 py-2 w-[248px] hover:bg-gray-700"
           >
            {isFollow ? 'unFollowed' : 'follow' }
          </button>)}
        </div>
        <div className="grid">
          <Grid images={posts} />
        </div>
      </div>
      <BottomNav index={4} />
      <EditProfile
        open={openEditProfileDialog}
        handleClose={closeDialog}
        user={user}
        token={token}
      />
    </div>
  );
};

export default Profile;
