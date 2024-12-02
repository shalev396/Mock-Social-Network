import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

const Header = ({ authorName, profilePic, media }) => {
  return (
    <div className="w-full">
      {/* Row with ChevronLeftIcon and "Post" */}
      <div className="flex items-center justify-between pt-1">
  <ChevronLeftIcon className="size-9 text-gray-500 flex-none" />
  <h1 className="text-1.5xl  text-center flex-grow pr-5">Post</h1>
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
        <h2 className="text-white-600 self-center font-bold ">{authorName}</h2>
      </div>

    <div>
    <img
          src={media}
          alt="Profile"
          className="w-full object-cover py-2"
        />
    </div>
    </div>
  );
};

export default Header;
