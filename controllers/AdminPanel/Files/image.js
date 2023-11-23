const multer = require("multer");
const User = require("../../../models/User");
const { default: mongoose } = require("mongoose");
const fs = require("fs").promises;

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/svg+xml" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type, only JPEG, PNG, SVG, and WebP are allowed!"
      ),
      false
    );
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/image/"); // Directory where uploaded images will be stored locally
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-";
    cb(null, "hair/" + uniqueSuffix + file.originalname); // File name with a unique suffix
  },
});

const storageProfile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/image/"); // Directory where uploaded images will be stored locally
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-";
    cb(null, "users/" + uniqueSuffix + file.originalname); // File name with a unique suffix
  },
});

const multerFileUpload = multer({
  storage: storage,
  fileFilter: filefilter,
}).array("images");

const multerFileUploadProfile = multer({
  storage: storageProfile,
  fileFilter: filefilter,
}).single("imagesProfile");

const multerFileUploadHair = multer({
  storage: storageProfile,
  fileFilter: filefilter,
}).array("hairImages");

const upload = async (req, res) => {
  const result = await multerFileUpload(req, res, (err) => {
    if (err) {
      console.log("Error:", err);
      return res.status(400).send(err.message);
    }

    if (!req.files) {
      return res.status(400).json({ message: "Error: No File Selected" });
    }

    // const fileName = req.files.filename;
    // const filePath = req.files.path;
    // const originalFileName = req.files.originalname;

    let imageData = [];
    req.files.map((r, i) => {
      imageData.push({
        fileName: r.filename.replace(/^product\//, ""),
        filePath: r.path.replace(/\\/g, "/"),
        originalFileName: r.originalname,
      });
    });

    return res.status(200).json(imageData);
  });
};

const uploadProfile = async (req, res) => {
  const result = await multerFileUploadProfile(req, res, (err) => {
    if (err) {
      console.log("Error:", err);
      return res.status(400).send(err.message);
    }
    console.log("req.files=>", req);
    // if (!req.files) {
    //   return res.status(400).json({ message: "Error: No File Selected" });
    // }

    // const fileName = req.files.filename;
    // const filePath = req.files.path;
    // const originalFileName = req.files.originalname;

    let imageData = {
      fileName: req.file.filename.replace(/^product\//, ""),
      filePath: req.file.path.replace(/\\/g, "/"),
      originalFileName: req.file.originalname,
    };

    return res.status(200).json(imageData);
  });
};

const uploadProfileHair = async (req, res) => {
  const id = req.params.id;

  console.log("id=>>", req);

  const result = await multerFileUploadHair(req, res, async (err) => {
    if (err) {
      console.log("Error:", err);
      return res.status(400).send(err.message);
    }
    // if (!req.files) {
    //   return res.status(400).json({ message: "Error: No File Selected" });
    // }

    // const fileName = req.files.filename;
    // const filePath = req.files.path;
    // const originalFileName = req.files.originalname;

    let imageDataArray = req.files.map((file) => ({
      fileName: file.filename.replace(/^product\//, ""),
      filePath: file.path.replace(/\\/g, "/"),
      originalFileName: file.originalname,
    }));

    const findUser = await User.findById(id);

    console.log(imageDataArray);

    if (findUser) {
      const updateUser = await User.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(id) },
        {
          hairImage: imageDataArray,
        }
      );
      if (updateUser) {
        return res.status(200).json("Update Successful");
      }
    } else {
      return res.status(403).json("User Not Found");
    }
  });
};

const deleteHairImage = async (req, res) => {
  try {
    console.log("test");
    const id = req.params.id;
    const imageName = req.body.hairImageName;

    const filter = await User.findById(id);

    const update = {
      $pull: {
        hairImage: { fileName: imageName },
      },
    };
    const result = await User.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      update
    );

    if (result) {
      return res.status(200).json("Update Successful");
    } else {
      return res.status(403).json("User Not Found");
    }
  } catch (error) {
    return res.status(404).json(error);
  }
};

const getImage = async (req, res) => {
  try {
    const filePath = req.params.filePath;

    // Read the file asynchronously
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        // Handle the error appropriately, such as sending an error response
        res.status(500).send("Internal Server Error");
        return;
      }

      // Set a generic Content-Type header for any file type
      res.setHeader("Content-Type", "application/octet-stream");

      // Send the file data in the response
      res.end(data);
    });
  } catch (error) {
    console.error("Error:", error);
    // Handle other errors appropriately
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  upload,
  getImage,
  uploadProfile,
  uploadProfileHair,
  deleteHairImage,
};
