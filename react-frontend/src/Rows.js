import React from "react";
import "./styles/row.scss";
import Pixel from "./Pixel";

export default function Row(props) {
    const { selectedColor, pixelRow, updatePixel } = props;
    
    let pixels = pixelRow.map((entry) => {
        return (
            <Pixel
                selectedColor={selectedColor} 
                pixel={entry}
                updatePixel={updatePixel} />
        );
    });
    
    return <div className="row">{pixels}</div>;
}
