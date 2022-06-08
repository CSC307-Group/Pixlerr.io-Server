import React from "react";
import "./styles/row.scss";
import Pixel from "./Pixel";

export default function Row(props) {
    const { selectedColor, pixelRow, updatePixel, postedByUser, returnWhitePixel } = props;
    
    let pixels = pixelRow.map((entry) => {
        if (postedByUser(entry)) {
            return (
                <Pixel
                    selectedColor={selectedColor} 
                    pixel={entry}
                    updatePixel={updatePixel} />
            );
        }
        else {
            return (
                <Pixel
                    selectedColor={selectedColor} 
                    pixel={returnWhitePixel(entry)}
                    updatePixel={updatePixel} />
            );
        } 
    });
    
    return <div className="row">{pixels}</div>;
}
