import React, { useState } from "react";
import "./styles/editor.scss";
import { ChromePicker } from "react-color"; // https://casesandberg.github.io/react-color/#api
import DrawingPanel from "./DrawingPanel";
import Countdown from 'react-countdown';

export default function Editor(props) {
    const [selectedColor, setColor] = useState("#000000"); // default black

    function changeColor(color) {
        setColor(color.hex);
    }

    const Completionist = () => <span>You can place a pixel!</span>;
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            return <Completionist />;
        } else {
            return <span>Time until next pixel: {minutes}:{seconds}</span>;
        }
    };

    return (
        <div id="editor">
            <h1>Pixlerr</h1>
            <Countdown date={Date.now() + 60000} renderer={renderer} />
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
