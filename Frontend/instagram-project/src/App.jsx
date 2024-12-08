import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";

import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";
import BirthDate from "./components/BirthDate/BirthDate";
import Explore from "./components/Explore/Explore";
import Profile from "./components/Profile/Profile";
import AddPage from "./components/AddPage/AddPage";
import ReelsPage from "./components/ReelsPage/ReelsPage";
import SinglePostPage from "./components/SinglePostPage/SinglePostPage";
import CommentsPage from "./components/CommentsPage/CommentsPage";
import HomePage from "./components/homePage/HomePage";
import NotFound from "./components/NotFound";
import AppInitializer from "./utils/Applnitializer";
import ProtectedRoute from "./utils/ProtectedRoute";

import { ClipLoader } from "react-spinners";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Provider store={store}>
      <div className="bg-black w-screen h-screen m-0 p-0 text-white max-w-[450px] mx-auto">
        <BrowserRouter>
          <AppInitializer setLoading={setLoading} />
          {loading ? (
            <div className="flex items-center justify-center h-screen bg-black">
              <ClipLoader color="#ffffff" size={50} />
            </div>
          ) : (
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/birthdate" element={<BirthDate />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/add" element={<AddPage />} />
                <Route path="/reels" element={<ReelsPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/user/:id" element={<Profile />} />
                <Route path="/p/:postid" element={<SinglePostPage />} />
                <Route path="/p/:postid/comments" element={<CommentsPage />} />
              </Route>

              {/* Catch-All Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
