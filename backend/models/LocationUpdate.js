const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LocationUpdateSchema = new Schema({
  locationID: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  // bar updates
  bar_update: {
    bar_wait: {
      type: String
    },
    bar_cover_bool: {
      type: Boolean
    },
    bar_cover_charge: {
      type: String
    },
    bar_specials: {
      type: String
    },
    bar_styles: {
      type: Array
    }
  },
  // grocery updates
  grocery_update: {
    grocery_water_bool: {
      type: Boolean
    },
    grocery_perishable_bool: {
      type: Boolean
    },
    grocery_non_perishable_bool: {
      type: Boolean
    },
    grocery_toilet_paper_bool: {
      type: Boolean
    },
    grocery_disinfectants_bool: {
      type: Boolean
    },
    grocery_feminine_bool: {
      type: Boolean
    }
  },
  // basic location info
  location_occupancy: {
    type: String
  },
  location_rating: {
    type: Number
  },
  location_open_bool: {
    type: Boolean
  }
});

module.exports = LocationUpdate = mongoose.model(
  "locationUpdate",
  LocationUpdateSchema
);
