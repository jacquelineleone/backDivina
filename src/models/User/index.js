const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema({
  name: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  identity: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("users", UserScheme);
