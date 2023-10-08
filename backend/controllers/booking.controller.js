const Booking = require("../models/booking.model");

const createBooking = async (req, res) => {
  const { turfName, date, time, email } = req.body;

  // add doc to db
  try {
    const booking = await Booking.create({ turfName, date, time, email });
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBooking = async (req, res) => {
  try {
    email = req.query.email;
    const bookings = await Booking.find({ email: email });

    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for the specified user." });
    }
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createBooking,
  getBooking,
};
