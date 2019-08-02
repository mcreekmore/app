const express = require("express");
const router = express.Router();
const path = require("path");
const nodeMailer = require("nodemailer");

// Email Key
const key = require("../../config/keys").emailKey;

// @route   POST api/email
// @desc    Send email
// @access  Public
router.post("/", function(req, res) {
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // should be replaced with real sender's account
      user: "matthewacreekmore@gmail.com",
      pass: key
    }
  });
  let mailOptions = {
    // should be replaced with real recipient's account
    to: "matthewacreekmore@gmail.com",
    subject: req.body.subject,
    body: req.body.message
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message %s sent: %s", info.messageId, info.response);
  });
  res.end();
});

module.exports = router;
