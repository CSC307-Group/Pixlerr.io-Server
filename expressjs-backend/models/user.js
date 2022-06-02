const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 6)
          throw new Error("Invalid password, must be at least 6 characters.");
      },
    },
    // pixelTime: {
    //   type: String,
    //   required: true,
    // },
    // user_email: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
  },
  { collection: "userList" }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;

// const mongoose = require("mongoose");
// const user = new mongoose.Schema({
//   username: String,
//   password: String,
// });

// module.exports = mongoose.model("User", user);