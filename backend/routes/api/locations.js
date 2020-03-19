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
    // grocery info
    grocery_water_bool,
    grocery_perishable_bool,
    grocery_non_perishable_bool,
    grocery_toilet_paper_bool,
    grocery_disinfectants_bool,
    grocery_feminine_bool,
    //basic location info
    location_occupancy,
    location_rating,
    location_open_bool
  } = req.body;

  //console.log(grocery_water_bool);
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
    // grocery info
    grocery_update: {
      grocery_water_bool: grocery_water_bool,
      grocery_perishable_bool: grocery_perishable_bool,
      grocery_non_perishable_bool: grocery_non_perishable_bool,
      grocery_toilet_paper_bool: grocery_toilet_paper_bool,
      grocery_disinfectants_bool: grocery_disinfectants_bool,
      grocery_feminine_bool: grocery_feminine_bool
    },
    //basic location info
    location_occupancy,
    location_rating,
    location_open_bool
  });

  console.log(newUpdate.bar_update.bar_cover_bool);
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
      processLocationUpdate(location);
      // bar update
      if (type.toString() == "Bar") {
        //console.log("it is a bar");
        processBarUpdate(location);
      }
      // grocery update
      if (type.toString() == "Grocery") {
        //console.log("it is a grocery store");
        processGroceryUpdate(location);
      }
    });
  });
}

function processLocationUpdate(location) {
  LocationUpdate.find({ locationID: location._id }).then(updates => {
    var ONE_HOUR = 60 * 60 * 1000; /* ms */
    var ONE_DAY = 24 * 60 * 60 * 1000;

    let location_open_hour_bool_count = 0;
    let location_open_hour_bool_true_count = 0;
    let location_open_day_bool_count = 0;
    let location_open_day_bool_true_count = 0;

    updates.forEach(update => {
      var updateDate = new Date(update.date);
      // if within 24 hours
      if (new Date() - updateDate < ONE_DAY) {
        //location_open_bool
        if (update.location_open_bool != null) {
          location_open_day_bool_count++;
          if (update.location_open_bool == true) {
            location_open_day_bool_true_count++;
          }
        }
      }
      // if within 1 hour
      if (new Date() - updateDate < ONE_HOUR) {
        //location_open_bool
        if (update.location_open_bool != null) {
          location_open_hour_bool_count++;
          if (update.location_open_bool == true) {
            location_open_hour_bool_true_count++;
          }
        }
      }
      // regardless of time (all time)
    });

    // find average
    open_hour_percent =
      (
        location_open_hour_bool_true_count / location_open_hour_bool_count
      ).toFixed(2) * 100;
    open_day_percent =
      (
        location_open_day_bool_true_count / location_open_day_bool_count
      ).toFixed(2) * 100;

    // Update location document
    Location.findOneAndUpdate(
      { _id: location._id },
      {
        $set: {
          update_info: {
            location_update_info: {
              open_hour_percent: open_hour_percent,
              open_day_percent: open_day_percent
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

function processGroceryUpdate(location) {
  LocationUpdate.find({ locationID: location._id }).then(updates => {
    var ONE_HOUR = 60 * 60 * 1000; /* ms */
    var ONE_DAY = 24 * 60 * 60 * 1000;

    // last day
    let grocery_water_bool_count_day = 0;
    let grocery_water_bool_true_count_day = 0;
    let grocery_perishable_bool_count_day = 0;
    let grocery_perishable_bool_true_count_day = 0;
    let grocery_non_perishable_bool_count_day = 0;
    let grocery_non_perishable_bool_true_count_day = 0;
    let grocery_toilet_paper_bool_count_day = 0;
    let grocery_toilet_paper_bool_true_count_day = 0;
    let grocery_disinfectants_bool_count_day = 0;
    let grocery_disinfectants_bool_true_count_day = 0;
    let grocery_feminine_bool_count_day = 0;
    let grocery_feminine_bool_true_count_day = 0;
    // last hour
    let grocery_water_bool_count_hour = 0;
    let grocery_water_bool_true_count_hour = 0;
    let grocery_perishable_bool_count_hour = 0;
    let grocery_perishable_bool_true_count_hour = 0;
    let grocery_non_perishable_bool_count_hour = 0;
    let grocery_non_perishable_bool_true_count_hour = 0;
    let grocery_toilet_paper_bool_count_hour = 0;
    let grocery_toilet_paper_bool_true_count_hour = 0;
    let grocery_disinfectants_bool_count_hour = 0;
    let grocery_disinfectants_bool_true_count_hour = 0;
    let grocery_feminine_bool_count_hour = 0;
    let grocery_feminine_bool_true_count_hour = 0;

    updates.forEach(update => {
      groceryUpd = update.grocery_update;
      var updateDate = new Date(update.date);
      // if within 24 hours
      if (new Date() - updateDate < ONE_DAY) {
        //grocery_water_bool
        if (groceryUpd.grocery_water_bool != null) {
          grocery_water_bool_count_day++;
          if (groceryUpd.grocery_water_bool == true) {
            grocery_water_bool_true_count_day++;
          }
        }
        //grocery_perishable_bool
        if (groceryUpd.grocery_perishable_bool != null) {
          grocery_perishable_bool_count_day++;
          if (groceryUpd.grocery_perishable_bool == true) {
            grocery_perishable_bool_true_count_day++;
          }
        }
        //grocery_non_perishable_bool
        if (groceryUpd.grocery_non_perishable_bool != null) {
          grocery_non_perishable_bool_count_day++;
          if (groceryUpd.grocery_non_perishable_bool == true) {
            grocery_non_perishable_bool_true_count_day++;
          }
        }
        //grocery_toilet_paper_bool
        if (groceryUpd.grocery_toilet_paper_bool != null) {
          grocery_toilet_paper_bool_count_day++;
          if (groceryUpd.grocery_toilet_paper_bool == true) {
            grocery_toilet_paper_bool_true_count_day++;
          }
        }
        //grocery_disinfectants_bool
        if (groceryUpd.grocery_disinfectants_bool != null) {
          grocery_disinfectants_bool_count_day++;
          if (groceryUpd.grocery_disinfectants_bool == true) {
            grocery_disinfectants_bool_true_count_day++;
          }
        }
        //grocery_feminine_bool
        if (groceryUpd.grocery_feminine_bool != null) {
          grocery_feminine_bool_count_day++;
          if (groceryUpd.grocery_feminine_bool == true) {
            grocery_feminine_bool_true_count_day++;
          }
        }
      }
      // if within 1 hour
      if (new Date() - updateDate < ONE_HOUR) {
        //grocery_water_bool
        if (groceryUpd.grocery_water_bool != null) {
          grocery_water_bool_count_hour++;
          if (groceryUpd.grocery_water_bool == true) {
            grocery_water_bool_true_count_hour++;
          }
        }
        //grocery_perishable_bool
        if (groceryUpd.grocery_perishable_bool != null) {
          grocery_perishable_bool_count_hour++;
          if (groceryUpd.grocery_perishable_bool == true) {
            grocery_perishable_bool_true_count_hour++;
          }
        }
        //grocery_non_perishable_bool
        if (groceryUpd.grocery_non_perishable_bool != null) {
          grocery_non_perishable_bool_count_hour++;
          if (groceryUpd.grocery_non_perishable_bool == true) {
            grocery_non_perishable_bool_true_count_hour++;
          }
        }
        //grocery_toilet_paper_bool
        if (groceryUpd.grocery_toilet_paper_bool != null) {
          grocery_toilet_paper_bool_count_hour++;
          if (groceryUpd.grocery_toilet_paper_bool == true) {
            grocery_toilet_paper_bool_true_count_hour++;
          }
        }
        //grocery_disinfectants_bool
        if (groceryUpd.grocery_disinfectants_bool != null) {
          grocery_disinfectants_bool_count_hour++;
          if (groceryUpd.grocery_disinfectants_bool == true) {
            grocery_disinfectants_bool_true_count_hour++;
          }
        }
        //grocery_feminine_bool
        if (groceryUpd.grocery_feminine_bool != null) {
          grocery_feminine_bool_count_hour++;
          if (groceryUpd.grocery_feminine_bool == true) {
            grocery_feminine_bool_true_count_hour++;
          }
        }
      }
      // regardless of time (all time)
      //console.log(update.grocery_update.grocery_toilet_paper_bool);
    });

    // find average
    grocery_water_percent_day =
      (
        grocery_water_bool_true_count_day / grocery_water_bool_count_day
      ).toFixed(2) * 100;
    // console.log(grocery_water_percent_day);
    // console.log(grocery_water_bool_true_count_day);

    grocery_perishable_percent_day =
      (
        grocery_perishable_bool_true_count_day /
        grocery_perishable_bool_count_day
      ).toFixed(2) * 100;

    grocery_non_perishable_percent_day =
      (
        grocery_non_perishable_bool_true_count_day /
        grocery_non_perishable_bool_count_day
      ).toFixed(2) * 100;

    grocery_toilet_paper_percent_day =
      (
        grocery_toilet_paper_bool_true_count_day /
        grocery_toilet_paper_bool_count_day
      ).toFixed(2) * 100;

    grocery_disinfectants_percent_day =
      (
        grocery_disinfectants_bool_true_count_day /
        grocery_disinfectants_bool_count_day
      ).toFixed(2) * 100;

    grocery_feminine_percent_day =
      (
        grocery_feminine_bool_true_count_day / grocery_feminine_bool_count_day
      ).toFixed(2) * 100;

    // hour
    grocery_water_percent_hour =
      (
        grocery_water_bool_true_count_hour / grocery_water_bool_count_hour
      ).toFixed(2) * 100;

    grocery_perishable_percent_hour =
      (
        grocery_perishable_bool_true_count_hour /
        grocery_perishable_bool_count_hour
      ).toFixed(2) * 100;

    grocery_non_perishable_percent_hour =
      (
        grocery_non_perishable_bool_true_count_hour /
        grocery_non_perishable_bool_count_hour
      ).toFixed(2) * 100;

    grocery_toilet_paper_percent_hour =
      (
        grocery_toilet_paper_bool_true_count_hour /
        grocery_toilet_paper_bool_count_hour
      ).toFixed(2) * 100;

    grocery_disinfectants_percent_hour =
      (
        grocery_disinfectants_bool_true_count_hour /
        grocery_disinfectants_bool_count_hour
      ).toFixed(2) * 100;

    grocery_feminine_percent_hour =
      (
        grocery_feminine_bool_true_count_hour / grocery_feminine_bool_count_hour
      ).toFixed(2) * 100;

    // Update location document
    Location.findOneAndUpdate(
      { _id: location._id },
      {
        $set: {
          update_info: {
            grocery_update_info: {
              grocery_water_percent_day: grocery_water_percent_day,
              grocery_perishable_percent_day: grocery_perishable_percent_day,
              grocery_non_perishable_percent_day: grocery_non_perishable_percent_day,
              grocery_toilet_paper_percent_day: grocery_toilet_paper_percent_day,
              grocery_disinfectants_percent_day: grocery_disinfectants_percent_day,
              grocery_feminine_percent_day: grocery_feminine_percent_day,
              grocery_water_percent_hour: grocery_water_percent_hour,
              grocery_perishable_percent_hour: grocery_perishable_percent_hour,
              grocery_non_perishable_percent_hour: grocery_non_perishable_percent_hour,
              grocery_toilet_paper_percent_hour: grocery_toilet_paper_percent_hour,
              grocery_disinfectants_percent_hour: grocery_disinfectants_percent_hour,
              grocery_feminine_percent_hour: grocery_feminine_percent_hour
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
