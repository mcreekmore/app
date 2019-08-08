const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

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
  const { name, email, password } = req.body;
  // Check for existing user
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    // const newUser = new User({
    //   name,
    //   email,
    //   password
    // });
    // hash pass and save in db
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: hash
        });
        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"), //secret id
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res
                .json({
                  token,
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                  }
                })
                .catch(() => res.sendStatus(400));
            }
          );
        });
      });
    });
  });
});

// @route   POST api/users/login
// @desc    authenticates a user
// @access  Public
//router.post("/login", (req, res) => {});

// @route   GET api/users/logout
// @desc    logs out a user
// @access  Private
//router.get("/logout", (req, res) => {});

module.exports = router;
