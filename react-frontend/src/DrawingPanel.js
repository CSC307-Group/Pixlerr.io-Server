import React, { useRef } from "react";
import "./styles/drawingPanel.scss";
import Row from "./Rows";

export default function DrawingPanel(props) {
    const { selectedColor, pixelList, updatePixel, setMouseColor, postedByUser, returnWhitePixel} = props;
    const panelRef = useRef();

    function mouseIsOverCanvas() {
        setMouseColor(selectedColor);
    }
    
    function mouseIsNotOverCanvas() {
        setMouseColor("transparent");
    }
    
    let rows = [];
    for (let i = 0; i < pixelList.length; i++) {
        const y = pixelList.filter(data => data['y'] === i);
        rows.push(<Row 
            selectedColor={selectedColor} 
            pixelRow={y} 
            updatePixel={updatePixel}
            postedByUser={postedByUser}
            returnWhitePixel={returnWhitePixel}
            />);
    }

    return (
        <div id="drawingPanel"
            onMouseEnter={mouseIsOverCanvas}
            onMouseLeave={mouseIsNotOverCanvas}>
            <div id="pixels" ref={panelRef}>
                {rows}
            </div>
        </div>
    );
}
