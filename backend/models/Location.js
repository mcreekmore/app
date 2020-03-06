const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LocationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  types: {
    type: Array,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lon: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: false
  },
  approved: {
    type: Boolean,
    required: true
  },
  update_info: {
    bar_update_info: {
      bar_cover_charge_average: {
        type: String
      },
      bar_cover_charge_percent: {
        type: String
      },
      bar_specials_list: {
        type: Array
      },
      bar_wait_average: {
        type: String
      },
      bar_styles_list: [
        {
          style: {
            type: String
          },
          percent: {
            type: String
          }
        }
      ]
    }
  }
});

module.exports = Location = mongoose.model("location", LocationSchema);
