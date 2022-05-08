import React, { useState } from "react";
import "./styles/editor.scss";
import { ChromePicker } from "react-color"; // https://casesandberg.github.io/react-color/#api
import DrawingPanel from "./DrawingPanel";

export default function Editor() {
    const [selectedColor, setColor] = useState("#000000"); // default black

    function changeColor(color) {
        setColor(color.hex);
    }

    return (
        <div id="editor">
            <h1>Pixlerr</h1>
            {< ChromePicker 
                disableAlpha={true}
                color={selectedColor}
                onChangeComplete={changeColor} />}
            {(< DrawingPanel
                width={40}
                height={20}
                selectedColor={selectedColor} />)}
        </div>
    );
}
