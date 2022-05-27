import React, { useState } from "react";
import "./styles/pixel.scss";

export default function Pixel(props) {
    const { selectedColor, pixel, updatePixel } = props;

    const [pixelColor, setPixelColor] = useState(pixel['color']);
    const [oldColor, setOldColor] = useState(pixelColor);
    const [canChangeColor, setCanChangeColor] = useState(true);

    function applyColor() {
        setPixelColor(selectedColor);
        setCanChangeColor(false);

        pixel['color'] = selectedColor;
        updatePixel(pixel);
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
            style={{ backgroundColor: pixel['color'] }}
        ></div>
    );
}