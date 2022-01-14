const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: String,
  lastName: String,
  favColor : {
      type: String,
      enum : ["Red","Green","Blue"]
  }
});

const userModel = model("users", UserSchema);
module.exports = userModel;
