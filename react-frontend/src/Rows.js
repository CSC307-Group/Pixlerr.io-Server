import React from "react";
import "./styles/row.scss";
import Pixel from "./Pixel";

export default function Row(props) {
    const { width, selectedColor, pixelRow, yPos, addPixel } = props;
    
    // let pixels = pixelRow.map((entry, index) => {
    //     return (
    //         <Pixel
    //             key={index} 
    //             selectedColor={selectedColor} 
    //             pixel={entry}
    //             xPos = {index}
    //             yPos = {yPos}
    //             addPixel={addPixel} />
    //     );
    // });

    let pixels = [];
    for (let i = 0; i < width; i++) {
        let x = pixelRow.filter(data => data['x'] === i);
        if (x.length === 0)
            x.push({
                x: i,
                y: yPos,
                color: "#fff"
            })
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
