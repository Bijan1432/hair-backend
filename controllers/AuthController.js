const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
  login: async (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        data: {},
        success: false,
        message: "Validation Error",
        errors: errors.array(),
      });
    }
    // check if email exists
    const userData = await User.findOne({ email: req.body.email });
    // If the user doesn't exist or the passwords don't match
    if (!userData) {
      return res.status(401).json({
        success: false,
        message: "Invalid email",
      });
    }
    let pass = await bcrypt.compare(req.body.password, userData.password);
    if (!(await bcrypt.compare(req.body.password, userData.password))) {
      // console.log("pass=>>",pass);
      return res.status(401).json({
        success: false,
        message: "Password",
      });
    }
    //   create JWT token
    const token = jwt.sign(
      {
        userId: userData._id,
        userEmail: userData.email,
      },
      "RANDOM-TOKEN",
      { expiresIn: "24h" }
    );
    //   return success response
    return res.status(200).json({
      data: {
        token,
        userId: userData._id,
        email: userData.email,
        role: userData.role,
        name: userData.name,
      },
      success: true,
      message: "Login Successful",
      errors: [],
    });
    //   // if email exists
    //   .then(async (user) => {
    //   // compare the password entered and the hashed password found
    //   await bcrypt.compare(req.body.password, user.password)

    //     // if the passwords match
    //     .then((passwordCheck) => {
    //       console.log("passwordCheck=>", user)
    //       // check if password matches
    //       if (!passwordCheck) {
    //         return res
    //           .status(400)
    //           .json({
    //             data: {},
    //             success: false,
    //             message: "Passwords does not match",
    //             errors: [],
    //           });
    //       }

    //       //   create JWT token
    //       const token = jwt.sign(
    //         {
    //           userId: user._id,
    //           userEmail: user.email,
    //         },
    //         "RANDOM-TOKEN",
    //         { expiresIn: "72h" }
    //       );

    //       //   return success response
    //       return res.status(200).json({
    //         data: {
    //           token,
    //           email: user.email,
    //           role: user.role,
    //           name: user.name,
    //         },
    //         success: true,
    //         message: "Login Successful",
    //         errors: [],
    //       });
    //     })
    //     // catch error if password does not match
    //     .catch((error) => {
    //       return res
    //         .status(400)
    //         .json({
    //           data: {},
    //           success: false,
    //           message: "Passwords does not match",
    //           errors: error,
    //         });
    //     });
    // })
    // // catch error if email does not exist
    // .catch((e) => {
    //   return res
    //     .status(404)
    //     .json({
    //       data: {},
    //       success: false,
    //       message: "Email not found",
    //       errors: e,
    //     });
    // });
  },
  forgetPassword: async (req, res, next) => {},
  register: async (req, res, next) => {
    console.log(req.body);
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        data: {},
        success: false,
        message: `Validation Error ${JSON.stringify(errors)}`,
        errors: errors.array(),
      });
    }
    // bcrypt.hash(req.body.password, 10)
    //   .then((hashedPassword) => {
    // create a new user instance and collect the data
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    if (hashedPassword) {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        dob: req.body.dob,
        status: req.body.status,
        password: hashedPassword,
        role: req.body.role ? req.body.role : "app-user",
      });
      user
        .save()
        // save the new user
        // return success if the new user is added to the database successfully
        .then((result) => {
          return res.status(200).json({
            data: { result },
            success: true,
            message: "User Created Successfully",
            errors: [],
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          return res.status(200).json({
            data: {},
            success: false,
            message: "Error creating user",
            errors: error,
          });
        });
    }
    // })
    // .catch((e) => {
    //   return res
    //     .status(200)
    //     .json({
    //       data: {},
    //       success: false,
    //       message: "Password was not hashed successfully",
    //       errors: e,
    //     });
    // });
  },
  users: async (req, res, next) => {
    let q = {};
    let users;
    if (req.body.name) {
      q["name"] = req.body.name;
    }
    if (req.body.email) {
      q["email"] = req.body.email;
    }
    if (req.body.role) {
      q["role"] = req.body.role;
    }
    users = await User.find(q).exec();

    return res.status(200).json({
      data: { users },
      success: true,
      message: "All Users",
      errors: [],
    });
  },
  user: async (req, res, next) => {
    let user = await User.findById(req.params.id).exec();
    return res.status(200).json({
      data: { user },
      success: true,
      message: "Data Fetched.",
      errors: [],
    });
  },
  updateUserPost: async (req, res, next) => {
    const { name, email, role, password, dob, status, gender } = req.body;
    var errorMessage = [];
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          data: {},
          success: false,
          message: "Validation Error",
          errors: errors.array(),
        });
      }
      var filter = {};
      if (req.params.id) {
        filter = { _id: req.params.id };
      }
      let checkEmail = await User.findOne({
        _id: { $ne: req.params.id },
        email: email,
      });
      if (checkEmail) {
        return res.status(400).json({
          data: {},
          success: false,
          message: "Email Already Exist",
          errors: errors.array(),
        });
      }
      if (req.params.id) {
        if (password != null && password && password.length > 0) {
          bcrypt.hash(password, 10).then(async (hashedPassword) => {
            // create a new user instance and collect the data
            const user = await User.findOne(filter);
            (user.name = name),
              (user.email = email),
              (user.dob = dob),
              (user.gender = gender),
              (user.status = status),
              (user.role = role ? role : "Admin");
            user.password = hashedPassword;
            // save the new user
            await user
              .save()
              .then((result) => {
                return res.status(200).json({
                  data: { result },
                  success: true,
                  message: "User Updated Successfully",
                  errors: [],
                });
              })
              // catch error if the new user wasn't added successfully to the database
              .catch((error) => {
                return res.status(500).json({
                  data: {},
                  success: false,
                  message: "Error updateing user",
                  errors: error,
                });
              });
          });
        } else {
          let doc = await User.findOneAndUpdate(
            filter,
            {
              name: name,
              email: email,
              gender: gender,
              dob: dob,
              status: status,
              role: role ? role : "Admin",
            },
            {
              new: true,
              upsert: true, // Make this update into an upsert
              rawResult: true,
              setDefaultsOnInsert: true,
              runValidators: true,
            }
          );

          if (doc.lastErrorObject.updatedExisting) {
            return res.status(200).json({
              data: { user: doc.value },
              success: true,
              message: "Data updated.",
              errors: [],
            });
          } else {
            return res.status(200).json({
              data: { user: doc.value },
              success: true,
              message: "Data inserted.",
              errors: [],
            });
          }
        }
      } else {
        return res.status(400).json({
          data: {},
          success: false,
          message: "User Id Mandetory",
          errors: [],
        });
      }
    } catch (error) {
      console.log(error);
      if (error.name === "ValidationError") {
        let errors = {};
        Object.keys(error.errors).forEach((key) => {
          errorMessage.push(error.errors[key].message);
        });
        return res.status(400).json({
          data: {},
          success: false,
          message: "Validation Error",
          errors: errorMessage,
        });
      } else if (error.code == 11000) {
        return res.status(400).json({
          data: {},
          success: false,
          message: "Duplicate Entry",
          errors: [],
        });
      } else {
        return res.status(400).json({
          data: {},
          success: false,
          message: error.message,
          errors: [],
        });
      }
    }
  },
  deleteUserPost: async (req, res, next) => {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({
        data: {},
        success: false,
        message: "User Id Missing",
        errors: [],
      });
    }
    try {
      await User.deleteOne({
        _id: userId,
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
  },
  updateVerifyCode: async (req, res) => {
    const email = req.body.email;
    const code = req.body.code;

    const result = await User.findOneAndUpdate(
      {
        email: email,
      },
      {
        varifiedCode: code,
      },
      {
        new: true,
      }
    );

    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(400).send({ message: "Oops! Something went wrong." });
    }
  },
  resetPassword: async (req, res) => {
    const email = req.body.email;
    const code = req.body.code;
    const password = req.body.password;

    const result = await User.find({ email: email });
    if (result[0].varifiedCode === code) {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          return res.status(500).send({
            msg: err,
            data: null,
            error: true,
          });
        } else {
          // has hashed pw => add to database
          let update = await User.findOneAndUpdate(
            { email: email },
            {
              password: hash,
              varifiedCode: "",
            }
          );

          return res.status(200).json({ message: "Password Updated" });
          if (update) {
            return res.status(200).send({
              msg: "Password is Updated!",
              data: null,
              error: false,
            });
          }
        }
      });
    } else {
      return res.status(400).json({ message: "Link Failure!!!" });
    }
  },
};
