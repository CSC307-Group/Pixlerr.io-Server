const mongoose = require("mongoose");
const userModel = require("./user");
const dotenv = require("dotenv");

dotenv.config();

mongoose.set("debug", true);

mongoose
	.connect(
		"mongodb+srv://" +
			process.env.MONGO_USER +
			":" +
			process.env.MONGO_PWD +
			"@" +
			process.env.MONGO_CLUSTER +
			"/" +
			process.env.MONGO_DB +
			"?retryWrites=true&w=majority",
  // "mongodb://localhost:27017/users",
  	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.catch((error) => console.log(error));


async function getUsers(username, password, user_email) {
  let result;
  if (username === undefined && password === undefined) {
    result = await userModel.find();
  } else if (username && !password && !user_email) {
    result = await findUserByUsername(username);
  } else if (username && password && !user_email) {
      result = await findUserByUsernameandPassword(username, password);
  } else if (username && password && user_email) {
    result = await findUserByUsernameandPasswordandEmail(username, password, user_email);
  }
  return result;
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
        //const objid = mongoose.Types.ObjectId(id);
        const removedUser = await userModel.findByIdAndDelete(id);
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

async function findUserByUsernameandPasswordandEmail(username, password, user_email) {
  return await userModel.find({username: username, password: password, user_email: user_email})
}

exports.getUsers = getUsers;
exports.addUser = addUser;
exports.removeUser = removeUser;