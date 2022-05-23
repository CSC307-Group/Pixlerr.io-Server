const mongoose = require("mongoose");

const PixelSchema = new mongoose.Schema(
	{
		x: {
			type: Number,
			required: true,
		},
		y: {
			type: Number,
			required: true,
		},
		color: {
			type: String,
			required: true,
		}
	},
	{ collection: "pixelList" }
);

module.exports = mongoose.model("Pixel", PixelSchema);