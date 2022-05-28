import "./styles/pixel.scss";

export default function Pixel(props) {
    const { selectedColor, pixel, updatePixel } = props;

    function applyColor() {
        updatePixel(pixel['_id'], selectedColor);
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