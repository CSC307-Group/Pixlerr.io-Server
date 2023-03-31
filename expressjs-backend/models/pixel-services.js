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

async function addPixel(pixel) {
  try {
    const pixelToAdd = new pixelModel(pixel);
    const savedPixel = await pixelToAdd.save();
    return savedPixel;
  } 
  catch (error) {
    console.log(error);
    return null;
  }
}

async function addCanvas(canvas) {
  try {
    await pixelModel.insertMany(canvas, { ordered: true });
  } 
  catch (error) {
    console.log(error);
  }
}

async function getPixels() {
  return await pixelModel.find();
}

async function clearCanvas() {
  await pixelModel.deleteMany({});
  return true;
}

// async function backupCanvas(canvas) {
//   await pixelModel.deleteMany({}).then(async () => {
//     await pixelModel.insertMany(canvas).catch((error) => {
//       console.log(error)
//     });
//   })
// }

async function updatePixel(pixel) {
  try {
    await pixelModel.findOne({ _id: pixel._id }).then(async (dbPixel) => {
      dbPixel["color"] = pixel["color"];
      dbPixel["userId"] = pixel["userId"];
      await dbPixel.save();
    });
    // await pixelModel.findOne({ _id: pixel._id }).then(async (dbPixel) => {
      
    //   // await dbPixel.save();
    // });
  } catch (error) {
    console.log(error);
  }
}

exports.addCanvas = addCanvas;
exports.addPixel = addPixel;
exports.clearCanvas = clearCanvas;
exports.getPixels = getPixels;
exports.updatePixel = updatePixel;
