const express = require("express");
const router = express.Router();
const nodeMailer = require("nodemailer"); //mail
const config = require("config");
const schedule = require("node-schedule");

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
    .then((locations) => res.json(locations));
});

// @route   GET /api/locations/approved
// @desc    Get all approved locations
// @access  Public
router.get("/approved", (req, res) => {
  Location.find()
    .sort({ date: -1 }) // sorts descending
    .then((locations) => {
      var approvedLocations = locations.filter((e) => {
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
  let {
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
  } = req.body;

  // fixes urls
  if (website != null) {
    if (!website.startsWith("http://")) {
      if (!website.startsWith("https://")) {
        website = "http://" + website;
      }
    }
  }

  //const approved = false;

  // Check for existing user
  Location.findOne({ lat, lon }).then((location) => {
    if (location) {
      console.log("Location already registered");
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
    });

    newLocation.save().then((newLocation) => {
      // email function

      res.json({
        location: {
          id: newLocation.id,
          name: newLocation.name,
        },
      });
      async function email() {
        let transporter = nodeMailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            // should be replaced with real sender's account
            user: "matthewacreekmore@gmail.com",
            pass: key,
          },
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
            "</b> <br >",
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
  console.log("User submitted update processing...");
  const {
    locationID,
    //date,
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
    // gas info
    gas_regular_bool,
    gas_plus_bool,
    gas_premium_bool,
    gas_diesel_bool,
    gas_air_bool,
    // pharmacy info
    pharmacy_prescription_fill_bool,
    pharmacy_vaccinations_bool,
    pharmacy_drive_through_bool,
    pharmacy_counseling_bool,
    //restaurant info
    restaurant_wait,
    restaurant_specials,
    restaurant_inside_seating_bool,
    restaurant_outside_seating_bool,
    restaurant_take_out_bool,
    restaurant_curb_side_bool,
    //bank info
    bank_drive_through,
    bank_atm,
    // cafe info
    cafe_tea_bool,
    cafe_coffee_bool,
    cafe_uncaffeinated_bool,
    cafe_breakfast_bool,
    cafe_lunch_bool,
    cafe_inside_bool,
    cafe_outside_bool,
    cafe_drive_through_bool,
    cafe_online_bool,
    // hotel info,
    hotel_vacancies_bool,
    hotel_wifi_bool,
    hotel_breakfast_bool,
    hotel_pool_bool,
    hotel_air_bool,
    hotel_bar_bool,
    hotel_pets_bool,
    hotel_wellness_bool,
    // music venue info
    music_performance_bool,
    music_performer_name,
    music_performance_date,
    music_18_bool,
    music_21_bool,
    music_alcohol_bool,
    music_atm_bool,
    //basic location info
    location_occupancy,
    location_rating,
    location_open_bool,
  } = req.body;

  // replaces device date with server date to fix time zone discrepancies
  let date = new Date();

  const newUpdate = new LocationUpdate({
    locationID,
    date,
    // bar info
    bar_update: {
      bar_wait: bar_wait,
      bar_cover_bool: bar_cover_bool,
      bar_cover_charge: bar_cover_charge,
      bar_specials: bar_specials,
      bar_styles: bar_styles,
    },
    // restaurant info
    restaurant_update: {
      restaurant_wait,
      restaurant_specials,
      restaurant_inside_seating_bool,
      restaurant_outside_seating_bool,
      restaurant_take_out_bool,
      restaurant_curb_side_bool,
    },
    // grocery info
    grocery_update: {
      grocery_water_bool: grocery_water_bool,
      grocery_perishable_bool: grocery_perishable_bool,
      grocery_non_perishable_bool: grocery_non_perishable_bool,
      grocery_toilet_paper_bool: grocery_toilet_paper_bool,
      grocery_disinfectants_bool: grocery_disinfectants_bool,
      grocery_feminine_bool: grocery_feminine_bool,
    },
    // gas info
    gas_update: {
      gas_regular_bool,
      gas_plus_bool,
      gas_premium_bool,
      gas_diesel_bool,
      gas_air_bool,
    },
    // pharmacy info
    pharmacy_update: {
      pharmacy_prescription_fill_bool,
      pharmacy_vaccinations_bool,
      pharmacy_drive_through_bool,
      pharmacy_counseling_bool,
    },
    // bank info
    bank_update: {
      bank_drive_through,
      bank_atm,
    },
    // cafe info
    cafe_update: {
      cafe_tea_bool,
      cafe_coffee_bool,
      cafe_uncaffeinated_bool,
      cafe_breakfast_bool,
      cafe_lunch_bool,
      cafe_inside_bool,
      cafe_outside_bool,
      cafe_drive_through_bool,
      cafe_online_bool,
    },
    // hotel info
    hotel_update: {
      hotel_vacancies_bool,
      hotel_wifi_bool,
      hotel_breakfast_bool,
      hotel_pool_bool,
      hotel_air_bool,
      hotel_bar_bool,
      hotel_pets_bool,
      hotel_wellness_bool,
    },
    // music venue info
    music_update: {
      music_performance_bool,
      music_performer_name,
      music_performance_date,
      music_18_bool,
      music_21_bool,
      music_alcohol_bool,
      music_atm_bool,
    },
    //basic location info
    location_occupancy,
    location_rating,
    location_open_bool,
  });

  //console.log(newUpdate.bar_update.bar_cover_bool);
  newUpdate.save().then((newUpdate) => {
    // response
    res.json({
      Update: {
        id: newUpdate.id,
        name: newUpdate.name,
      },
    });
    // process update information
    processUpdate(locationID);
  });
});

module.exports = router;

// updates all locations every 10 minutes
var updateEveryTenMinutes = schedule.scheduleJob(
  "*/10 * * * *",
  async function () {
    console.log("Executing 10min update CRON...");
    Location.find().then((locations) => {
      //console.log(locations[0]);
      locations.forEach((location) => {
        processUpdate(location._id);
      });
    });
  }
);

// Looks at all types and delegates function for each update type
async function processUpdate(locationID) {
  update_info = {
    location_update_info: {},
  };

  //console.log("Processing Info");
  Location.findOne({ _id: locationID }).then((location) => {
    location.types.forEach((type) => {
      processLocationUpdate(location);
      // bar update
      if (type.toString() == "Bar") {
        processBarUpdate(location);
      }
      // grocery update
      if (type.toString() == "Grocery") {
        processGroceryUpdate(location);
      }
      // gas update
      if (type.toString() == "Gas Station") {
        processGasUpdate(location);
      }
      // pharmacy update
      if (type.toString() == "Pharmacy") {
        processPharmacyUpdate(location);
      }
      // restaurant update
      if (type.toString() == "Restaurant") {
        processRestaurantUpdate(location);
      }
      // bank update
      if (type.toString() == "Bank") {
        processBankUpdate(location);
      }
      // cafe update
      if (type.toString() == "Cafe") {
        processCafeUpdate(location);
      }
      // hotel update
      if (type.toString() == "Hotel") {
        processHotelUpdate(location);
      }
      // music venue update
      if (type.toString() == "Music Venue") {
        processMusicUpdate(location);
      }
    });
    //location.save();
  });
}

async function processLocationUpdate(location) {
  location = await LocationUpdate.find({ locationID: location._id }).then(
    (updates) => {
      var ONE_HOUR = 60 * 60 * 1000; /* ms */
      var ONE_DAY = 24 * 60 * 60 * 1000;

      let update_count_hour = 0;
      let update_count_day = 0;
      let location_open_hour_bool_count = 0;
      let location_open_hour_bool_true_count = 0;
      let location_open_day_bool_count = 0;
      let location_open_day_bool_true_count = 0;

      updates.forEach((update) => {
        var updateDate = new Date(update.date);
        // if within 24 hours
        if (new Date() - updateDate < ONE_DAY) {
          update_count_day++;

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
          update_count_hour++;

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
      if (location_open_hour_bool_count > 0) {
        open_hour_percent =
          (
            location_open_hour_bool_true_count / location_open_hour_bool_count
          ).toFixed(2) * 100;
      } else open_hour_percent = null;

      if (location_open_day_bool_count > 0) {
        open_day_percent =
          (
            location_open_day_bool_true_count / location_open_day_bool_count
          ).toFixed(2) * 100;
      } else open_day_percent = null;

      // console.log(update_count_day);
      // console.log(update_count_hour);

      location.update_info.location_update_info = {
        open_hour_percent: open_hour_percent,
        open_day_percent: open_day_percent,
        update_count_day: update_count_day,
        update_count_hour: update_count_hour,
      };

      // Update location document
      Location.findOneAndUpdate(
        { _id: location._id },
        {
          $set: {
            update_info: location.update_info,
          },
        },
        { new: true },

        (err, doc) => {
          if (err) {
            console.log(err);
          }
          //console.log(doc);
        }
      );
      return location;
    }
  );
  return location;
}

// Restaurant Update Processing
async function processRestaurantUpdate(location) {
  location = await LocationUpdate.find({ locationID: location._id }).then(
    (updates) => {
      var ONE_HOUR = 60 * 60 * 1000; /* ms */
      var ONE_DAY = 24 * 60 * 60 * 1000;

      // day
      let restaurant_inside_seating_bool_count_day = 0;
      let restaurant_inside_seating_bool_true_count_day = 0;
      let restaurant_outside_seating_bool_count_day = 0;
      let restaurant_outside_seating_bool_true_count_day = 0;
      let restaurant_take_out_bool_count_day = 0;
      let restaurant_take_out_bool_true_count_day = 0;
      let restaurant_curb_side_bool_count_day = 0;
      let restaurant_curb_side_bool_true_count_day = 0;

      // hour
      let restaurant_wait_sum = 0;
      let restaurant_wait_count = 0;
      let restaurant_inside_seating_bool_count_hour = 0;
      let restaurant_inside_seating_bool_true_count_hour = 0;
      let restaurant_outside_seating_bool_count_hour = 0;
      let restaurant_outside_seating_bool_true_count_hour = 0;
      let restaurant_take_out_bool_count_hour = 0;
      let restaurant_take_out_bool_true_count_hour = 0;
      let restaurant_curb_side_bool_count_hour = 0;
      let restaurant_curb_side_bool_true_count_hour = 0;

      // any time

      updates.forEach((update) => {
        var updateDate = new Date(update.date);
        // if within 24 hours
        if (new Date() - updateDate < ONE_DAY) {
          //restaurant_inside_seating_bool
          if (update.restaurant_update.restaurant_inside_seating_bool != null) {
            restaurant_inside_seating_bool_count_day++;
            if (
              update.restaurant_update.restaurant_inside_seating_bool == true
            ) {
              restaurant_inside_seating_bool_true_count_day++;
            }
          }
          //restaurant_outside_seating_bool
          if (
            update.restaurant_update.restaurant_outside_seating_bool != null
          ) {
            restaurant_outside_seating_bool_count_day++;
            if (
              update.restaurant_update.restaurant_outside_seating_bool == true
            ) {
              restaurant_outside_seating_bool_true_count_day++;
            }
          }
          //restaurant_take_out_bool
          if (update.restaurant_update.restaurant_take_out_bool != null) {
            restaurant_take_out_bool_count_day++;
            if (update.restaurant_update.restaurant_take_out_bool == true) {
              restaurant_take_out_bool_true_count_day++;
            }
          }
          //restaurant_curb_side_bool
          if (update.restaurant_update.restaurant_curb_side_bool != null) {
            restaurant_curb_side_bool_count_day++;
            if (update.restaurant_update.restaurant_curb_side_bool == true) {
              restaurant_curb_side_bool_true_count_day++;
            }
          }
        }
        // if within 1 hour
        if (new Date() - updateDate < ONE_HOUR) {
          //restaurant_wait
          if (update.restaurant_update.restaurant_wait != null) {
            restaurant_wait_count++;
            restaurant_wait_sum += update.restaurant_update.restaurant_wait;
          }

          //restaurant_inside_seating_bool
          if (update.restaurant_update.restaurant_inside_seating_bool != null) {
            restaurant_inside_seating_bool_count_hour++;
            if (
              update.restaurant_update.restaurant_inside_seating_bool == true
            ) {
              restaurant_inside_seating_bool_true_count_hour++;
            }
          }
          //restaurant_outside_seating_bool
          if (
            update.restaurant_update.restaurant_outside_seating_bool != null
          ) {
            restaurant_outside_seating_bool_count_hour++;
            if (
              update.restaurant_update.restaurant_outside_seating_bool == true
            ) {
              restaurant_outside_seating_bool_true_count_hour++;
            }
          }
          //restaurant_take_out_bool
          if (update.restaurant_update.restaurant_take_out_bool != null) {
            restaurant_take_out_bool_count_hour++;
            if (update.restaurant_update.restaurant_take_out_bool == true) {
              restaurant_take_out_bool_true_count_hour++;
            }
          }
          //restaurant_curb_side_bool
          if (update.restaurant_update.restaurant_curb_side_bool != null) {
            restaurant_curb_side_bool_count_hour++;
            if (update.restaurant_update.restaurant_curb_side_bool == true) {
              restaurant_curb_side_bool_true_count_hour++;
            }
          }
        }
        // regardless of time (all time)
      });

      // find average
      // day
      if (restaurant_inside_seating_bool_count_day > 0) {
        restaurant_inside_seating_percent_day =
          (
            restaurant_inside_seating_bool_true_count_day /
            restaurant_inside_seating_bool_count_day
          ).toFixed(2) * 100;
      } else restaurant_inside_seating_percent_day = null;

      if (restaurant_outside_seating_bool_count_day > 0) {
        restaurant_outside_seating_percent_day =
          (
            restaurant_outside_seating_bool_true_count_day /
            restaurant_outside_seating_bool_count_day
          ).toFixed(2) * 100;
      } else restaurant_outside_seating_percent_day = null;

      if (restaurant_take_out_bool_count_day > 0) {
        restaurant_take_out_percent_day =
          (
            restaurant_take_out_bool_true_count_day /
            restaurant_take_out_bool_count_day
          ).toFixed(2) * 100;
      } else restaurant_take_out_percent_day = null;

      if (restaurant_curb_side_bool_count_day > 0) {
        restaurant_curb_side_percent_day =
          (
            restaurant_curb_side_bool_true_count_day /
            restaurant_curb_side_bool_count_day
          ).toFixed(2) * 100;
      } else restaurant_curb_side_percent_day = null;

      // hour
      if (restaurant_inside_seating_bool_count_hour > 0) {
        restaurant_inside_seating_percent_hour =
          (
            restaurant_inside_seating_bool_true_count_hour /
            restaurant_inside_seating_bool_count_hour
          ).toFixed(2) * 100;
      } else restaurant_inside_seating_percent_hour = null;

      if (restaurant_outside_seating_bool_count_hour > 0) {
        restaurant_outside_seating_percent_hour =
          (
            restaurant_outside_seating_bool_true_count_hour /
            restaurant_outside_seating_bool_count_hour
          ).toFixed(2) * 100;
      } else restaurant_outside_seating_percent_hour = null;

      if (restaurant_take_out_bool_count_hour > 0) {
        restaurant_take_out_percent_hour =
          (
            restaurant_take_out_bool_true_count_hour /
            restaurant_take_out_bool_count_hour
          ).toFixed(2) * 100;
      } else restaurant_take_out_percent_hour = null;

      if (restaurant_curb_side_bool_count_hour > 0) {
        restaurant_curb_side_percent_hour =
          (
            restaurant_curb_side_bool_true_count_hour /
            restaurant_curb_side_bool_count_hour
          ).toFixed(2) * 100;
      } else restaurant_curb_side_percent_hour = null;

      if (restaurant_wait_count > 0) {
        restaurant_wait_average = restaurant_wait_sum / restaurant_wait_count;
      } else restaurant_wait_average = null;

      // any time

      // update object
      location.update_info.restaurant_update_info = {
        restaurant_inside_seating_percent_day,
        restaurant_outside_seating_percent_day,
        restaurant_take_out_percent_day,
        restaurant_curb_side_percent_day,
        restaurant_inside_seating_percent_hour,
        restaurant_outside_seating_percent_hour,
        restaurant_take_out_percent_hour,
        restaurant_curb_side_percent_hour,
        restaurant_wait_average,
      };

      // Update location document
      Location.findOneAndUpdate(
        { _id: location._id },
        {
          $set: {
            update_info: location.update_info,
          },
        },
        { new: true },

        (err, doc) => {
          if (err) {
            console.log(err);
          }
          //console.log(doc);
        }
      );
      return location;
    }
  );
  return location;
}

// Gas Update Processing
async function processGasUpdate(location) {
  location = await LocationUpdate.find({ locationID: location._id }).then(
    (updates) => {
      var ONE_HOUR = 60 * 60 * 1000; /* ms */
      var ONE_DAY = 24 * 60 * 60 * 1000;

      // day
      let gas_regular_bool_count_day = 0;
      let gas_regular_bool_true_count_day = 0;
      let gas_plus_bool_count_day = 0;
      let gas_plus_bool_true_count_day = 0;
      let gas_premium_bool_count_day = 0;
      let gas_premium_bool_true_count_day = 0;
      let gas_diesel_bool_count_day = 0;
      let gas_diesel_bool_true_count_day = 0;

      // hour
      let gas_regular_bool_count_hour = 0;
      let gas_regular_bool_true_count_hour = 0;
      let gas_plus_bool_count_hour = 0;
      let gas_plus_bool_true_count_hour = 0;
      let gas_premium_bool_count_hour = 0;
      let gas_premium_bool_true_count_hour = 0;
      let gas_diesel_bool_count_hour = 0;
      let gas_diesel_bool_true_count_hour = 0;

      // any time
      let gas_air_bool_count = 0;
      let gas_air_bool_true_count = 0;

      updates.forEach((update) => {
        var updateDate = new Date(update.date);
        // if within 24 hours
        if (new Date() - updateDate < ONE_DAY) {
          //gas_regular_bool
          if (update.gas_update.gas_regular_bool != null) {
            gas_regular_bool_count_day++;
            if (update.gas_update.gas_regular_bool == true) {
              gas_regular_bool_true_count_day++;
            }
          }
          //gas_plus_bool
          if (update.gas_update.gas_plus_bool != null) {
            gas_plus_bool_count_day++;
            if (update.gas_update.gas_plus_bool == true) {
              gas_plus_bool_true_count_day++;
            }
          }
          //gas_premium_bool
          if (update.gas_update.gas_premium_bool != null) {
            gas_premium_bool_count_day++;
            if (update.gas_update.gas_premium_bool == true) {
              gas_premium_bool_true_count_day++;
            }
          }
          //gas_diesel_bool
          if (update.gas_update.gas_diesel_bool != null) {
            gas_diesel_bool_count_day++;
            if (update.gas_update.gas_diesel_bool == true) {
              gas_diesel_bool_true_count_day++;
            }
          }
        }
        // if within 1 hour
        if (new Date() - updateDate < ONE_HOUR) {
          //gas_regular_bool
          if (update.gas_update.gas_regular_bool != null) {
            gas_regular_bool_count_hour++;
            if (update.gas_update.gas_regular_bool == true) {
              gas_regular_bool_true_count_hour++;
            }
          }
          //gas_plus_bool
          if (update.gas_update.gas_plus_bool != null) {
            gas_plus_bool_count_hour++;
            if (update.gas_update.gas_plus_bool == true) {
              gas_plus_bool_true_count_hour++;
            }
          }
          //gas_premium_bool
          if (update.gas_update.gas_premium_bool != null) {
            gas_premium_bool_count_hour++;
            if (update.gas_update.gas_premium_bool == true) {
              gas_premium_bool_true_count_hour++;
            }
          }
          //gas_diesel_bool
          if (update.gas_update.gas_diesel_bool != null) {
            gas_diesel_bool_count_hour++;
            if (update.gas_update.gas_diesel_bool == true) {
              gas_diesel_bool_true_count_hour++;
            }
          }
        }
        // regardless of time (all time)
        //gas_air_bool
        if (update.gas_update.gas_air_bool != null) {
          gas_air_bool_count++;
          if (update.gas_update.gas_air_bool == true) {
            gas_air_bool_true_count++;
          }
        }
      });

      // find average
      // day
      if (gas_regular_bool_count_day > 0) {
        gas_regular_percent_day =
          (
            gas_regular_bool_true_count_day / gas_regular_bool_count_day
          ).toFixed(2) * 100;
      } else gas_regular_percent_day = null;

      if (gas_plus_bool_count_day > 0) {
        gas_plus_percent_day =
          (gas_plus_bool_true_count_day / gas_plus_bool_count_day).toFixed(2) *
          100;
      } else gas_plus_percent_day = null;

      if (gas_premium_bool_count_day > 0) {
        gas_premium_percent_day =
          (
            gas_premium_bool_true_count_day / gas_premium_bool_count_day
          ).toFixed(2) * 100;
      } else gas_premium_percent_day = null;

      if (gas_diesel_bool_count_day > 0) {
        gas_diesel_percent_day =
          (gas_diesel_bool_true_count_day / gas_diesel_bool_count_day).toFixed(
            2
          ) * 100;
      } else gas_diesel_percent_day = null;

      // hour
      if (gas_regular_bool_count_hour > 0) {
        gas_regular_percent_hour =
          (
            gas_regular_bool_true_count_hour / gas_regular_bool_count_hour
          ).toFixed(2) * 100;
      } else gas_regular_percent_hour = null;

      if (gas_plus_bool_count_hour > 0) {
        gas_plus_percent_hour =
          (gas_plus_bool_true_count_hour / gas_plus_bool_count_hour).toFixed(
            2
          ) * 100;
      } else gas_plus_percent_hour = null;

      if (gas_premium_bool_count_hour > 0) {
        gas_premium_percent_hour =
          (
            gas_premium_bool_true_count_hour / gas_premium_bool_count_hour
          ).toFixed(2) * 100;
      } else gas_premium_percent_hour = null;

      if (gas_diesel_bool_count_hour > 0) {
        gas_diesel_percent_hour =
          (
            gas_diesel_bool_true_count_hour / gas_diesel_bool_count_hour
          ).toFixed(2) * 100;
      } else gas_diesel_percent_hour = null;

      // of all time
      if (gas_air_bool_count > 0) {
        gas_air_percent =
          (gas_air_bool_true_count / gas_air_bool_count).toFixed(2) * 100;
      } else gas_air_percent = null;

      location.update_info.gas_update_info = {
        gas_regular_percent_day,
        gas_plus_percent_day,
        gas_premium_percent_day,
        gas_diesel_percent_day,
        gas_regular_percent_hour,
        gas_plus_percent_hour,
        gas_premium_percent_hour,
        gas_diesel_percent_hour,
        gas_air_percent,
      };

      // Update location document
      Location.findOneAndUpdate(
        { _id: location._id },
        {
          $set: {
            update_info: location.update_info,
          },
        },
        { new: true },

        (err, doc) => {
          if (err) {
            console.log(err);
          }
          //console.log(doc);
        }
      );
      return location;
    }
  );
  return location;
}

// Pharmacy Update Processing
async function processPharmacyUpdate(location) {
  location = await LocationUpdate.find({ locationID: location._id }).then(
    (updates) => {
      var ONE_HOUR = 60 * 60 * 1000; /* ms */
      var ONE_DAY = 24 * 60 * 60 * 1000;

      // day
      let pharmacy_prescription_fill_bool_count_day = 0;
      let pharmacy_prescription_fill_bool_true_count_day = 0;
      let pharmacy_vaccinations_bool_count_day = 0;
      let pharmacy_vaccinations_bool_true_count_day = 0;
      let pharmacy_counseling_bool_count_day = 0;
      let pharmacy_counseling_bool_true_count_day = 0;

      // hour
      let pharmacy_prescription_fill_bool_count_hour = 0;
      let pharmacy_prescription_fill_bool_true_count_hour = 0;
      let pharmacy_vaccinations_bool_count_hour = 0;
      let pharmacy_vaccinations_bool_true_count_hour = 0;
      let pharmacy_counseling_bool_count_hour = 0;
      let pharmacy_counseling_bool_true_count_hour = 0;

      // any time
      let pharmacy_drive_through_bool_count = 0;
      let pharmacy_drive_through_bool_true_count = 0;

      updates.forEach((update) => {
        var updateDate = new Date(update.date);
        // if within 24 hours
        if (new Date() - updateDate < ONE_DAY) {
          //pharmacy_prescription_fill_bool
          if (update.pharmacy_update.pharmacy_prescription_fill_bool != null) {
            pharmacy_prescription_fill_bool_count_day++;
            if (
              update.pharmacy_update.pharmacy_prescription_fill_bool == true
            ) {
              pharmacy_prescription_fill_bool_true_count_day++;
            }
            //pharmacy_prescription_fill_bool
            if (update.pharmacy_update.pharmacy_vaccinations_bool != null) {
              pharmacy_vaccinations_bool_count_day++;
              if (update.pharmacy_update.pharmacy_vaccinations_bool == true) {
                pharmacy_vaccinations_bool_true_count_day++;
              }
            }
            //pharmacy_prescription_fill_bool
            if (update.pharmacy_update.pharmacy_counseling_bool != null) {
              pharmacy_counseling_bool_count_day++;
              if (update.pharmacy_update.pharmacy_counseling_bool == true) {
                pharmacy_counseling_bool_true_count_day++;
              }
            }
          }
        }
        // if within 1 hour
        if (new Date() - updateDate < ONE_HOUR) {
          //pharmacy_prescription_fill_bool
          if (update.pharmacy_update.pharmacy_prescription_fill_bool != null) {
            pharmacy_prescription_fill_bool_count_hour++;
            if (
              update.pharmacy_update.pharmacy_prescription_fill_bool == true
            ) {
              pharmacy_prescription_fill_bool_true_count_hour++;
            }
            //pharmacy_prescription_fill_bool
            if (update.pharmacy_update.pharmacy_vaccinations_bool != null) {
              pharmacy_vaccinations_bool_count_hour++;
              if (update.pharmacy_update.pharmacy_vaccinations_bool == true) {
                pharmacy_vaccinations_bool_true_count_hour++;
              }
            }
            //pharmacy_prescription_fill_bool
            if (update.pharmacy_update.pharmacy_counseling_bool != null) {
              pharmacy_counseling_bool_count_hour++;
              if (update.pharmacy_update.pharmacy_counseling_bool == true) {
                pharmacy_counseling_bool_true_count_hour++;
              }
            }
          }
        }
        // regardless of time (all time)
        //gas_air_bool
        if (update.pharmacy_update.pharmacy_drive_through_bool != null) {
          pharmacy_drive_through_bool_count++;
          if (update.pharmacy_update.pharmacy_drive_through_bool == true) {
            pharmacy_drive_through_bool_true_count++;
          }
        }
      });

      // find average
      // day
      if (pharmacy_prescription_fill_bool_count_day > 0) {
        pharmacy_prescription_fill_percent_day =
          (
            pharmacy_prescription_fill_bool_true_count_day /
            pharmacy_prescription_fill_bool_count_day
          ).toFixed(2) * 100;
      } else pharmacy_prescription_fill_percent_day = null;

      if (pharmacy_vaccinations_bool_count_day > 0) {
        pharmacy_vaccinations_percent_day =
          (
            pharmacy_vaccinations_bool_true_count_day /
            pharmacy_vaccinations_bool_count_day
          ).toFixed(2) * 100;
      } else pharmacy_vaccinations_percent_day = null;

      if (pharmacy_counseling_bool_count_day > 0) {
        pharmacy_counseling_percent_day =
          (
            pharmacy_counseling_bool_true_count_day /
            pharmacy_counseling_bool_count_day
          ).toFixed(2) * 100;
      } else pharmacy_counseling_percent_day = null;

      // hour
      if (pharmacy_prescription_fill_bool_count_hour > 0) {
        pharmacy_prescription_fill_percent_hour =
          (
            pharmacy_prescription_fill_bool_true_count_hour /
            pharmacy_prescription_fill_bool_count_hour
          ).toFixed(2) * 100;
      } else pharmacy_prescription_fill_percent_hour = null;

      if (pharmacy_vaccinations_bool_count_hour > 0) {
        pharmacy_vaccinations_percent_hour =
          (
            pharmacy_vaccinations_bool_true_count_hour /
            pharmacy_vaccinations_bool_count_hour
          ).toFixed(2) * 100;
      } else pharmacy_vaccinations_percent_hour = null;

      if (pharmacy_counseling_bool_count_hour > 0) {
        pharmacy_counseling_percent_hour =
          (
            pharmacy_counseling_bool_true_count_hour /
            pharmacy_counseling_bool_count_hour
          ).toFixed(2) * 100;
      } else pharmacy_counseling_percent_hour = null;

      // of all time
      if (pharmacy_drive_through_bool_count > 0) {
        pharmacy_drive_through_percent =
          (
            pharmacy_drive_through_bool_true_count /
            pharmacy_drive_through_bool_count
          ).toFixed(2) * 100;
      } else pharmacy_drive_through_percent = null;

      location.update_info.pharmacy_update_info = {
        pharmacy_prescription_fill_percent_day,
        pharmacy_vaccinations_percent_day,
        pharmacy_counseling_percent_day,
        pharmacy_prescription_fill_percent_hour,
        pharmacy_vaccinations_percent_hour,
        pharmacy_counseling_percent_hour,
        pharmacy_drive_through_percent,
      };

      // Update location document
      Location.findOneAndUpdate(
        { _id: location._id },
        {
          $set: {
            update_info: location.update_info,
          },
        },
        { new: true },

        (err, doc) => {
          if (err) {
            console.log(err);
          }
          // console.log(doc);
        }
      );
      return location;
    }
  );
  return location;
}

// Bank Update Processing
async function processBankUpdate(location) {
  location = await LocationUpdate.find({ locationID: location._id }).then(
    (updates) => {
      var ONE_HOUR = 60 * 60 * 1000; /* ms */
      var ONE_DAY = 24 * 60 * 60 * 1000;

      // day
      let bank_drive_through_count_day = 0;
      let bank_drive_through_true_count_day = 0;
      let bank_atm_count_day = 0;
      let bank_atm_true_count_day = 0;

      // hour
      let bank_drive_through_count_hour = 0;
      let bank_drive_through_true_count_hour = 0;
      let bank_atm_count_hour = 0;
      let bank_atm_true_count_hour = 0;

      // any time

      updates.forEach((update) => {
        var updateDate = new Date(update.date);
        // if within 24 hours
        if (new Date() - updateDate < ONE_DAY) {
          //bank_drive_through
          if (update.bank_update.bank_drive_through != null) {
            bank_drive_through_count_day++;
            if (update.bank_update.bank_drive_through == true) {
              bank_drive_through_true_count_day++;
            }
          }
          //bank_atm
          if (update.bank_update.bank_atm != null) {
            bank_atm_count_day++;
            if (update.bank_update.bank_atm == true) {
              bank_atm_true_count_day++;
            }
          }
        }
        // if within 1 hour
        if (new Date() - updateDate < ONE_HOUR) {
          //bank_drive_through
          if (update.bank_update.bank_drive_through != null) {
            bank_drive_through_count_hour++;
            if (update.bank_update.bank_drive_through == true) {
              bank_drive_through_true_count_hour++;
            }
          }
          //bank_atm
          if (update.bank_update.bank_atm != null) {
            bank_atm_count_hour++;
            if (update.bank_update.bank_atm == true) {
              bank_atm_true_count_hour++;
            }
          }
        }
        // regardless of time (all time)
      });

      // find average
      // day
      if (bank_drive_through_count_day > 0) {
        bank_drive_through_percent_day =
          (
            bank_drive_through_true_count_day / bank_drive_through_count_day
          ).toFixed(2) * 100;
      } else bank_drive_through_percent_day = null;

      if (bank_atm_count_day > 0) {
        bank_atm_percent_day =
          (bank_atm_true_count_day / bank_atm_count_day).toFixed(2) * 100;
      } else bank_atm_percent_day = null;

      // hour
      if (bank_drive_through_count_hour > 0) {
        bank_drive_through_percent_hour =
          (
            bank_drive_through_true_count_hour / bank_drive_through_count_hour
          ).toFixed(2) * 100;
      } else bank_drive_through_percent_hour = null;

      if (bank_atm_count_hour > 0) {
        bank_atm_percent_hour =
          (bank_atm_true_count_hour / bank_atm_count_hour).toFixed(2) * 100;
      } else bank_atm_percent_hour = null;

      // of all time

      location.update_info.bank_update_info = {
        bank_drive_through_percent_day,
        bank_drive_through_percent_hour,
        bank_atm_percent_day,
        bank_atm_percent_hour,
      };

      // Update location document
      Location.findOneAndUpdate(
        { _id: location._id },
        {
          $set: {
            update_info: location.update_info,
          },
        },
        { new: true },

        (err, doc) => {
          if (err) {
            console.log(err);
          }
          // console.log(doc);
        }
      );
      return location;
    }
  );
  return location;
}

// Cafe Update Processing
async function processCafeUpdate(location) {
  location = await LocationUpdate.find({ locationID: location._id }).then(
    (updates) => {
      var ONE_HOUR = 60 * 60 * 1000; /* ms */
      var ONE_DAY = 24 * 60 * 60 * 1000;

      // day
      let cafe_tea_bool_count_day = 0;
      let cafe_tea_bool_true_count_day = 0;
      let cafe_coffee_bool_count_day = 0;
      let cafe_coffee_bool_true_count_day = 0;
      let cafe_uncaffeinated_bool_count_day = 0;
      let cafe_uncaffeinated_bool_true_count_day = 0;
      let cafe_breakfast_bool_count_day = 0;
      let cafe_breakfast_bool_true_count_day = 0;
      let cafe_lunch_bool_count_day = 0;
      let cafe_lunch_bool_true_count_day = 0;
      let cafe_inside_bool_count_day = 0;
      let cafe_inside_bool_true_count_day = 0;
      let cafe_outside_bool_count_day = 0;
      let cafe_outside_bool_true_count_day = 0;
      let cafe_drive_through_bool_count_day = 0;
      let cafe_drive_through_bool_true_count_day = 0;
      let cafe_online_bool_count_day = 0;
      let cafe_online_bool_true_count_day = 0;

      // hour

      // any time
      let cafe_tea_bool_count = 0;
      let cafe_tea_bool_true_count = 0;
      let cafe_coffee_bool_count = 0;
      let cafe_coffee_bool_true_count = 0;
      let cafe_uncaffeinated_bool_count = 0;
      let cafe_uncaffeinated_bool_true_count = 0;
      let cafe_breakfast_bool_count = 0;
      let cafe_breakfast_bool_true_count = 0;
      let cafe_lunch_bool_count = 0;
      let cafe_lunch_bool_true_count = 0;
      let cafe_inside_bool_count = 0;
      let cafe_inside_bool_true_count = 0;
      let cafe_outside_bool_count = 0;
      let cafe_outside_bool_true_count = 0;
      let cafe_drive_through_bool_count = 0;
      let cafe_drive_through_bool_true_count = 0;
      let cafe_online_bool_count = 0;
      let cafe_online_bool_true_count = 0;

      updates.forEach((update) => {
        var updateDate = new Date(update.date);
        // if within 24 hours
        if (new Date() - updateDate < ONE_DAY) {
          //cafe_tea_bool
          if (update.cafe_update.cafe_tea_bool != null) {
            cafe_tea_bool_count_day++;
            if (update.cafe_update.cafe_tea_bool == true) {
              cafe_tea_bool_true_count_day++;
            }
          }
          //cafe_coffee_bool
          if (update.cafe_update.cafe_coffee_bool != null) {
            cafe_coffee_bool_count_day++;
            if (update.cafe_update.cafe_coffee_bool == true) {
              cafe_coffee_bool_true_count_day++;
            }
          }
          //cafe_uncaffeinated_bool
          if (update.cafe_update.cafe_uncaffeinated_bool != null) {
            cafe_uncaffeinated_bool_count_day++;
            if (update.cafe_update.cafe_uncaffeinated_bool == true) {
              cafe_uncaffeinated_bool_true_count_day++;
            }
          }
          //cafe_breakfast_bool
          if (update.cafe_update.cafe_breakfast_bool != null) {
            cafe_breakfast_bool_count_day++;
            if (update.cafe_update.cafe_breakfast_bool == true) {
              cafe_breakfast_bool_true_count_day++;
            }
          }
          //cafe_lunch_bool
          if (update.cafe_update.cafe_lunch_bool != null) {
            cafe_lunch_bool_count_day++;
            if (update.cafe_update.cafe_lunch_bool == true) {
              cafe_lunch_bool_true_count_day++;
            }
          }
          //cafe_inside_bool
          if (update.cafe_update.cafe_inside_bool != null) {
            cafe_inside_bool_count_day++;
            if (update.cafe_update.cafe_inside_bool == true) {
              cafe_inside_bool_true_count_day++;
            }
          }
          //cafe_outside_bool
          if (update.cafe_update.cafe_outside_bool != null) {
            cafe_outside_bool_count_day++;
            if (update.cafe_update.cafe_outside_bool == true) {
              cafe_outside_bool_true_count_day++;
            }
          }
          //cafe_drive_through_bool
          if (update.cafe_update.cafe_drive_through_bool != null) {
            cafe_drive_through_bool_count_day++;
            if (update.cafe_update.cafe_drive_through_bool == true) {
              cafe_drive_through_bool_true_count_day++;
            }
          }
          //cafe_online_bool
          if (update.cafe_update.cafe_online_bool != null) {
            cafe_online_bool_count_day++;
            if (update.cafe_update.cafe_online_bool == true) {
              cafe_online_bool_true_count_day++;
            }
          }
        }
        // if within 1 hour
        if (new Date() - updateDate < ONE_HOUR) {
        }
        // regardless of time (all time)
        //cafe_tea_bool
        if (update.cafe_update.cafe_tea_bool != null) {
          cafe_tea_bool_count++;
          if (update.cafe_update.cafe_tea_bool == true) {
            cafe_tea_bool_true_count++;
          }
        }
        //cafe_coffee_bool
        if (update.cafe_update.cafe_coffee_bool != null) {
          cafe_coffee_bool_count++;
          if (update.cafe_update.cafe_coffee_bool == true) {
            cafe_coffee_bool_true_count++;
          }
        }
        //cafe_uncaffeinated_bool
        if (update.cafe_update.cafe_uncaffeinated_bool != null) {
          cafe_uncaffeinated_bool_count++;
          if (update.cafe_update.cafe_uncaffeinated_bool == true) {
            cafe_uncaffeinated_bool_true_count++;
          }
        }
        //cafe_breakfast_bool
        if (update.cafe_update.cafe_breakfast_bool != null) {
          cafe_breakfast_bool_count++;
          if (update.cafe_update.cafe_breakfast_bool == true) {
            cafe_breakfast_bool_true_count++;
          }
        }
        //cafe_lunch_bool
        if (update.cafe_update.cafe_lunch_bool != null) {
          cafe_lunch_bool_count++;
          if (update.cafe_update.cafe_lunch_bool == true) {
            cafe_lunch_bool_true_count++;
          }
        }
        //cafe_inside_bool
        if (update.cafe_update.cafe_inside_bool != null) {
          cafe_inside_bool_count++;
          if (update.cafe_update.cafe_inside_bool == true) {
            cafe_inside_bool_true_count++;
          }
        }
        //cafe_outside_bool
        if (update.cafe_update.cafe_outside_bool != null) {
          cafe_outside_bool_count++;
          if (update.cafe_update.cafe_outside_bool == true) {
            cafe_outside_bool_true_count++;
          }
        }
        //cafe_drive_through_bool
        if (update.cafe_update.cafe_drive_through_bool != null) {
          cafe_drive_through_bool_count++;
          if (update.cafe_update.cafe_drive_through_bool == true) {
            cafe_drive_through_bool_true_count++;
          }
        }
        //cafe_online_bool
        if (update.cafe_update.cafe_online_bool != null) {
          cafe_online_bool_count++;
          if (update.cafe_update.cafe_online_bool == true) {
            cafe_online_bool_true_count++;
          }
        }
      });

      // find average
      // day
      if (cafe_tea_bool_count_day > 0) {
        cafe_tea_percent_day =
          (cafe_tea_bool_true_count_day / cafe_tea_bool_count_day).toFixed(2) *
          100;
      } else cafe_tea_percent_day = null;

      if (cafe_coffee_bool_count_day > 0) {
        cafe_coffee_percent_day =
          (
            cafe_coffee_bool_true_count_day / cafe_coffee_bool_count_day
          ).toFixed(2) * 100;
      } else cafe_coffee_percent_day = null;

      if (cafe_uncaffeinated_bool_count_day > 0) {
        cafe_uncaffeinated_percent_day =
          (
            cafe_uncaffeinated_bool_true_count_day /
            cafe_uncaffeinated_bool_count_day
          ).toFixed(2) * 100;
      } else cafe_uncaffeinated_percent_day = null;

      if (cafe_breakfast_bool_count_day > 0) {
        cafe_breakfast_percent_day =
          (
            cafe_breakfast_bool_true_count_day / cafe_breakfast_bool_count_day
          ).toFixed(2) * 100;
      } else cafe_breakfast_percent_day = null;

      if (cafe_lunch_bool_count_day > 0) {
        cafe_lunch_percent_day =
          (cafe_lunch_bool_true_count_day / cafe_lunch_bool_count_day).toFixed(
            2
          ) * 100;
      } else cafe_lunch_percent_day = null;

      if (cafe_inside_bool_count_day > 0) {
        cafe_inside_percent_day =
          (
            cafe_inside_bool_true_count_day / cafe_inside_bool_count_day
          ).toFixed(2) * 100;
      } else cafe_inside_percent_day = null;

      if (cafe_outside_bool_count_day > 0) {
        cafe_outside_percent_day =
          (
            cafe_outside_bool_true_count_day / cafe_outside_bool_count_day
          ).toFixed(2) * 100;
      } else cafe_outside_percent_day = null;

      if (cafe_drive_through_bool_count_day > 0) {
        cafe_drive_through_percent_day =
          (
            cafe_drive_through_bool_true_count_day /
            cafe_drive_through_bool_count_day
          ).toFixed(2) * 100;
      } else cafe_drive_through_percent_day = null;

      if (cafe_online_bool_count_day > 0) {
        cafe_online_percent_day =
          (
            cafe_online_bool_true_count_day / cafe_online_bool_count_day
          ).toFixed(2) * 100;
      } else cafe_online_percent_day = null;

      // hour

      // of all time
      if (cafe_tea_bool_count > 0) {
        cafe_tea_percent =
          (cafe_tea_bool_true_count / cafe_tea_bool_count).toFixed(2) * 100;
      } else cafe_tea_percent = null;

      if (cafe_coffee_bool_count > 0) {
        cafe_coffee_percent =
          (cafe_coffee_bool_true_count / cafe_coffee_bool_count).toFixed(2) *
          100;
      } else cafe_coffee_percent = null;

      if (cafe_uncaffeinated_bool_count > 0) {
        cafe_uncaffeinated_percent =
          (
            cafe_uncaffeinated_bool_true_count / cafe_uncaffeinated_bool_count
          ).toFixed(2) * 100;
      } else cafe_uncaffeinated_percent = null;

      if (cafe_breakfast_bool_count > 0) {
        cafe_breakfast_percent =
          (cafe_breakfast_bool_true_count / cafe_breakfast_bool_count).toFixed(
            2
          ) * 100;
      } else cafe_breakfast_percent = null;

      if (cafe_lunch_bool_count > 0) {
        cafe_lunch_percent =
          (cafe_lunch_bool_true_count / cafe_lunch_bool_count).toFixed(2) * 100;
      } else cafe_lunch_percent = null;

      if (cafe_inside_bool_count > 0) {
        cafe_inside_percent =
          (cafe_inside_bool_true_count / cafe_inside_bool_count).toFixed(2) *
          100;
      } else cafe_inside_percent = null;

      if (cafe_outside_bool_count > 0) {
        cafe_outside_percent =
          (cafe_outside_bool_true_count / cafe_outside_bool_count).toFixed(2) *
          100;
      } else cafe_outside_percent = null;

      if (cafe_drive_through_bool_count > 0) {
        cafe_drive_through_percent =
          (
            cafe_drive_through_bool_true_count / cafe_drive_through_bool_count
          ).toFixed(2) * 100;
      } else cafe_drive_through_percent = null;

      if (cafe_online_bool_count > 0) {
        cafe_online_percent =
          (cafe_online_bool_true_count / cafe_online_bool_count).toFixed(2) *
          100;
      } else cafe_online_percent = null;

      location.update_info.cafe_update_info = {
        cafe_tea_percent,
        cafe_tea_percent_day,
        cafe_coffee_percent,
        cafe_coffee_percent_day,
        cafe_uncaffeinated_percent,
        cafe_uncaffeinated_percent_day,
        cafe_breakfast_percent,
        cafe_breakfast_percent_day,
        cafe_lunch_percent,
        cafe_lunch_percent_day,
        cafe_inside_percent,
        cafe_inside_percent_day,
        cafe_outside_percent,
        cafe_outside_percent_day,
        cafe_drive_through_percent,
        cafe_drive_through_percent_day,
        cafe_online_percent,
        cafe_online_percent_day,
      };

      // Update location document
      Location.findOneAndUpdate(
        { _id: location._id },
        {
          $set: {
            update_info: location.update_info,
          },
        },
        { new: true },

        (err, doc) => {
          if (err) {
            console.log(err);
          }
          // console.log(doc);
        }
      );
      return location;
    }
  );
  return location;
}

// Hotel Update Processing
async function processHotelUpdate(location) {
  location = await LocationUpdate.find({ locationID: location._id }).then(
    (updates) => {
      var ONE_HOUR = 60 * 60 * 1000; /* ms */
      var ONE_DAY = 24 * 60 * 60 * 1000;

      // day
      let hotel_vacancies_bool_count_day = 0;
      let hotel_vacancies_bool_true_count_day = 0;

      // hour
      let hotel_vacancies_bool_count_hour = 0;
      let hotel_vacancies_bool_true_count_hour = 0;

      // any time
      let hotel_wifi_bool_count = 0;
      let hotel_wifi_bool_true_count = 0;
      let hotel_breakfast_bool_count = 0;
      let hotel_breakfast_bool_true_count = 0;
      let hotel_pool_bool_count = 0;
      let hotel_pool_bool_true_count = 0;
      let hotel_air_bool_count = 0;
      let hotel_air_bool_true_count = 0;
      let hotel_bar_bool_count = 0;
      let hotel_bar_bool_true_count = 0;
      let hotel_pets_bool_count = 0;
      let hotel_pets_bool_true_count = 0;
      let hotel_wellness_bool_count = 0;
      let hotel_wellness_bool_true_count = 0;

      updates.forEach((update) => {
        var updateDate = new Date(update.date);
        // if within 24 hours
        if (new Date() - updateDate < ONE_DAY) {
          //hotel_vacancies_bool
          if (update.hotel_update.hotel_vacancies_bool != null) {
            hotel_vacancies_bool_count_day++;
            if (update.hotel_update.hotel_vacancies_bool == true) {
              hotel_vacancies_bool_true_count_day++;
            }
          }
        }
        // if within 1 hour
        if (new Date() - updateDate < ONE_HOUR) {
          //hotel_vacancies_bool
          if (update.hotel_update.hotel_vacancies_bool != null) {
            hotel_vacancies_bool_count_hour++;
            if (update.hotel_update.hotel_vacancies_bool == true) {
              hotel_vacancies_bool_true_count_hour++;
            }
          }
        }
        // regardless of time (all time)
        //hotel_wifi_bool
        if (update.hotel_update.hotel_wifi_bool != null) {
          hotel_wifi_bool_count++;
          if (update.hotel_update.hotel_wifi_bool == true) {
            hotel_wifi_bool_true_count++;
          }
        }
        //hotel_breakfast_bool
        if (update.hotel_update.hotel_breakfast_bool != null) {
          hotel_breakfast_bool_count++;
          if (update.hotel_update.hotel_breakfast_bool == true) {
            hotel_breakfast_bool_true_count++;
          }
        }
        //hotel_pool_bool
        if (update.hotel_update.hotel_pool_bool != null) {
          hotel_pool_bool_count++;
          if (update.hotel_update.hotel_pool_bool == true) {
            hotel_pool_bool_true_count++;
          }
        }
        //hotel_air_bool
        if (update.hotel_update.hotel_air_bool != null) {
          hotel_air_bool_count++;
          if (update.hotel_update.hotel_air_bool == true) {
            hotel_air_bool_true_count++;
          }
        }
        //hotel_bar_bool
        if (update.hotel_update.hotel_bar_bool != null) {
          hotel_bar_bool_count++;
          if (update.hotel_update.hotel_bar_bool == true) {
            hotel_bar_bool_true_count++;
          }
        }
        //hotel_pets_bool
        if (update.hotel_update.hotel_pets_bool != null) {
          hotel_pets_bool_count++;
          if (update.hotel_update.hotel_pets_bool == true) {
            hotel_pets_bool_true_count++;
          }
        }
        //hotel_wellness_bool
        if (update.hotel_update.hotel_wellness_bool != null) {
          hotel_wellness_bool_count++;
          if (update.hotel_update.hotel_wellness_bool == true) {
            hotel_wellness_bool_true_count++;
          }
        }
      });

      // find average
      // day
      // hotel_vacancies_bool
      if (hotel_vacancies_bool_count_day > 0) {
        hotel_vacancies_bool_percent_day =
          (
            hotel_vacancies_bool_true_count_day / hotel_vacancies_bool_count_day
          ).toFixed(2) * 100;
      } else hotel_vacancies_bool_percent_day = null;

      // hour
      // hotel_vacancies_bool
      if (hotel_vacancies_bool_count_hour > 0) {
        hotel_vacancies_bool_percent_hour =
          (
            hotel_vacancies_bool_true_count_hour /
            hotel_vacancies_bool_count_hour
          ).toFixed(2) * 100;
      } else hotel_vacancies_bool_percent_hour = null;

      // of all time
      // hotel_wifi
      if (hotel_wifi_bool_count > 0) {
        hotel_wifi_percent =
          (hotel_wifi_bool_true_count / hotel_wifi_bool_count).toFixed(2) * 100;
      } else hotel_wifi_percent = null;

      // hotel_breakfast
      if (hotel_breakfast_bool_count > 0) {
        hotel_breakfast_percent =
          (
            hotel_breakfast_bool_true_count / hotel_breakfast_bool_count
          ).toFixed(2) * 100;
      } else hotel_breakfast_percent = null;

      // hotel_pool
      if (hotel_pool_bool_count > 0) {
        hotel_pool_percent =
          (hotel_pool_bool_true_count / hotel_pool_bool_count).toFixed(2) * 100;
      } else hotel_pool_percent = null;

      // hotel_air
      if (hotel_air_bool_count > 0) {
        hotel_air_percent =
          (hotel_air_bool_true_count / hotel_air_bool_count).toFixed(2) * 100;
      } else hotel_air_percent = null;

      // hotel_bar
      if (hotel_bar_bool_count > 0) {
        hotel_bar_percent =
          (hotel_bar_bool_true_count / hotel_bar_bool_count).toFixed(2) * 100;
      } else hotel_bar_percent = null;

      // hotel_pets
      if (hotel_pets_bool_count > 0) {
        hotel_pets_percent =
          (hotel_pets_bool_true_count / hotel_pets_bool_count).toFixed(2) * 100;
      } else hotel_pets_percent = null;

      // hotel_wellness
      if (hotel_wellness_bool_count > 0) {
        hotel_wellness_percent =
          (hotel_wellness_bool_true_count / hotel_wellness_bool_count).toFixed(
            2
          ) * 100;
      } else hotel_wellness_percent = null;

      location.update_info.hotel_update_info = {
        hotel_vacancies_bool_percent_day,
        hotel_vacancies_bool_percent_hour,
        hotel_wifi_percent,
        hotel_breakfast_percent,
        hotel_pool_percent,
        hotel_air_percent,
        hotel_bar_percent,
        hotel_pets_percent,
        hotel_wellness_percent,
      };

      // Update location document
      Location.findOneAndUpdate(
        { _id: location._id },
        {
          $set: {
            update_info: location.update_info,
          },
        },
        { new: true },

        (err, doc) => {
          if (err) {
            console.log(err);
          }
          // console.log(doc);
        }
      );
      return location;
    }
  );
  return location;
}

// Music Venue Update Processing
async function processMusicUpdate(location) {
  location = await LocationUpdate.find({ locationID: location._id }).then(
    (updates) => {
      var ONE_HOUR = 60 * 60 * 1000; /* ms */
      var ONE_DAY = 24 * 60 * 60 * 1000;

      // performances
      let music_performances = [];

      // day
      let music_18_count_day = 0;
      let music_18_true_count_day = 0;
      let music_21_count_day = 0;
      let music_21_true_count_day = 0;
      let music_alcohol_count_day = 0;
      let music_alcohol_true_count_day = 0;

      // hour

      // any time
      let music_18_count = 0;
      let music_18_true_count = 0;
      let music_21_count = 0;
      let music_21_true_count = 0;
      let music_alcohol_count = 0;
      let music_alcohol_true_count = 0;
      let music_atm_count = 0;
      let music_atm_true_count = 0;

      updates.forEach((update) => {
        // if the user has added a performance
        if (update.music_update.music_performance_bool) {
          if (update.music_update.music_performer_name != null) {
            if (
              new Date() - update.music_update.music_performance_date <
              ONE_DAY
            ) {
              //console.log(update.music_update.music_performer_name);
              let obj = {
                music_performer_name: update.music_update.music_performer_name,
                music_performance_date:
                  update.music_update.music_performance_date,
              };
              //console.log(obj);
              music_performances.push(obj);
            }
          }
        }

        var updateDate = new Date(update.date);
        // if within 24 hours
        if (new Date() - updateDate < ONE_DAY) {
          //music_18_bool
          if (update.music_update.music_18_bool != null) {
            music_18_count_day++;
            if (update.music_update.music_18_bool == true) {
              music_18_true_count_day++;
            }
          }
          //music_21_bool
          if (update.music_update.music_21_bool != null) {
            music_21_count_day++;
            if (update.music_update.music_21_bool == true) {
              music_21_true_count_day++;
            }
          }
          //music_alcohol_bool
          if (update.music_update.music_alcohol_bool != null) {
            music_alcohol_count_day++;
            if (update.music_update.music_alcohol_bool == true) {
              music_alcohol_true_count_day++;
            }
          }
        }
        // if within 1 hour
        if (new Date() - updateDate < ONE_HOUR) {
        }
        // regardless of time (all time)
        //music_18_bool
        if (update.music_update.music_18_bool != null) {
          music_18_count++;
          if (update.music_update.music_18_bool == true) {
            music_18_true_count++;
          }
        }
        //music_21_bool
        if (update.music_update.music_21_bool != null) {
          music_21_count++;
          if (update.music_update.music_21_bool == true) {
            music_21_true_count++;
          }
        }
        //music_alcohol_bool
        if (update.music_update.music_alcohol_bool != null) {
          music_alcohol_count++;
          if (update.music_update.music_alcohol_bool == true) {
            music_alcohol_true_count++;
          }
        }
        //music_atm_bool
        if (update.music_update.music_atm_bool != null) {
          music_atm_count++;
          if (update.music_update.music_atm_bool == true) {
            music_atm_true_count++;
          }
        }
      });

      // find average
      // day
      if (music_18_count_day > 0) {
        music_18_percent_day =
          (music_18_true_count_day / music_18_count_day).toFixed(2) * 100;
      } else music_18_percent_day = null;

      if (music_21_count_day > 0) {
        music_21_percent_day =
          (music_21_true_count_day / music_21_count_day).toFixed(2) * 100;
      } else music_21_percent_day = null;

      if (music_alcohol_count_day > 0) {
        music_alcohol_percent_day =
          (music_alcohol_true_count_day / music_alcohol_count_day).toFixed(2) *
          100;
      } else music_alcohol_percent_day = null;

      // hour

      // of all time
      if (music_18_count > 0) {
        music_18_percent =
          (music_18_true_count / music_18_count).toFixed(2) * 100;
      } else music_18_percent = null;

      if (music_21_count > 0) {
        music_21_percent =
          (music_21_true_count / music_21_count).toFixed(2) * 100;
      } else music_21_percent = null;

      if (music_alcohol_count > 0) {
        music_alcohol_percent =
          (music_alcohol_true_count / music_alcohol_count).toFixed(2) * 100;
      } else music_alcohol_percent = null;

      if (music_atm_count > 0) {
        music_atm_percent =
          (music_atm_true_count / music_atm_count).toFixed(2) * 100;
      } else music_atm_percent = null;

      location.update_info.music_update_info = {
        music_18_percent_day,
        music_18_percent,
        music_21_percent_day,
        music_21_percent,
        music_alcohol_percent_day,
        music_alcohol_percent,
        music_atm_percent,
        music_performances,
      };

      console.log(music_performances);

      // Update location document
      Location.findOneAndUpdate(
        { _id: location._id },
        {
          $set: {
            update_info: location.update_info,
          },
        },
        { new: true },

        (err, doc) => {
          if (err) {
            console.log(err);
          }
          // console.log(doc);
        }
      );
      return location;
    }
  );
  return location;
}

// Bar Update Proccessing
function processBarUpdate(location) {
  LocationUpdate.find({ locationID: location._id }).then((updates) => {
    var ONE_HOUR = 60 * 60 * 1000; /* ms */
    var ONE_DAY = 24 * 60 * 60 * 1000;

    let bar_cover_charge_sum = 0.0;
    let bar_cover_charge_count = 0;
    let bar_specials_list = [];
    let bar_wait_sum = 0;
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
    updates.forEach((update) => {
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
          bar_wait_sum += update.bar_update.bar_wait;
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
    if (bar_cover_charge_count != 0) {
      bar_cover_charge_average = (
        bar_cover_charge_sum / bar_cover_charge_count
      ).toFixed(0);
    } else {
      bar_cover_charge_average = null;
    }
    if (bar_wait_count != 0) {
      bar_wait_average = bar_wait_sum / bar_wait_count;
      bar_wait_average = bar_wait_average.toFixed(0);
    } else {
      bar_wait_average = null;
    }
    if (bar_cover_bool_count != 0) {
      bar_cover_charge_percent =
        bar_cover_bool_true_count / bar_cover_bool_count;
      bar_cover_charge_percent = bar_cover_charge_percent.toFixed(2) * 100;
    } else {
      bar_cover_charge_percent = null;
    }

    //console.log(bar_wait_average);

    let bar_styles_list = [
      {
        style: "College Bar",
        percent: parseFloat(collegeBar) / bar_styles_count,
      },
      { style: "Sports Bar", percent: sportsBar / bar_styles_count },
      { style: "Dive Bar", percent: diveBar / bar_styles_count },
      { style: "Cigar Bar", percent: cigarBar / bar_styles_count },
      { style: "Wine Bar", percent: wineBar / bar_styles_count },
      { style: "Cocktail Bar", percent: cocktailBar / bar_styles_count },
      { style: "Irish Pub", percent: irishPub / bar_styles_count },
    ];

    location.update_info.bar_update_info = {
      bar_cover_charge_average,
      bar_cover_charge_percent,
      bar_specials_list,
      bar_wait_average,
      bar_styles_list,
    };

    // Update location document
    Location.findOneAndUpdate(
      { _id: location._id },
      {
        $set: {
          update_info: location.update_info,
        },
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
  return location;
}

function processGroceryUpdate(location) {
  //console.log(location);
  LocationUpdate.find({ locationID: location._id }).then(
    (updates) => {
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

      updates.forEach((update) => {
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
      if (grocery_water_bool_count_day > 0) {
        grocery_water_percent_day =
          (
            grocery_water_bool_true_count_day / grocery_water_bool_count_day
          ).toFixed(2) * 100;
      } else grocery_water_percent_day = null;
      // console.log(grocery_water_percent_day);
      // console.log(grocery_water_bool_true_count_day);

      if (grocery_perishable_bool_count_day > 0) {
        grocery_perishable_percent_day =
          (
            grocery_perishable_bool_true_count_day /
            grocery_perishable_bool_count_day
          ).toFixed(2) * 100;
      } else grocery_perishable_percent_day = null;

      if (grocery_non_perishable_bool_count_day > 0) {
        grocery_non_perishable_percent_day =
          (
            grocery_non_perishable_bool_true_count_day /
            grocery_non_perishable_bool_count_day
          ).toFixed(2) * 100;
      } else grocery_non_perishable_percent_day = null;

      if (grocery_toilet_paper_bool_count_day > 0) {
        grocery_toilet_paper_percent_day =
          (
            grocery_toilet_paper_bool_true_count_day /
            grocery_toilet_paper_bool_count_day
          ).toFixed(2) * 100;
      } else grocery_toilet_paper_percent_day = null;

      if (grocery_disinfectants_bool_count_day > 0) {
        grocery_disinfectants_percent_day =
          (
            grocery_disinfectants_bool_true_count_day /
            grocery_disinfectants_bool_count_day
          ).toFixed(2) * 100;
      } else grocery_disinfectants_percent_day = null;

      if (grocery_feminine_bool_count_day > 0) {
        grocery_feminine_percent_day =
          (
            grocery_feminine_bool_true_count_day /
            grocery_feminine_bool_count_day
          ).toFixed(2) * 100;
      } else grocery_feminine_percent_day = null;

      // hour
      if (grocery_water_bool_count_hour > 0) {
        grocery_water_percent_hour =
          (
            grocery_water_bool_true_count_hour / grocery_water_bool_count_hour
          ).toFixed(2) * 100;
      } else grocery_water_percent_hour = null;

      if (grocery_perishable_bool_count_hour > 0) {
        grocery_perishable_percent_hour =
          (
            grocery_perishable_bool_true_count_hour /
            grocery_perishable_bool_count_hour
          ).toFixed(2) * 100;
      } else grocery_perishable_percent_hour = null;

      if (grocery_non_perishable_bool_count_hour > 0) {
        grocery_non_perishable_percent_hour =
          (
            grocery_non_perishable_bool_true_count_hour /
            grocery_non_perishable_bool_count_hour
          ).toFixed(2) * 100;
      } else grocery_non_perishable_percent_hour = null;

      if (grocery_toilet_paper_bool_count_hour > 0) {
        grocery_toilet_paper_percent_hour =
          (
            grocery_toilet_paper_bool_true_count_hour /
            grocery_toilet_paper_bool_count_hour
          ).toFixed(2) * 100;
      } else grocery_toilet_paper_percent_hour = null;

      if (grocery_disinfectants_bool_count_hour > 0) {
        grocery_disinfectants_percent_hour =
          (
            grocery_disinfectants_bool_true_count_hour /
            grocery_disinfectants_bool_count_hour
          ).toFixed(2) * 100;
      } else grocery_disinfectants_percent_hour = null;

      if (grocery_feminine_bool_count_hour > 0) {
        grocery_feminine_percent_hour =
          (
            grocery_feminine_bool_true_count_hour /
            grocery_feminine_bool_count_hour
          ).toFixed(2) * 100;
      } else grocery_feminine_percent_hour = null;

      location.update_info.grocery_update_info = {
        grocery_water_percent_day,
        grocery_water_percent_hour,
        grocery_perishable_percent_day,
        grocery_perishable_percent_hour,
        grocery_non_perishable_percent_day,
        grocery_non_perishable_percent_hour,
        grocery_toilet_paper_percent_day,
        grocery_toilet_paper_percent_hour,
        grocery_disinfectants_percent_day,
        grocery_disinfectants_percent_hour,
        grocery_feminine_percent_day,
        grocery_feminine_percent_hour,
      };

      // Update location document
      Location.findOneAndUpdate(
        { _id: location._id },
        {
          $set: {
            update_info: location.update_info,
          },
        },
        { new: true },
        (err, doc) => {
          if (err) {
            console.log(err);
          }
          //console.log(doc);
        }
      );
    },
    (err, doc) => {
      if (err) {
        console.log(err);
      }
      //console.log(doc);
    }
  );
  return location;
}
