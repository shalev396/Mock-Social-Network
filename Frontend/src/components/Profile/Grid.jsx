import React from "react";
import { useNavigate } from "react-router-dom";

const Grid = ({ images }) => {
  const navigate = useNavigate();
  //grid-rows-[33%_33%_33%]
  return (
    <div className="pt-4 grid grid-cols-3 overflow-hidden ">
      {images.map((image) => (
        <div
          key={image._id}
          style={{
            maxHeight: "150px",
          }}
          onClick={() => navigate(`/p/${image._id}`)}
        >
          <img
            src={image.media}
            alt={"Image"}
            className="w-full h-full  object-cover border border-1 border-black "
          />
        </div>
      ))}
    </div>
  );
};

export default Grid;
