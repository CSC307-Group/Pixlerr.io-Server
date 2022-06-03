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
    pixelTime: {
      type: String,
      required: true,
    },
    user_email: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { collection: "userList" }
);

module.exports = mongoose.model("User", UserSchema);