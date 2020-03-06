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
  // basic location info
  location_occupancy: {
    type: String
  },
  location_rating: {
    type: Number
  }
});

module.exports = LocationUpdate = mongoose.model(
  "locationUpdate",
  LocationUpdateSchema
);
