import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";

// Import components
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";
import BirthDate from "./components/BirthDate/BirthDate";
import store from "./Redux/store";

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
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </Provider>
    </>
  );
}

export default App;
