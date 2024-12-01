import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

const Header = ({ authorId, profilePic, media }) => {
  return (
    <div className="w-full">
      {/* Row with ChevronLeftIcon and "Post" */}
      <div className="flex gap-4 ">
        <ChevronLeftIcon className="size-9  " />
        <h1 className="text-2xl font-bold self-center">Post</h1>
      </div>

      {/* Border below */}
      <div className="border-b border-gray-400 my-2"></div>

      {/* Profile Picture and Author ID */}
      <div className="flex gap-4 pl-3">
        <img
          src={profilePic}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <h2 className="text-white-600 self-center">{authorId}</h2>
      </div>

    <div>
    <img
          src={media}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
    </div>
    </div>
  );
};

export default Header;
