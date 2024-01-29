const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const hairSchema = new Schema(
  {
    name: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    bangs: {
      type: String,
      default: null,
    },
    mode: {
      type: String,
      default: null,
    },
    images: [
      {
        url: {
          type: String,
          default: null,
        },
        filename: {
          type: String,
          default: null,
        },
        colour: {
          type: String,
          default: null,
        },
      },
    ],
    status: {
      type: String,
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hairs", hairSchema);
