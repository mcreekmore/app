const express = require("express");
const router = express.Router();

// Messages Model
const Message = require("../../models/Message");

// @route   GET api/messages
// @desc    Get all messages
// @access  Public
router.get("/", (req, res) => {
  Message.find()
    .sort({ date: -1 }) // sorts descending
    .then(messages => res.json(messages));
});

// @route   POST api/messages
// @desc    Submit a message
// @access  Public
router.post("/", (req, res) => {
  const newMessage = new Message({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  });
  newMessage.save().then(message => res.json(message)); // submits to db
});

module.exports = router;
