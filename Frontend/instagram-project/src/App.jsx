import "./App.css";
import React, { useState, useEffect } from "react";
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

import { ClipLoader } from "react-spinners"; // Loading spinner

function App() {
  const [loading, setLoading] = useState(true);


  return (
    <Provider store={store}>
      <div className="bg-black w-screen h-screen m-0 p-0 text-white">
        <BrowserRouter>
          <AppInitializer setLoading={setLoading} />
          {loading ? (
            <div className="flex items-center justify-center h-screen bg-black">
              <ClipLoader color="#ffffff" size={50} />
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/birthdate" element={<BirthDate />} />
              <Route
                path="/homepage"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/explore"
                element={
                  <ProtectedRoute>
                    <Explore />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add"
                element={
                  <ProtectedRoute>
                    <AddPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reels"
                element={
                  <ProtectedRoute>
                    <ReelsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/p/:postid"
                element={
                  <ProtectedRoute>
                    <SinglePostPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/p/:postid/comments"
                element={
                  <ProtectedRoute>
                    <CommentsPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
