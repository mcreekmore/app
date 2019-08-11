const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BadTokenSchema = new Schema({
  token: {
    type: String,
    required: true
  }
});

module.exports = BadToken = mongoose.model("bad token", BadTokenSchema);
