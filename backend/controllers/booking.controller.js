const Booking = require("../models/booking.model");

const createBooking = async (req, res) => {
  const { turfName, date, time } = req.body;

  // add doc to db
  try {
    const booking = await Booking.create({ turfName, date, time });
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createBooking,
};
