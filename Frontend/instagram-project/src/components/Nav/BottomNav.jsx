import React from "react";
import { useNavigate } from "react-router-dom";

// Import MUI components
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

// Import MUI Icons
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import MovieIcon from "@mui/icons-material/Movie";

function BottomNav({ index }) {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(index || 0);

  const handleNavigation = (event, newValue) => {
    setValue(newValue);

    if (newValue === 0) navigate("/homepage");
    if (newValue === 1) navigate("/explore");
    if (newValue === 2) navigate("/add");
    if (newValue === 3) navigate("/reels");
    if (newValue === 4) navigate("/profile");
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleNavigation}
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        maxWidth: "450px",
        backgroundColor: "black",
        borderTop: "1px solid #333",
      }}
    >
      <BottomNavigationAction
        label="Home"
        icon={<HomeIcon />}
        sx={{ color: "white" }}
      />
      <BottomNavigationAction
        label="Explore"
        icon={<SearchIcon />}
        sx={{ color: "white" }}
      />
      <BottomNavigationAction
        label="Add"
        icon={<AddBoxIcon />}
        sx={{ color: "white" }}
      />
      <BottomNavigationAction
        disabled
        label="Reels"
        icon={<MovieIcon />}
        sx={{ color: "grey" }}
      />
      <BottomNavigationAction
        label="Profile"
        icon={<AccountCircleIcon />}
        sx={{ color: "white" }}
      />
    </BottomNavigation>
  );
}

export default BottomNav;
