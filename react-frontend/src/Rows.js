import React from "react";
import "./styles/row.scss";
import Pixel from "./Pixel";

export default function Row(props) {
    const { selectedColor, pixelRow, yPos, addPixel } = props;
    
    let pixels = pixelRow.map((entry, index) => {
        return (
            <Pixel
                key={index} 
                selectedColor={selectedColor} 
                pixel={entry}
                xPos = {index}
                yPos = {yPos}
                addPixel={addPixel} />
        );
    });
    
    return <div className="row">{pixels}</div>;
}
