const mongoose = require("mongoose");
const pixelModel = require("./pixel");
const dotenv = require("dotenv");

dotenv.config();
mongoose.set("debug", true);
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).catch((error) => console.log(error));

async function getPixels() {
  return await pixelModel.find();
}

// async function getPixelsById(id) {
//   return await pixelModel.find({ userId: id });
// }

// async function updatePixel(pixelId, newColor, userId) {
//   try {
//     await pixelModel.findOne({ _id: pixelId }).then(async (pixel) => {
//       pixel["color"] = newColor;
//       await pixel.save();
//     });
//     await pixelModel.findOne({ _id: pixelId }).then(async (pixel) => {
//       pixel["userId"] = userId;
//       await pixel.save();
//     });
//     return true;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// }

async function clearCanvas() {
  await pixelModel.deleteMany({});
  return true;
}

// async function newCanvas(width, height) {
//   const adminID = "629920b5b7f6f6424b76306c";
//   if (width === 0 || height === 0) {
//     return false;
//   }
//   for (let x = 0; x < width; x++) {
//     for (let y = 0; y < height; y++) {
//       let pixel = {
//         color: "#fff",
//         x: x,
//         y: y,
//         userId: adminID,
//       };
//       const pixelToAdd = new pixelModel(pixel);
//       await pixelToAdd.save();
//     }
//   }
//   return true;
// }

async function updateCanvas(canvas) {
  await pixelModel.insertMany(canvas).catch(() => {
      console.log(error)
  });
}

// async function canvasIsEmpty() {
//   const canvasSize = await pixelModel.countDocuments({});
//   return canvasSize === 0;
// }

exports.getPixels = getPixels;
// exports.getPixelsById = getPixelsById;
// exports.updatePixel = updatePixel;
exports.clearCanvas = clearCanvas;
// exports.newCanvas = newCanvas;

exports.updateCanvas = updateCanvas;
// exports.canvasIsEmpty = canvasIsEmpty;
