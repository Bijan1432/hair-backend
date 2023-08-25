const { response } = require("express");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const AuthController = require("../controllers/AuthController");
const content = require("../controllers/content");
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

router.get("/users", auth, AuthController.users);
router.get("/user/:id?", auth, AuthController.user);

router.post("/delete-user/:id?", AuthController.deleteUserPost);
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

//post terms and privecy
router.post("/add-content", content.postContent);
module.exports = router;
