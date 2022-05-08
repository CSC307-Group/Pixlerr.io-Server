import React from "react";
import "./styles/row.scss";
import Pixel from "./Pixel";

export default function Row(props) {
    const { width, selectedColor, pixelRow, yPos, addPixel } = props;
    let pixels = [];

    for (let i = 0; i < width; i++) {
        const x = pixelRow.filter(data => data['x'] === i);
        pixels.push(<Pixel 
            key={i} 
            selectedColor={selectedColor} 
            pixel={x[0]}
            xPos = {i}
            yPos = {yPos}
            addPixel={addPixel} />);
    }

    return <div className="row">{pixels}</div>;
}
