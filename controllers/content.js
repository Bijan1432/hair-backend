const Content = require("../models/content");

//cat
const postContent = async (req, res) => {
  const data = req.body;

  try {
    const result = await Content.create({
      type: data.type,
      content: data.content,
    });

    if (result) {
      return res.status(200).json(result);
    }
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json("Duclicate Name Error!!!! :: Name Already Exists");
    } else {
      return res.status(400).json(error);
    }
  }
};

module.exports = {
  postContent,
};
