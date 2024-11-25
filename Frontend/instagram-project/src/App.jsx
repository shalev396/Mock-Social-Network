import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import components
import SignIn from "./components/SignUp/SignIn";
import LogIn from "./components/LogIn/LogIn";

function App() {
  return (
    <>
      <div className="bg-black w-screen h-screen m-0 p-0 text-white">
        <div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LogIn />} />
              <Route path="/signup" element={<SignIn />}></Route>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;
