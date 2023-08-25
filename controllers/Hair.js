const Hairs = require("../models/Hair");

//Hair post
const postHair = async (req, res) => {
  const data = req.body;

  try {
    const result = await Hairs.create({
      name: data.name,
      images: data.images,
      status: data.status,
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

//Hair get
const getHair = async (req, res) => {
  let condition = {};
  const id = req.params.id;

  if (id) {
    condition._id = id;
  }
  try {
    const result = await Hairs.find(condition);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};

//get all hairs
const getAllHair = async (req, res) => {
  let hair = await Hairs.find().exec();
  return res.status(200).json({
    data: { hair },
    success: true,
    message: "Data Fetched.",
    errors: [],
  });
};

//hair edit
const postEditHair = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const result = await Hairs.findOneAndUpdate(
    {
      _id: id,
    },
    {
      name: data.name,
      images: data.images,
      status: data.status,
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

//hair delete
const deleteHairPost = async (req, res, next) => {
  const hairId = req.params.id;
  if (!hairId) {
    return res.status(400).json({
      data: {},
      success: false,
      message: "Hair Id Missing",
      errors: [],
    });
  }
  try {
    await Hairs.deleteOne({
      _id: hairId,
    })
      .then(() => {
        // console.log(1)
        // return res.status(200).json({data:{user : doc},success:true,message:'Deleted Successfully', errors: []});
      })
      .catch((err) => {
        console.log(2);
        return res
          .status(400)
          .json({ data: { err }, success: false, message: "", errors: [] });
      });
    return res.status(200).json({
      data: {},
      success: true,
      message: "Deleted Successfully",
      errors: [],
    });
  } catch (err) {
    return res
      .status(400)
      .json({ data: {}, success: false, message: err.message, errors: [] });
  }
};

module.exports = {
  getAllHair,
  deleteHairPost,
  postHair,
  getHair,
  postEditHair,
};
