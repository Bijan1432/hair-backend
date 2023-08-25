const Content = require("../models/content");

//content post
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

//content get
const getContent = async (req, res) => {
  let condition = {};
  const content_type = req.body.type;

  if (content_type) {
    condition.type = content_type;
  }
  try {
    const result = await Content.find(condition);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};

//content edit
const postEditContent = async (req, res) => {
  const type = req.body.type;
  const content = req.body.content;

  const result = await Content.findOneAndUpdate(
    {
      type: type,
    },
    {
      content: content,
    },
    {
      new: true,
    }
  );

  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json("Something!!! Went Wrong");
  }
};

module.exports = {
  postContent,
  getContent,
  postEditContent,
};
