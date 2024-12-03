import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./Redux/store";

import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";
import BirthDate from "./components/BirthDate/BirthDate";

import Explore from "./components/Explore/Explore.jsx";
import Profile from "./components/Profile/Profile.jsx";
import AddPage from "./components/AddPage/AddPage.jsx";
import ReelsPage from "./components/ReelsPage/ReelsPage.jsx";

import HomePage from "./components/HomePage/HomePage.jsx";
import Post from "./components/Post/Post";
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
            </BrowserRouter>
          </div>
        </div>
      </Provider>
    </>
  );
}

export default App;
