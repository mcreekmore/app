const express = require("express");
const router = express.Router();
const nodeMailer = require("nodemailer"); //mail
const config = require("config");

// Messages Model
const Message = require("../../models/Message");

// Email Key
const key = config.get("emailKey");

// @route   GET api/messages
// @desc    Get all messages
// @access  Public
router.get("/", (req, res) => {
  Message.find()
    .sort({ date: -1 }) // sorts descending
    .then(messages => res.json(messages));
});

// @route   POST api/messages
// @desc    Submit a message and send as Email
// @access  Public
router.post("/", (req, res) => {
  const newMessage = new Message({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
    email: true
  });

  async function email() {
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

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "matthewacreekmore@gmail.com", // sender address
      to: "matthewacreekmore@gmail.com", // list of receivers
      subject: "creekmore.io message from " + req.body.name, // Subject line
      text: req.body.message, // plain text body
      html:
        "<b> Name: " +
        req.body.name +
        "</b> <br >" +
        "<b> Email: " +
        req.body.email +
        "</b> <br >" +
        "<b> Message: " +
        req.body.message +
        "</b>" // html body
    });

    console.log("Message sent: %s", info.messageId);
  }

  email().catch(console.error);

  newMessage
    .save() // submits to db
    .then(message => res.json(message))
    .catch(() => res.sendStatus(400));
});

module.exports = router;
