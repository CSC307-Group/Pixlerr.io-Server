const mongoose = require("mongoose");
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

exports.getPixels = getPixels;
exports.updatePixel = updatePixel;
