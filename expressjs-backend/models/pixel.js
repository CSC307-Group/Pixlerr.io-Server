const mongoose = require("mongoose");

const PixelSchema = new mongoose.Schema(
  {
    x: {
      type: Number,
      required: true,
      trim: true,
    },
    y: {
      type: Number,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { collection: "pixelList" }
);

const Pixel = mongoose.model("Pixel", PixelSchema);

module.exports = Pixel;