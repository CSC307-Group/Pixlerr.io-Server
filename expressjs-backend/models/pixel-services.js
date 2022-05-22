const mongoose = require("mongoose");
const pixel = require("./pixel");
const pixelModel = require("./pixel");
mongoose.set("debug", true);

mongoose
	.connect("mongodb://localhost:27017/pixels", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.catch((error) => console.log(error));
  
async function getPixels() {
	return await pixelModel.find();
}

async function updatePixel(pixel) {
	try {
		pixelModel.findOne({ _id : pixel['_id'] }).then(dbPixel => {
			dbPixel['color'] = pixel['color'];
			dbPixel.save();
		})
		return true;
	} 
	catch (error) {
		console.log(error);
		return false;
	}
}

async function clearCanvas()
{
	try {
		await pixelModel.deleteMany({});
		return true;
	} 
	catch (error) {
		console.log(error);
		return false;
	}
}

async function newCanvas(width, height)
{
	try {
		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				let pixel = {
					color: "#fff",
					x: x,
					y: y
				};
				const pixelToAdd = new pixelModel(pixel);
				pixelToAdd.save();
			}
		}
		return true;
	}
	catch (error) {
		console.log(error);
		return false;
	}
}

exports.getPixels = getPixels;
exports.updatePixel = updatePixel;
exports.clearCanvas = clearCanvas;
exports.newCanvas = newCanvas;
