const mongoose = require("mongoose");
const pixelModel = require("./pixel");
mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/pixels", {
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

async function findUserById(id) {
  try {
    return await userModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addUser(user) {
  try {
    const userToAdd = new userModel(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function removeUser(id) {
    try {
        //need to typecast the id as an ObjectId
        const objid = mongoose.Types.ObjectId(id);
        const removedUser = await userModel.findByIdAndDelete(objid);
        return removedUser;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function findPixelsPlacedBy(username) { 
    return await pixelModel.find({username : username}) 
}


exports.getPixels = getPixels;
exports.findUserById = findUserById;
exports.addUser = addUser;
exports.removeUser = removeUser;