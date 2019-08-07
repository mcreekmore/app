const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// Messages Model
const User = require("../../models/User");

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get("/", (req, res) => {
  User.find()
    .sort({ date: -1 }) // sorts descending
    .then(users => res.json(users));
});

// @route   POST api/users
// @desc    create a new user
// @access  Public
router.post("/", (req, res) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      const newUser = new User({
        email: req.body.email,
        password: hash
      });
      newUser
        .save()
        .then(user => res.json(user))
        .catch(() => res.sendStatus(400));
    });
  });
});

// @route   POST api/users/login
// @desc    authenticates a user
// @access  Public
router.post("/login", (req, res) => {});

// @route   GET api/users/logout
// @desc    logs out a user
// @access  Private
router.get("/logout", (req, res) => {});

module.exports = router;
