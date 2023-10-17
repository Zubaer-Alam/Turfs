const pool = require("../db");

const createBooking = async (req, res) => {
  const { userNumber, date, turfName, slots, timeSlot } = req.body;
  console.log(req.body);

  try {
    const checkQuery =
      "SELECT COUNT(*) AS count FROM Bookings WHERE turf_name = ? AND slots = ? AND time_slot = ? AND booking_date = ?";
    const [existingBookings] = await pool.query(checkQuery, [
      turfName,
      slots,
      timeSlot,
      date,
    ]);

    if (existingBookings[0].count) {
      res.status(400).json({
        error: "Booking with the same turf, slot, and time already exists",
      });
    } else {
      const insertQuery =
        "INSERT INTO Bookings (user_number, booking_date, turf_name, slots, time_slot) VALUES (?, ?, ?, ?, ?)";
      const result = await pool.query(insertQuery, [
        userNumber,
        date,
        turfName,
        slots,
        timeSlot,
      ]);

      if (result[0].affectedRows) {
        res.status(201).json({ message: "Booking created successfully" });
      } else {
        res.status(500).json({ error: "Failed to create booking" });
      }
    }
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Failed to create booking (catch)" });
  }
};

const getBookings = async(req,res) =>{
    
}
module.exports = { createBooking };
