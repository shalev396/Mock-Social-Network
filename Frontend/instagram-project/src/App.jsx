import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import components
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";
import HomePage from "./components/homePage/HomePage"; // Fix import for PascalCase
import Post from "./components/Post/Post"


function App() {
  return (
    <div className="bg-black w-screen h-screen m-0 p-0 text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/p/:postid" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;



// import "./App.css";

// import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// import HomePage from './pages/HomePage';
// import  Explore  from './pages/Explore';
// import Inbox from './pages/Profile';
// import Comments from './pages/Comments';
// import RootLayout from './pages/Root';



// const router = createBrowserRouter([
//   {path: '/',
//     element: <RootLayout />,
//     children:[

//       {index: true , element: <HomePage />},
//       {path: '/profile/:profileid', element: <Profile />},
//       {path: '/prof', element: <Explore/>},
//       {path: '/profile/:profileid/inbox', element: <Inbox/>},
//       {path: '/profile/comments', element: <Comments />}
//   ] }
// ])
// function App() {
//   return <RouterProvider router= {router}/>;
// }

// export default App;
