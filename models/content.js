const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const contentSchema = new Schema(
  {
    type: {
      type: String,
      default: null,
    },
    content: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("content", contentSchema);
