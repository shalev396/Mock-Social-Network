import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person"; 
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate(); // UseNavigate hook for navigation
  const [users, setUsers] = useState([]); // State to store fetched users
  const [query, setQuery] = useState(""); // State to store the input value
  const token = useSelector((state) => state.auth.token); // Token from Redux

  const handleChange = async (e) => {
    const input = e.target.value;
    setQuery(input); // Update query state

    if (!input) {
      setUsers([]); // Clear users if input is empty
      return;
    }

    if (!token) {
      console.error("No token available.");
      return;
    }

    try {
      const response = await axios.get(
        `http://85.250.95.96:3006/api/users/search/${input}`, // Dynamic URL based on input
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      );
      setUsers(response.data.slice(0, 5)); // Update users state with fetched data
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  
  return (
    <div className="p-4 border-gray border-b-2">
    <div className="flex gap-4">
        <SearchSharpIcon className="flex mt-2"/>
      <input
        onChange={handleChange}
        value={query}
        type="text"
        placeholder="Search for users..."
        className=" p-2 rounded w-full mb-4  bg-black text-white"
      />
      </div>
      <div>
      <ul>
        {users.map((user) => (
          <li
            key={user._id}
            className="flex items-center gap-4 mb-2 border p-2 rounded hover:bg-gray-100 "
            onClick={()=> navigate(`/user/${user._id}`)}  
          >
            <img
              src={user.profilePic !== "" ? user.profilePic : <PersonIcon/>} // ProfilePic or fallback icon
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover "
            />
            <span className="font-medium">{user.username}</span>
          </li>
      
        ))}
      </ul>
      </div>
    </div>
  );
};

export default Search;
