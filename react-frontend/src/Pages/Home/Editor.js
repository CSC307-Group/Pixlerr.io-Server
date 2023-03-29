import React, { useState } from "react";
import { ChromePicker } from "react-color"; // https://casesandberg.github.io/react-color/#api
import Cursor from "./Cursor";
import DrawingPanel from "./DrawingPanel";
import "./editor.scss";

export default function Editor(props) {
  const [selectedColor, setColor] = useState("#420f69"); // default black
  const [mouseColor, setMouseColor] = useState("transparent");

  function changeColor(color) {
    setColor(color.hex);
  }

  function showReset() {
    if (props.id === "6424a9d19f7da9dd6a5d0146")
      return <button onClick={props.resetCanvas}>Reset</button>;
    return null;
  }

  return (
    <div id="editor">
      {<Cursor mouseColor={mouseColor} />}
      <h1>Pixlerr</h1>
      <table>
        <tbody>
          <tr>
            <td>
              {
                <DrawingPanel
                  selectedColor={selectedColor}
                  pixelList={props.pixelList}
                  updatePixel={props.updatePixel}
                  setMouseColor={setMouseColor}
                />
              }
            </td>
            <td>
              {
                <ChromePicker
                  disableAlpha={true}
                  color={selectedColor}
                  onChangeComplete={changeColor}
                />
              }
            </td>
          </tr>
        </tbody>
      </table>
      {showReset()}
    </div>
  );
}
