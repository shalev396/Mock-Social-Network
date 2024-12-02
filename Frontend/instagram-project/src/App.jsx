import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";

import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import HomePage from "./components/homePage/HomePage";
import Post from "./components/Post/Post";
import CommentsPage from "./components/CommentsPage/CommentsPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Provider store={store}>
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/homepage"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/p/:postid"
              element={
                <ProtectedRoute>
                  <Post />
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
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
