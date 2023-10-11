const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  turfName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  dayTime: {
    type: String
  },
  nightTime:{
    type:String,
  },
  number: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
