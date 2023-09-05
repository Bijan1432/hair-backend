const Hairs = require("../../models/Hair");
const User = require("../../models/User");

const searchUsers = async (req, res) => {
  try {
    const { name } = req.body;

    const nameRegex = new RegExp(name, "i");

    const users = await User.find({ name: nameRegex });
    if (users) {
      res.status(200).json({
        data: { users },
        success: true,
        message: "All Users",
        errors: [],
      });
    }
  } catch (err) {
    res.status(400).json({ error: "Internal Server Error" });
  }
};

const searchHair = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);
    const nameRegex = new RegExp(name, "i");
    console.log(nameRegex);

    const hair = await Hairs.find({ name: nameRegex });
    if (hair) {
      res.status(200).json({
        data: { hair },
        success: true,
        message: "All Hair",
        errors: [],
      });
    }
  } catch (err) {
    res.status(400).json({ error: "Internal Server Error" });
  }
};
module.exports = { searchUsers, searchHair };
