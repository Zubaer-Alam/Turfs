const Booking = require("../models/booking.model");

const createBooking = async (req, res) => {
  const { turfName, date, time, number } = req.body;

  const existingBooking = await Booking.findOne({ turfName, date, time });

  if (existingBooking) {
    return res.status(400).json({ error: "This slot is booked" });
  }

  try {
    const booking = await Booking.create({ turfName, date, time, number });
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBooking = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit)||2;
  const skip = (page - 1) * limit;
  try {
    const totalBookings = await Booking.countDocuments();
    const number = req.query.number;
    const bookings = await Booking.find({ number: number })
      .skip(skip)
      .limit(limit);

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
