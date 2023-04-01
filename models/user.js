const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true
    },
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
      default: new Date(0).toISOString()
    },
    userType: {
      type: String,
      enum : ['user','admin'],
      default: 'user'
    },
  },
  { collection: "userList" }
);

module.exports = mongoose.model("User", UserSchema);
