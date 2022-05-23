const mongoose = require("mongoose");
const pixelModel = require("./pixel");
mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

async function getPixels(username) {
  let result;
  if (username === undefined && password === undefined) {
    result = await pixelModel.find();
  } else if (username && !job) {
    result = await findUserByName(username);
  } else if (password && username) {
      result = await findUserByNameandPassword(username, password);
  }
  return result;
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
