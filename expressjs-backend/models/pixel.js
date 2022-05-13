const mongoose = require("mongoose");

const PixelSchema = new mongoose.Schema(
  {
    x: {
      type: int,
      required: true,
      trim: true,
    },
    y: {
      type: int,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 2)
          throw new Error("Invalid job, must be at least 2 characters.");
      },
    },
    color: {

    }
  },
  { collection: "pixelList" }
);

const Pixel = mongoose.model("Pixel", PixelSchema);

module.exports = Pixel;