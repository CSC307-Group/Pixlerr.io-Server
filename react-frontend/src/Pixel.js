import React, { useState } from "react";
import "./styles/pixel.scss";

export default function Pixel(props) {
    const { selectedColor, pixel, xPos, yPos, addPixel } = props;

    const [pixelColor, setPixelColor] = useState(pixel['color']);
    const [oldColor, setOldColor] = useState(pixelColor);
    const [canChangeColor, setCanChangeColor] = useState(true);

    function applyColor() {
        setPixelColor(selectedColor);
        setCanChangeColor(false);

        if (pixel != null) {
            pixel['color'] = selectedColor;
            addPixel(pixel);
        }
        else {
            let newPixel = {
                color : selectedColor,
                x : xPos,
                y : yPos
            }
            addPixel(newPixel);
        }
    }

    function changeColorOnHover() {
        setOldColor(pixelColor);
        setPixelColor(selectedColor);
    }

    function resetColor() {
        if (canChangeColor) {
            setPixelColor(oldColor);
        }

        setCanChangeColor(true);
    }

    return (
        <div
            className="pixel"
            onClick={applyColor}
            onMouseEnter={changeColorOnHover}
            onMouseLeave={resetColor}
            style={{ backgroundColor: pixelColor }}
        ></div>
    );
}