const express = require("express");
const router = express.Router();
const nodeMailer = require("nodemailer"); //mail
const config = require("config");

// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const config = require("config");

// Messages Model
const Location = require("../../models/Location");

// Email Key
const key = config.get("emailKey");

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
        return e["approved"] == true;
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
    lat,
    lon,
    email,
    phone,
    website
  } = req.body;

  const approved = false;

  // Check for existing user
  Location.findOne({ lat, lon }).then(location => {
    if (location) {
      //console.log(location);
      return res.status(400).json({ msg: "Location already registered" });
    }

    const newLocation = new Location({
      name,
      description,
      type,
      country,
      region,
      city,
      street,
      zip,
      lat,
      lon,
      email,
      phone,
      website,
      approved
    });
    newLocation.save().then(newLocation => {
      // email function

      res.json({
        location: {
          id: newLocation.id,
          name: newLocation.name
        }
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
          subject: "creekmore.io: Move Location Suggestion: " + name, // Subject line
          // text: `ID: ${location.id}\nName: ${name}\nDescription: ${description}\nType: ${type}\nCountry: ${country}\nrRegion: ${region}\nCity: ${city}\nStreet: ${street}\nZip: ${zip}\nEmail: ${email}\Phone: ${phone}\nWebsite: ${website}\n`, // plain text body
          text: req.body.name,
          // html body
          html:
            "<b> ID: " +
            newLocation.id +
            "</b> <br >" +
            "<b> Name: " +
            name +
            "</b> <br >" +
            "<b> Description: " +
            description +
            "</b> <br >" +
            "<b> Country: " +
            country +
            "</b> <br >" +
            "<b> Region: " +
            region +
            "</b> <br >" +
            "<b> City: " +
            city +
            "</b> <br >" +
            "<b> Street: " +
            street +
            "</b> <br >" +
            "<b> Zip: " +
            zip +
            "</b> <br >" +
            "<b> Lat: " +
            lat +
            "</b> <br >" +
            "<b> Lon: " +
            lon +
            "</b> <br >" +
            "<b> Email: " +
            req.body.email +
            "</b> <br >" +
            "<b> Phone: " +
            phone +
            "</b> <br >" +
            "<b> Website: " +
            website +
            "</b> <br >"
        });

        console.log("Message sent: %s", info.messageId);
      }

      email().catch(console.error);
    });
    // .catch(() => res.sendStatus(400));
  });
  //.catch(() => res.sendStatus(400));
});

module.exports = router;
