const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const config = require("config");

// Messages Model
const Location = require("../../models/Location");

// @route   GET /api/locations
// @desc    Get all locations
// @access  Public
router.get("/", (req, res) => {
  Location.find()
    .sort({ date: -1 }) // sorts descending
    .then(locations => res.json(locations));
});

// @route   GET /api/locations/approved
// @desc    Get all approved locations
// @access  Public
router.get("/approved", (req, res) => {
  Location.find()
    .sort({ date: -1 }) // sorts descending
    .then(locations => {
      var approvedLocations = locations.filter(e => {
        return e["approved"] == "true";
      });
      console.log(approvedLocations);
      res.json(approvedLocations);
    });
});

// @route   POST /api/locations
// @desc    create a new location
// @access  Public
router.post("/", (req, res) => {
  const {
    name,
    description,
    type,
    country,
    region,
    city,
    street,
    zip,
    email,
    phone,
    website
  } = req.body;

  const approved = false;

  // Check for existing user
  Location.findOne({ street, country, region }).then(location => {
    if (location) {
      console.log(location);
      return res.status(400).json({ msg: "Location already registered" });
    }

    // const newUser = new User({
    //   name,
    //   email,
    //   password
    // });
    // hash pass and save in db

    const newLocation = new Location({
      name: req.body.name,
      description,
      type,
      country,
      region,
      city,
      street,
      zip,
      email,
      phone,
      website,
      approved

      // name: req.body.name,
      // description: req.body.description,
      // type: req.body.type,
      // country: req.body.country,
      // region: req.body.region,
      // city: req.body.city,
      // street: req.body.street,
      // zip: req.body.zip,
      // email: req.body.email,
      // phone: req.body.phone,
      // website: req.body.website
    });
    newLocation
      .save()
      .then(location => {
        res.json({
          location: {
            id: location.id,
            name: location.name
          }
        });
        // .catch(() => res.sendStatus(400));
      })
      .catch(() => res.sendStatus(400));
  });
});

module.exports = router;
