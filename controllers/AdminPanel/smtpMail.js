const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "harshsharma270801@gmail.com",
    pass: "cyevbuaololtgmmn",
  },
});

module.exports = {
  transporter,
};
