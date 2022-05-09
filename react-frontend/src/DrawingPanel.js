import React, { useRef } from "react";
import "./styles/drawingPanel.scss";
import Row from "./Rows";

export default function DrawingPanel(props) {
    const { width, height, selectedColor, pixelList, addPixel} = props;

    const panelRef = useRef();

    // let rows = pixelList.map((entry, index) => {
    //     return (
    //         <Row
    //             key={index} 
    //             width={width}
    //             selectedColor={selectedColor} 
    //             pixelRow={entry}
    //             yPos = {index}
    //             addPixel={addPixel} />
    //     );
    // });
    
    let rows = [];
    for (let i = 0; i < height; i++) {
        const y = pixelList.filter(data => data['y'] === i);
        rows.push(<Row 
            key={i} 
            width={width} 
            selectedColor={selectedColor} 
            pixelRow={y} 
            yPos = {i}
            addPixel={addPixel} />);
    }

    return (
        <div id="drawingPanel">
            <div id="pixels" ref={panelRef}>
                {rows}
            </div>
        </div>
    );
}
