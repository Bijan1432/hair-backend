const { response } = require("express");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const AuthController = require("../controllers/AuthController");
const { forgetPassword } = require("../controllers/forgetPassword");
const {
  postContent,
  getContent,
  postEditContent,
} = require("../controllers/content");
const {
  postHair,
  getHair,
  getAllHair,
  postEditHair,
  deleteHairPost,
} = require("../controllers/Hair");
const auth = require("../middlewares/auth");
const { upload, getImage } = require("../controllers/AdminPanel/Files/image");
const { authCheck } = require("../controllers/AdminPanel/authCheck");

router.get("/", function (req, res, next) {
  return res.json({
    Success: true,
    message: "URL Working Go Ahed",
  });
});
router.post(
  "/register",
  body("name").not().isEmpty().trim(),
  body("email")
    .not()
    .isEmpty()
    .trim()
    .isEmail()
    .custom(async (value) => {
      return await User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject("E-mail already in use");
        }
      });
    }),
  body("password").isLength({ min: 5 }),
  AuthController.register
);

router.post(
  "/update-user/:id",
  body("name").not().isEmpty().trim(),
  AuthController.updateUserPost
);

router.post("/check/auth", authCheck);

router.get("/users", AuthController.users);
router.get("/user/:id?", AuthController.user);

router.post("/delete-user/:id?", AuthController.deleteUserPost);
router.post("/veified-code/", AuthController.updateVerifyCode);
router.post("/reset-password/", AuthController.resetPassword);
router.post("/forgetPassword/", forgetPassword);
router.post(
  "/login",
  body("email").not().isEmpty().trim().isEmail(),
  body("password").isLength({ min: 5 }),
  AuthController.login
);

router.get("/authtest", auth, function (req, res, next) {
  return res.json({
    Success: true,
    message: "Auth Test Successfully",
  });
});

// terms and privecy
router.post("/add-content", postContent);
router.post("/get-content", getContent);
router.post("/edit-content", postEditContent);

// Hair
router.post("/add-hair", postHair);
router.get("/get-all-hair", getAllHair);
router.post("/get-hair/:id?", getHair);
router.post("/edit-hair/:id?", postEditHair);
router.post("/delete-hair/:id?", deleteHairPost);

//file uploads
router.post("/uploads/image", upload);
router.post("/get/image", getImage);

module.exports = router;
