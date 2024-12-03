import React from "react";
import BottomNav from "../Nav/BottomNav";

import img from "../../assets/images/IMG_5310.jpg";
const Profile = () => {
  return (
    <div>
      <div>
        <h1>sasha.griss</h1>
        <div>
          <div className="flex items-center justify-center gap-4">
            <img
              className="w-20 h-20 rounded-full "
              src={img}
              alt="profile pic"
            />
            <div>
              <span></span> Posts
            </div>
            <div>
              <span></span> Followers
            </div>
            <div>
              <span></span> Following
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2>Name</h2>
        <p>Bio</p>
      </div>
      <div className="flex items-center justify-center gap-4">
        <button>Edit profile</button>
      </div>
      <div className="grid"></div>
      <BottomNav index={4} />
    </div>
  );
};

export default Profile;
