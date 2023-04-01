const mongoose = require("mongoose");
const userModel = require("./user");
const dotenv = require("dotenv");

dotenv.config();
mongoose.set("debug", true);
mongoose.connect(`${process.env.MONGODB_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch((error) => console.log(error));

async function addUser(user) {
  try {
    const userToAdd = new userModel(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } 
  catch (error) {
    console.log(error);
    return false;
  }
}

function findUser(username) {
  return new Promise((resolve, reject) => { 
    userModel.findOne({ username: username }, async (error, user) => {
      if (error) {
        console.log(error);
        reject();
      }
      resolve(user);
    });
  });
}

function updatePixelTime(username, id) {
  return new Promise((resolve, reject) => { 
    userModel.findOne({ username: username }, async (error, user) => {
      if (error) {
        console.log(error);
        reject();
      }
      if (user && user._id === id) {
        const newTime = new Date().toISOString()
        user["pixelTime"] = newTime;
        user.save();
        resolve(newTime); 
      }
      reject();
    });
  });
}

exports.addUser = addUser;
exports.findUser = findUser;
exports.updatePixelTime = updatePixelTime;