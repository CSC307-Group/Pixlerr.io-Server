import "./pixel.scss";

export default function Pixel(props) {
  const { selectedColor, pixel, updatePixel, pixelFilterFunction, blankColor } = props;

  function applyColor() {
    updatePixel(pixel["_id"], selectedColor);
  }

  return (
    <div
      className="pixel"
      onClick={applyColor}
      style={{ backgroundColor: pixelFilterFunction(pixel) ? pixel["color"] : blankColor(pixel) }}
    ></div>
  );
}
