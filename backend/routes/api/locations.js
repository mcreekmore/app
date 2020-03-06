const express = require("express");
const router = express.Router();
const nodeMailer = require("nodemailer"); //mail
const config = require("config");

// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const config = require("config");

// Messages Model
const Location = require("../../models/Location");
const LocationUpdate = require("../../models/LocationUpdate");

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
      //console.log(approvedLocations);
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
    types,
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
      types,
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
      }
      email().catch(console.error);
    });
  });
});

// @route   POST /api/locations
// @desc    create a new location
// @access  Public
router.post("/update", (req, res) => {
  const {
    locationID,
    date,
    // bar info
    bar_wait,
    bar_cover_bool,
    bar_cover_charge,
    bar_specials,
    bar_styles,
    //basic location info
    location_occupancy,
    location_rating
  } = req.body;

  // bar_wait = parseInt(bar_wait);
  // bar_cover_charge = parseInt(bar_cover_charge);
  // console.log(bar_wait);
  // console.log(bar_cover_charge);

  const newUpdate = new LocationUpdate({
    locationID,
    date,
    // bar info
    bar_update: {
      bar_wait: bar_wait,
      bar_cover_bool: bar_cover_bool,
      bar_cover_charge: bar_cover_charge,
      bar_specials: bar_specials,
      bar_styles: bar_styles
    },
    //basic location info
    location_occupancy,
    location_rating
  });
  newUpdate.save().then(newUpdate => {
    // response
    res.json({
      Update: {
        id: newUpdate.id,
        name: newUpdate.name
      }
    });
    // process update information
    processUpdate(locationID);
  });
});

module.exports = router;

// Looks at all types and delegates function for each update type
function processUpdate(locationID) {
  update_info = [];

  console.log("Processing Info");
  Location.findOne({ _id: locationID }).then(location => {
    location.types.forEach(type => {
      if (type.toString() == "Bar") {
        processBarUpdate(location);
      }
    });
  });
}

// Bar Update Proccessing
function processBarUpdate(location) {
  LocationUpdate.find({ locationID: location._id }).then(updates => {
    var ONE_HOUR = 60 * 60 * 1000; /* ms */
    var ONE_DAY = 24 * 60 * 60 * 1000;

    let bar_cover_charge_sum = 0.0;
    let bar_cover_charge_count = 0;
    let bar_specials_list = [];
    let bar_wait_sum = 0.0;
    let bar_wait_count = 0;
    let collegeBar = 0.0;
    let sportsBar = 0.0;
    let diveBar = 0.0;
    let cigarBar = 0.0;
    let wineBar = 0.0;
    let cocktailBar = 0.0;
    let irishPub = 0.0;
    let bar_styles_count = 0;
    let bar_cover_bool_count = 0;
    let bar_cover_bool_true_count = 0;
    updates.forEach(update => {
      var updateDate = new Date(update.date);
      // if within 24 hours
      if (new Date() - updateDate < ONE_DAY) {
        //bar_cover_bool
        if (update.bar_update.bar_cover_bool != null) {
          bar_cover_bool_count++;
          if (update.bar_update.bar_cover_bool == true) {
            bar_cover_bool_true_count++;
            //bar_cover_charge
            if (update.bar_update.bar_cover_charge != "") {
              bar_cover_charge_sum += parseInt(
                update.bar_update.bar_cover_charge
              );
              bar_cover_charge_count++;
            }
          }
        }
        //bar_specials
        if (update.bar_update.bar_specials != "") {
          bar_specials_list.push(update.bar_update.bar_specials);
        }
      }
      // if within 1 hour
      if (new Date() - updateDate < ONE_HOUR) {
        //bar_wait
        if (update.bar_update.bar_wait != "") {
          //console.log(update.bar_update.bar_wait);
          bar_wait_sum += parseInt(update.bar_update.bar_wait);
          bar_wait_count++;
        }
        //
      }

      // regardless of time submitted / all time
      if (update.bar_update.bar_styles != null) {
        bar_styles_count++;
        if (update.bar_update.bar_styles.includes("College Bar")) {
          collegeBar++;
        }
        if (update.bar_update.bar_styles == "Sports Bar") {
          sportsBar++;
        }
        if (update.bar_update.bar_styles == "Dive Bar") {
          diveBar++;
        }
        if (update.bar_update.bar_styles == "Cigar Bar") {
          cigarBar++;
        }
        if (update.bar_update.bar_styles == "Wine Bar") {
          wineBar++;
        }
        if (update.bar_update.bar_styles == "Cocktail Bar") {
          cocktailBar++;
        }
        if (update.bar_update.bar_styles == "Irish Pub") {
          irishPub++;
        }
      }
    });

    // find average
    let bar_cover_charge_average =
      bar_cover_charge_sum / bar_cover_charge_count;
    let bar_wait_average = bar_wait_sum / bar_wait_count;
    let bar_cover_charge_percent =
      bar_cover_bool_true_count / bar_cover_bool_count;
    bar_cover_charge_percent = bar_cover_charge_percent.toFixed(2) * 100;
    bar_cover_charge_average = bar_cover_charge_average.toFixed(0);
    bar_wait_average = bar_wait_average.toFixed(0);
    let bar_styles_list = [
      {
        style: "College Bar",
        percent: parseFloat(collegeBar) / bar_styles_count
      },
      { style: "Sports Bar", percent: sportsBar / bar_styles_count },
      { style: "Dive Bar", percent: diveBar / bar_styles_count },
      { style: "Cigar Bar", percent: cigarBar / bar_styles_count },
      { style: "Wine Bar", percent: wineBar / bar_styles_count },
      { style: "Cocktail Bar", percent: cocktailBar / bar_styles_count },
      { style: "Irish Pub", percent: irishPub / bar_styles_count }
    ];

    //compile info into array
    // bar_update_info = {
    //   bar_cover_charge_average,
    //   bar_specials_list,
    //   bar_wait_average,
    //   bar_styles_list
    // };

    //return bar_update_info;

    // Update location document
    Location.findOneAndUpdate(
      { _id: location._id },
      {
        $set: {
          update_info: {
            bar_update_info: {
              bar_cover_charge_average: bar_cover_charge_average,
              bar_cover_charge_percent,
              bar_specials_list: bar_specials_list,
              bar_wait_average: bar_wait_average,
              bar_styles_list: bar_styles_list
            }
          }
        }
      },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log(err);
        }

        //console.log(doc);
      }
    );
  });
}
