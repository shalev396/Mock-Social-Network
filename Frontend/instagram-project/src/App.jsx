import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";

// Import components
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";
import BirthDate from "./components/BirthDate/BirthDate";
import HomePage from "./components/homePage/HomePage";
import Post from "./components/Post/Post";
import CommentsPage from "./components/CommentsPage/CommentsPage";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import AppInitializer from "./Applnitializer"; // Import AppInitializer

function App() {
  return (
    <Provider store={store}>
      <AppInitializer /> {/* Initializes authentication state */}
      <div className="bg-black w-screen h-screen m-0 p-0 text-white">
        <BrowserRouter>
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
