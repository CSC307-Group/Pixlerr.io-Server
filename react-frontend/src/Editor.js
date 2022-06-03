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

    function showReset() {
        if (props.id === "629920b5b7f6f6424b76306c")
            return <button onClick={props.resetCanvas}>Reset</button>;
        return null;
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
            {showReset()}
            {/* {(props.id === '629920b5b7f6f6424b76306c') ? 
                <button onClick={props.resetCanvas}>Reset</button> : <button>do nothing</button>} */}
        </div>
    );
}
