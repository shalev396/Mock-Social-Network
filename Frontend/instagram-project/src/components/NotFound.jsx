import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white bg-black">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Page Not Found</p>
      <Link
        to="/HomePage"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
