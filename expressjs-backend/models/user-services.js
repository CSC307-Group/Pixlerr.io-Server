const mongoose = require("mongoose");
const userModel = require("./user");
mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

async function getUsers(username, password) {
  let result;
  if (username === undefined && password === undefined) {
    result = await userModel.find();
  } else if (username && !job) {
    result = await findUserByUsername(username);
  } else if (password && username) {
      result = await findUserByUsernameandPassword(username, password);
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

async function findUserByUsername(username) {
  return await userModel.find({ username: username });
}

async function findUserByUsernameandPassword(username, password) {
    return await userModel.find({ username: username, password: password})
}

exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.addUser = addUser;
exports.removeUser = removeUser;