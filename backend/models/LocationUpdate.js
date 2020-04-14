const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LocationUpdateSchema = new Schema({
  locationID: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  // bar updates
  bar_update: {
    bar_wait: {
      type: String,
    },
    bar_cover_bool: {
      type: Boolean,
    },
    bar_cover_charge: {
      type: String,
    },
    bar_specials: {
      type: String,
    },
    bar_styles: {
      type: Array,
    },
  },
  // grocery updates
  grocery_update: {
    grocery_water_bool: {
      type: Boolean,
    },
    grocery_perishable_bool: {
      type: Boolean,
    },
    grocery_non_perishable_bool: {
      type: Boolean,
    },
    grocery_toilet_paper_bool: {
      type: Boolean,
    },
    grocery_disinfectants_bool: {
      type: Boolean,
    },
    grocery_feminine_bool: {
      type: Boolean,
    },
  },
  // gas update
  gas_update: {
    gas_regular_bool: {
      type: Boolean,
    },
    gas_plus_bool: {
      type: Boolean,
    },
    gas_premium_bool: {
      type: Boolean,
    },
    gas_diesel_bool: {
      type: Boolean,
    },
    gas_air_bool: {
      type: Boolean,
    },
  },
  // pharmacy update
  pharmacy_update: {
    pharmacy_prescription_fill_bool: {
      type: Boolean,
    },
    pharmacy_vaccinations_bool: {
      type: Boolean,
    },
    pharmacy_drive_through_bool: {
      type: Boolean,
    },
    pharmacy_counseling_bool: {
      type: Boolean,
    },
  },
  // restaurant update
  restaurant_update: {
    restaurant_wait: {
      type: Number,
    },
    restaurant_specials: {
      type: String,
    },
    restaurant_inside_seating_bool: {
      type: Boolean,
    },
    restaurant_outside_seating_bool: {
      type: Boolean,
    },
    restaurant_take_out_bool: {
      type: Boolean,
    },
    restaurant_curb_side_bool: {
      type: Boolean,
    },
  },
  // bank update
  bank_update: {
    bank_drive_through: {
      type: Boolean,
    },
    bank_atm: {
      type: Boolean,
    },
  },
  // cafe update
  cafe_update: {
    cafe_tea_bool: {
      type: Boolean,
    },
    cafe_coffee_bool: {
      type: Boolean,
    },
    cafe_uncaffeinated_bool: {
      type: Boolean,
    },
    cafe_breakfast_bool: {
      type: Boolean,
    },
    cafe_lunch_bool: {
      type: Boolean,
    },
    cafe_inside_bool: {
      type: Boolean,
    },
    cafe_outside_bool: {
      type: Boolean,
    },
    cafe_drive_through_bool: {
      type: Boolean,
    },
    cafe_online_bool: {
      type: Boolean,
    },
  },
  // hotel update
  hotel_update: {
    hotel_vacancies_bool: {
      type: Boolean,
    },
    hotel_wifi_bool: {
      type: Boolean,
    },
    hotel_breakfast_bool: {
      type: Boolean,
    },
    hotel_pool_bool: {
      type: Boolean,
    },
    hotel_air_bool: {
      type: Boolean,
    },
    hotel_bar_bool: {
      type: Boolean,
    },
    hotel_pets_bool: {
      type: Boolean,
    },
    hotel_wellness_bool: {
      type: Boolean,
    },
  },
  // music venue info
  music_update: {
    music_performance_bool: {
      type: Boolean,
    },
    music_performer_name: {
      type: String,
    },
    music_performance_date: {
      type: Date,
    },
    music_18_bool: {
      type: Boolean,
    },
    music_21_bool: {
      type: Boolean,
    },
    music_alcohol_bool: {
      type: Boolean,
    },
    music_atm_bool: {
      type: Boolean,
    },
  },
  // post office info
  post_update: {
    post_parcel_bool: {
      type: Boolean,
    },
    post_outside_bool: {
      type: Boolean,
    },
    post_po_bool: {
      type: Boolean,
    },
  },
  // basic location info
  location_occupancy: {
    type: String,
  },
  location_rating: {
    type: Number,
  },
  location_open_bool: {
    type: Boolean,
  },
});

module.exports = LocationUpdate = mongoose.model(
  "locationUpdate",
  LocationUpdateSchema
);
