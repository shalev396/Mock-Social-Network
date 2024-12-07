import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AddPage from "../AddPage/AddPage";
import BottomNav from "../Nav/BottomNav";

const AppLayout = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    console.log("Dialog Open Function Called");
    setDialogOpen(true);
  };

  const handleDialogClose = () => setDialogOpen(false);

  return (
    <div>
      <Outlet />
      <AddPage open={isDialogOpen} onClose={handleDialogClose} />

      <BottomNav index={0} onAddClick={handleDialogOpen} />
    </div>
  );
};

export default AppLayout;
