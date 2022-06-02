import React, { useState } from "react";
import "./styles/editor.scss";
import { ChromePicker } from "react-color"; // https://casesandberg.github.io/react-color/#api
import DrawingPanel from "./DrawingPanel";
import Cursor from "./Cursor";


export default function Editor(props) {
    const [selectedColor, setColor] = useState("#420f69"); // default black
    const [mouseColor, setMouseColor] = useState("transparent");

    function changeColor(color) {
        setColor(color.hex);
    }

    return (
        <div id="editor">
            {(<Cursor mouseColor={mouseColor}/>)}
            <h1>Pixlerr</h1>
            <table>
                <tr>
                    <td>
                        {(< DrawingPanel
                        selectedColor={selectedColor}
                        pixelList={props.pixelList}
                        updatePixel={props.updatePixel}  
                        setMouseColor={setMouseColor}     
                         />)}
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
