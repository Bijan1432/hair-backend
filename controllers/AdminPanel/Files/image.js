const multer = require("multer");
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
}).single("hairImages");

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
  const result = await multerFileUploadHair(req, res, (err) => {
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

const getImage = async (req, res) => {
  const filePath = req.body.filePath;

  fs.readFile(filePath)
    .then((data) => {
      // Send the file data in the response
      res.setHeader("Content-Type", "image/png"); // Set the appropriate content type for your file
      res.send(data);
    })
    .catch((err) => {
      console.error("Error reading file:", err);
      // Handle the error appropriately, such as sending an error response
    });
};
module.exports = {
  upload,
  getImage,
  uploadProfile,
};
