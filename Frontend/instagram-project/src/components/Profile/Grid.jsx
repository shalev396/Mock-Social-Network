import React from "react";

const Grid = ({ images }) => {
  console.log(images);
  return (
    <div className="pt-4 grid grid-cols-3 ">
      {images.map((image) => (
        <div key={image._id} className="relative">
          <img
            src={image.media}
            alt={"Image"}
            className="w-full h-auto object-cover border border-1 border-black "
          />
        </div>
      ))}
    </div>
  );
};

export default Grid;
