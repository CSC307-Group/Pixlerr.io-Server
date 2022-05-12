import React, { useRef } from "react";
import "./styles/drawingPanel.scss";
import Row from "./Rows";

export default function DrawingPanel(props) {
    const { selectedColor, pixelList, addPixel} = props;

    const panelRef = useRef();
    
    let rows = [];
    for (let i = 0; i < pixelList.length; i++) {
        const y = pixelList.filter(data => data['y'] === i);
        rows.push(<Row 
            key={i} 
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
