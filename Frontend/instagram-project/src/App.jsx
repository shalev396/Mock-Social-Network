import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import components
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";
import HomePage from "./components/homePage/HomePage"; // Fix import for PascalCase



function App() {
  return (
    <div className="bg-black w-screen h-screen m-0 p-0 text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/homepage" element={<HomePage />} /> {/* Fix PascalCase */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
