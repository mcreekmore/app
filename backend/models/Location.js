const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LocationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: null,
  },
  types: {
    type: Array,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lon: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: false,
    default: null,
  },
  phone: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: false,
    default: null,
  },
  approved: {
    type: Boolean,
    required: true,
    default: true, // change in prod!
  },

  update_info: {
    location_update_info: {
      open_hour_percent: {
        type: Number,
        default: null,
      },
      open_day_percent: {
        type: Number,
        default: null,
      },
      update_count_hour: {
        type: Number,
        default: null,
      },
      update_count_day: {
        type: Number,
        default: null,
      },
    },
    restaurant_update_info: {
      restaurant_inside_seating_percent_day: {
        type: Number,
        default: null,
      },
      restaurant_outside_seating_percent_day: {
        type: Number,
        default: null,
      },
      restaurant_take_out_percent_day: {
        type: Number,
        default: null,
      },
      restaurant_curb_side_percent_day: {
        type: Number,
        default: null,
      },
      restaurant_inside_seating_percent_hour: {
        type: Number,
        default: null,
      },
      restaurant_outside_seating_percent_hour: {
        type: Number,
        default: null,
      },
      restaurant_take_out_percent_hour: {
        type: Number,
        default: null,
      },
      restaurant_curb_side_percent_hour: {
        type: Number,
        default: null,
      },
      restaurant_wait_average: {
        type: Number,
        default: null,
      },
    },
    gas_update_info: {
      gas_regular_percent_day: {
        type: Number,
        default: null,
      },
      gas_plus_percent_day: {
        type: Number,
        default: null,
      },
      gas_premium_percent_day: {
        type: Number,
        default: null,
      },
      gas_diesel_percent_day: {
        type: Number,
        default: null,
      },
      gas_regular_percent_hour: {
        type: Number,
        default: null,
      },
      gas_plus_percent_hour: {
        type: Number,
        default: null,
      },
      gas_premium_percent_hour: {
        type: Number,
        default: null,
      },
      gas_diesel_percent_hour: {
        type: Number,
        default: null,
      },
      gas_air_percent: {
        type: Number,
        default: null,
      },
    },
    bar_update_info: {
      bar_cover_charge_average: {
        type: String,
        default: null,
      },
      bar_cover_charge_percent: {
        type: String,
        default: null,
      },
      bar_specials_list: {
        type: Array,
        default: null,
      },
      bar_wait_average: {
        type: String,
        default: null,
      },
      bar_styles_list: [
        {
          style: {
            type: String,
            default: null,
          },
          percent: {
            type: String,
            default: null,
          },
        },
      ],
    },
    pharmacy_update_info: {
      pharmacy_prescription_fill_percent_day: {
        type: Number,
        default: null,
      },
      pharmacy_vaccinations_percent_day: {
        type: Number,
        default: null,
      },
      pharmacy_counseling_percent_day: {
        type: Number,
        default: null,
      },
      pharmacy_prescription_fill_percent_hour: {
        type: Number,
        default: null,
      },
      pharmacy_vaccinations_percent_hour: {
        type: Number,
        default: null,
      },
      pharmacy_counseling_percent_hour: {
        type: Number,
        default: null,
      },
      pharmacy_drive_through_percent: {
        type: Number,
        default: null,
      },
    },
    bank_update_info: {
      bank_drive_through_percent_day: {
        type: Number,
        default: null,
      },
      bank_drive_through_percent_hour: {
        type: Number,
        default: null,
      },
      bank_atm_percent_day: {
        type: Number,
        default: null,
      },
      bank_atm_percent_hour: {
        type: Number,
        default: null,
      },
    },
    cafe_update_info: {
      cafe_tea_percent: {
        type: Number,
        default: null,
      },
      cafe_tea_percent_day: {
        type: Number,
        default: null,
      },
      cafe_coffee_percent: {
        type: Number,
        default: null,
      },
      cafe_coffee_percent_day: {
        type: Number,
        default: null,
      },
      cafe_uncaffeinated_percent: {
        type: Number,
        default: null,
      },
      cafe_uncaffeinated_percent_day: {
        type: Number,
        default: null,
      },
      cafe_breakfast_percent: {
        type: Number,
        default: null,
      },
      cafe_breakfast_percent_day: {
        type: Number,
        default: null,
      },
      cafe_lunch_percent: {
        type: Number,
        default: null,
      },
      cafe_lunch_percent_day: {
        type: Number,
        default: null,
      },
      cafe_inside_percent: {
        type: Number,
        default: null,
      },
      cafe_inside_percent_day: {
        type: Number,
        default: null,
      },
      cafe_outside_percent: {
        type: Number,
        default: null,
      },
      cafe_outside_percent_day: {
        type: Number,
        default: null,
      },
      cafe_drive_through_percent: {
        type: Number,
        default: null,
      },
      cafe_drive_through_percent_day: {
        type: Number,
        default: null,
      },
      cafe_online_percent: {
        type: Number,
        default: null,
      },
      cafe_online_percent_day: {
        type: Number,
        default: null,
      },
    },
    hotel_update_info: {
      hotel_vacancies_bool_percent_day: {
        type: Number,
        default: null,
      },
      hotel_vacancies_bool_percent_hour: {
        type: Number,
        default: null,
      },
      hotel_wifi_percent: {
        type: Number,
        default: null,
      },
      hotel_breakfast_percent: {
        type: Number,
        default: null,
      },
      hotel_pool_percent: {
        type: Number,
        default: null,
      },
      hotel_air_percent: {
        type: Number,
        default: null,
      },
      hotel_bar_percent: {
        type: Number,
        default: null,
      },
      hotel_pets_percent: {
        type: Number,
        default: null,
      },
      hotel_wellness_percent: {
        type: Number,
        default: null,
      },
    },
    music_update_info: {
      music_performances: [
        {
          music_performer_name: {
            type: String,
            default: null,
          },
          music_performance_date: {
            type: Date,
            default: null,
          },
        },
      ],
      music_18_percent_day: {
        type: Number,
        default: null,
      },
      music_18_percent: {
        type: Number,
        default: null,
      },
      music_21_percent_day: {
        type: Number,
        default: null,
      },
      music_21_percent: {
        type: Number,
        default: null,
      },
      music_alcohol_percent_day: {
        type: Number,
        default: null,
      },
      music_alcohol_percent: {
        type: Number,
        default: null,
      },
      music_atm_percent: {
        type: Number,
        default: null,
      },
    },
    post_update_info: {
      post_parcel_percent: {
        type: Number,
        default: null,
      },
      post_outside_percent: {
        type: Number,
        default: null,
      },
      post_po_percent: {
        type: Number,
        default: null,
      },
      post_parcel_percent_day: {
        type: Number,
        default: null,
      },
      post_outside_percent_day: {
        type: Number,
        default: null,
      },
      post_po_percent_day: {
        type: Number,
        default: null,
      },
    },
    grocery_update_info: {
      grocery_water_percent_day: {
        type: Number,
        default: null,
      },
      grocery_perishable_percent_day: {
        type: Number,
        default: null,
      },
      grocery_non_perishable_percent_day: {
        type: Number,
        default: null,
      },
      grocery_toilet_paper_percent_day: {
        type: Number,
        default: null,
      },
      grocery_disinfectants_percent_day: {
        type: Number,
        default: null,
      },
      grocery_feminine_percent_day: {
        type: Number,
        default: null,
      },
      grocery_water_percent_hour: {
        type: Number,
        default: null,
      },
      grocery_perishable_percent_hour: {
        type: Number,
        default: null,
      },
      grocery_non_perishable_percent_hour: {
        type: Number,
        default: null,
      },
      grocery_toilet_paper_percent_hour: {
        type: Number,
        default: null,
      },
      grocery_disinfectants_percent_hour: {
        type: Number,
        default: null,
      },
      grocery_feminine_percent_hour: {
        type: Number,
        default: null,
      },
    },
  },
});

module.exports = Location = mongoose.model("location", LocationSchema);
