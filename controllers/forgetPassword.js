const formData = require("form-data");
const Mailgun = require("mailgun.js");
const fs = require("fs");
const path = require("path");

const forgetPassword = async (req, res) => {
  const mailgun = new Mailgun(formData);

  const mg = mailgun.client({
    username: "api",
    key:
      process.env.MAILGUN_API_KEY || "pubkey-c6d83e8bc2ff1744effbaff02b2d42cb",
  });

  // Read the HTML file or generate it dynamically
  //   const htmlContent = fs.readFileSync("mailPages/payment.html", "utf8");

  const email = req.body.email;
  const code = req.body.code;

  // href="http://arizton-base.markobrando.com/login"

  const sendResult = await mg.messages.create(
    "sandbox03741c79c37c45dc91c971e81510fde8.mailgun.org",
    {
      from: "Bijan Mondal <mailgun@sandbox03741c79c37c45dc91c971e81510fde8.mailgun.org>",
      to: [email],
      subject: "Account Credential",
      text: "",
      html: `<!DOCTYPE html>
      <html lang="en-US">
        <head>
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <title>Reset Password Email Template</title>
          <meta name="description" content="Reset Password Email Template." />
          <style type="text/css">
            a:hover {
              text-decoration: underline !important;
            }
          </style>
        </head>
      
        <body
          marginheight="0"
          topmargin="0"
          marginwidth="0"
          style="margin: 0px; background-color: #f2f3f8"
          leftmargin="0"
        >
          <!--100% body table-->
          <table
            cellspacing="0"
            border="0"
            cellpadding="0"
            width="100%"
            bgcolor="#f2f3f8"
            style="
              @import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700);
              font-family: 'Open Sans', sans-serif;
            "
          >
            <tr>
              <td>
                <table
                  style="
                    max-width: 670px;
                    background: #fff;
                    border-radius: 3px;
                    text-align: left;
                    -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                    -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                    box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    background-image: url(./ariztonFrontend/public/sample-bg.jpg);
                    background-size: cover;
                    background-repeat: no-repeat;
                    margin-top: 20px;
                    margin-bottom: 30px;
                    padding: 30px 40px;
                  "
                  width="100%"
                  width="100%"
                  border="0"
                  align="center"
                  cellpadding="0"
                  cellspacing="0"
                >
                  <tr>
                    <td style="height: 30px">&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="text-align: left">
                      <a href="" title="logo" target="_blank">
                        <img
                          width="150"
                          src=${""}
                          title="logo"
                          alt="logo"
                        />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="height: 20px">&nbsp;</td>
                  </tr>
                  <tr>
                    <td>
                      <table
                        width="100%"
                        border="0"
                        align="left"
                        cellpadding="0"
                        cellspacing="0"
                      >
                        <tr>
                          <td style="height: 10px">&nbsp;</td>
                        </tr>
                        <tr>
                          <td style="padding: 0px 35px 0px 0px">
                            <h1
                              style="
                                color: #1e1e2d;
                                font-weight: 500;
                                margin: 0;
                                font-size: 25px;
                                font-family: 'Rubik', sans-serif;
                              "
                            >
                              You have requested to reset your password
                            </h1>
                            <span
                              style="
                                display: inline-block;
                                vertical-align: middle;
                                margin: 29px 0 26px;
                                border-bottom: 1px solid #cecece;
                                width: 100px;
                              "
                            ></span>
                            <p
                              style="
                                color: #455056;
                                font-size: 15px;
                                line-height: 24px;
                                margin: 0;
                              "
                            >
                              Hi ${email}, we received a request to reset the password
                              for your account. To proceed with the password reset,
                              click below:
                            </p>
                            <br />
                            <a
                              href="http://hairapp.com/forget-password-form?email=${email}&code=${code}"
                              style="
                                background: #1b3c67;
                                text-decoration: none !important;
                                display: inline-block;
                                font-weight: 500;
                                margin-top: 24px;
                                color: #fff;
                                text-transform: uppercase;
                                font-size: 14px;
                                padding: 10px 24px;
                                display: inline-block;
                                border-radius: 0px;
                              "
                              >Reset Password</a
                            >
                            <br />
                            <p
                              style="
                                color: #455056;
                                font-size: 15px;
                                line-height: 24px;
                                margin: 0;
                              "
                            >
                              If you didn't request this password reset, you can
                              safely ignore this email.
                            </p>
                            <br />
                            <p
                              style="
                                color: #455056;
                                font-size: 15px;
                                line-height: 24px;
                                margin: 0;
                              "
                            >
                              If you have any questions or need further assistance,
                              please don't hesitate to contact our support team.
                            </p>
                            <!-- <a href="javascript:void(0);"
                                                  style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                                  Password</a> -->
                          </td>
                        </tr>
                        <tr>
                          <td style="height: 40px">&nbsp;</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
      
                  <tr>
                    <td style="height: 20px">&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="text-align: center">
                      <p
                        style="
                          font-size: 14px;
                          color: rgba(69, 80, 86, 0.7411764705882353);
                          line-height: 18px;
                          margin: 0 0 0;
                        "
                      >
                        &copy; <strong>www.hairapp.com</strong>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="height: 80px">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <!--/100% body table-->
        </body>
      </html>
      `,
    },
    {
      userName: "api",
      key:
        process.env.MAILGUN_API_KEY ||
        "pubkey-c6d83e8bc2ff1744effbaff02b2d42cb",
    }
  );

  if (sendResult) {
    res.status(200).json(sendResult);
  } else {
    res.status(400).json(sendResult);
  }
};

module.exports = {
  forgetPassword,
};
