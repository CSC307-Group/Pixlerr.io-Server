import React from "react";
import Pixel from "./Pixel";
import "./row.scss";

export default function Row(props) {
  const { selectedColor, pixelRow, updatePixel } = props;

  let pixels = pixelRow.map((entry, index) => {
    return (
      <Pixel
        selectedColor={selectedColor}
        pixel={entry}
        updatePixel={updatePixel}
        key={index}
      />
    );
  });

  return <div className="row">{pixels}</div>;
}
