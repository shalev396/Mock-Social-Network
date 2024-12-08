import React from "react";
import BottomNav from "../Nav/BottomNav";
import Grid from "../Profile/Grid";
import Search from "./Search";

const Explore = () => {
  return (
    <div>
      {/* <Grid /> */}
      <BottomNav index={1} />
    <div>
    <Search className={'w-'}/>
    </div>
    </div>
  );
};

export default Explore;
