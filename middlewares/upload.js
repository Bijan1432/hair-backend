const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");

// const s3 = new S3Client({
//     region:'ap-south-1',
//     credentials:{
// 	    accessKeyId: "",
//         secretAccessKey: "",
//         //old credentials
// 	    //accessKeyId: "",
//         //secretAccessKey: "",
//     }   // secretAccessKey is also store in .env file
// })

const filefilter = (req, file, cb) => {
  //console.log(5, file.mimetype)
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/svg+xml" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
  }
};

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "###########",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, "amenities/" + Date.now() + file.originalname);
    },
    fileFilter: filefilter,
  }),
});

exports.upload = upload;
