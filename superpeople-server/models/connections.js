const { Schema, model } = require("mongoose");

const ConnectionSchema = new Schema({
  userA: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },

  userB: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },

});

const connectionModel = model("connections", ConnectionSchema);
module.exports = connectionModel;
