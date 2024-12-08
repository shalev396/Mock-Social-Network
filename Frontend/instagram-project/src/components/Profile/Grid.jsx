import React from "react";

const Grid = ({ images }) => {
  console.log(images);
  return (
    <div className="pt-4 grid grid-cols-3 overflow-hidden grid-rows-[33%_33%_33%]">
      {images.map((image) => (
        <div
          key={image._id}
          style={{
            maxHeight: "150px",
          }}
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
