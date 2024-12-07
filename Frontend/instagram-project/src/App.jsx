import "./App.css";
import React, { useState, useEffect } from "react";
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

import SinglePostPage from "./components/SinglePostPage/SinglePostPage.jsx";
import CommentsPage from "./components/CommentsPage/CommentsPage";
import HomePage from "./components/homePage/HomePage";

import NotFound from "./components/NotFound.jsx";

// Import the AppInitializer
import AppInitializer from "./utils/Applnitializer.jsx";
// Import ProtectedRoute
import ProtectedRoute from "./utils/ProtectedRoute.jsx";

//loading spinner
import { ClipLoader } from "react-spinners"; // Import the spinner component


function App() {
  const [loading, setLoading] = useState(true);

  // Ensure `AppInitializer` runs immediately
  useEffect(() => {
    console.log("App: Mounting AppInitializer...");
    setLoading(true); // Start with loading
  }, []);

  return (
    <Provider store={store}>
      <div className="bg-black w-screen h-screen m-0 p-0 text-white">
        <BrowserRouter>
          {/* Always render AppInitializer */}
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
