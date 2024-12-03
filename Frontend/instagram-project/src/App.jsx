import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";

import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";
import BirthDate from "./components/BirthDate/BirthDate";
import Explore from "./components/Explore/Explore.jsx";
import Profile from "./components/Profile/Profile.jsx";
import AddPage from "./components/AddPage/AddPage.jsx";
import ReelsPage from "./components/ReelsPage/ReelsPage.jsx";

import HomePage from "./components/homePage/HomePage";
import Post from "./components/Post/Post";
import CommentsPage from "./components/CommentsPage/CommentsPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
  <>
    <Provider store={store}>
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/birthdate" element={<BirthDate />} />
              
            <Route path="/explore" element={<Explore />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="/reels" element={<ReelsPage />} />
            <Route path="/profile" element={<Profile />} />  
            <Route path="/homepage" element={ <ProtectedRoute> <HomePage /> </ProtectedRoute>}/>

            <Route path="/p/:postid" element={ <ProtectedRoute> <Post /> </ProtectedRoute> } /> 
            <Route path="/p/:postid/comments" element={ <ProtectedRoute> <CommentsPage /> </ProtectedRoute>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
    </>
  );
}

export default App;
