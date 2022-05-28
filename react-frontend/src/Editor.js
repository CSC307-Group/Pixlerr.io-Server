import React, { useState } from "react";
import "./styles/editor.scss";
import { ChromePicker } from "react-color"; // https://casesandberg.github.io/react-color/#api
import DrawingPanel from "./DrawingPanel";

export default function Editor(props) {
    const [selectedColor, setColor] = useState("#000000"); // default black

    function changeColor(color) {
        setColor(color.hex);
    }

    return (
        <div id="editor">
            <h1>Pixlerr</h1>
            <table>
                <tr>
                    <td>
                        {(< DrawingPanel
                        selectedColor={selectedColor}
                        pixelList={props.pixelList}
                        updatePixel={props.updatePixel} />)}
                    </td>
                    <td>{(< ChromePicker 
                        disableAlpha={true}
                        color={selectedColor}
                        onChangeComplete={changeColor} />)}
                    </td>
                </tr>
            </table>  
            <button onClick={props.resetCanvas}>Reset</button>
        </div>
    );
}
