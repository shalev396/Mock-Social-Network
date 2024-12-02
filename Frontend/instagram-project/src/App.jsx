import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Provider } from "react-redux";

// Import components
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";

import BirthDate from "./components/BirthDate/BirthDate";
import store from "./Redux/store";


import Explore from "./components/Explore/Explore.jsx";
import Profile from "./components/Profile/Profile.jsx";
import AddPage from "./components/AddPage/AddPage.jsx";
import ReelsPage from "./components/ReelsPage/ReelsPage.jsx";

// Import MUI components
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

// Import MUI Icons
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import MovieIcon from "@mui/icons-material/Movie";

function BottomNav() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

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
        label="Reels"
        icon={<MovieIcon />}
        sx={{ color: "white" }}
      />
      <BottomNavigationAction
        label="Profile"
        icon={<AccountCircleIcon />}
        sx={{ color: "white" }}
      />
    </BottomNavigation>
  );
}


////////

import HomePage from "./components/homePage/HomePage"; // Fix import for PascalCase
import Post from "./components/Post/Post"
import CommentsPage from "./components/CommentsPage/CommentsPage";


function App() {
  return (
    <>
      <Provider store={store}>
        <div className="bg-black w-screen h-screen m-0 p-0 text-white">
          <div>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/birthdate" element={<BirthDate />} />
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/add" element={<AddPage />} />
                <Route path="/reels" element={<ReelsPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/p/:postid" element={<Post />} />
                <Route path="/p/:postid/comments" element={<CommentsPage />} />
              </Routes>
              <BottomNav />
            </BrowserRouter>
          </div>
        </div>
      </Provider>
    </>

  );
}

export default App;



// import "./App.css";

// import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// import HomePage from './pages/HomePage';
// import  Explore  from './pages/Explore';
// import Inbox from './pages/Profile';
// import Comments from './pages/Comments';
// import RootLayout from './pages/Root';



// const router = createBrowserRouter([
//   {path: '/',
//     element: <RootLayout />,
//     children:[

//       {index: true , element: <HomePage />},
//       {path: '/profile/:profileid', element: <Profile />},
//       {path: '/prof', element: <Explore/>},
//       {path: '/profile/:profileid/inbox', element: <Inbox/>},
//       {path: '/profile/comments', element: <Comments />}
//   ] }
// ])
// function App() {
//   return <RouterProvider router= {router}/>;
// }

// export default App;
