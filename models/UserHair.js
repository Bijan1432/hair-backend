const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserHair = new Schema(
  {
    userId: {
      type: mongoose.ObjectId,
      default: null,
    },
    imageData: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserHair", UserHair);
