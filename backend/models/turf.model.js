const mongoose = require('mongoose');

const turfSchema = new mongoose.Schema({
  turfName: {
    type: String,
    required: true,
  },
  slots: {
    type: [String],
    required: true,
  },
  dayTimes: {
    type: [String], 
    required: true,
  },
  nightTimes: {
    type: [String], 
    required: true,
  },
});

const Turf = mongoose.model('Turf', turfSchema);

module.exports = Turf;
