import { NavLink } from "react-router-dom";
import { HomeIcon, SearchIcon, VideoCameraIcon, BellIcon, UserCircleIcon } from "@heroicons/react/outline";

function MainNavigation() {
  return (
    <nav className="fixed bottom-0 w-full bg-black text-white border-t border-gray-700 flex justify-around items-center py-2 z-50">
      {/* Home Icon */}
      <NavLink
        to="/"
        className="flex flex-col items-center text-gray-400 hover:text-white"
        activeClassName="text-white"
      >
        <HomeIcon className="h-6 w-6" />
        <span className="text-xs">Home</span>
      </NavLink>

      {/* Search Icon */}
      <NavLink
        to="/search"
        className="flex flex-col items-center text-gray-400 hover:text-white"
        activeClassName="text-white"
      >
        <SearchIcon className="h-6 w-6" />
        <span className="text-xs">Search</span>
      </NavLink>

      {/* Reels Icon */}
      <NavLink
        to="/reels"
        className="flex flex-col items-center text-gray-400 hover:text-white"
        activeClassName="text-white"
      >
        <VideoCameraIcon className="h-6 w-6" />
        <span className="text-xs">Reels</span>
      </NavLink>

      {/* Notifications Icon */}
      <NavLink
        to="/notifications"
        className="flex flex-col items-center text-gray-400 hover:text-white relative"
        activeClassName="text-white"
      >
        <BellIcon className="h-6 w-6" />
        <span className="text-xs">Notifications</span>
        <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-xs text-white flex items-center justify-center rounded-full">4</span>
      </NavLink>

      {/* Profile Icon */}
      <NavLink
        to="/profile"
        className="flex flex-col items-center text-gray-400 hover:text-white"
        activeClassName="text-white"
      >
        <UserCircleIcon className="h-6 w-6" />
        <span className="text-xs">Profile</span>
      </NavLink>
    </nav>
  );
}

export default MainNavigation;
