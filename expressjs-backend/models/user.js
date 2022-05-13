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
    
  },
  { collection: "users_list" }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;