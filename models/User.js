const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: "active",
    },
    dob: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: "app_user",
    },
    varifiedCode: {
      type: String,
      default: null,
    },
    image:{
      type:Array,
      default: null,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
