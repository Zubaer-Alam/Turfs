const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBooking,
} = require("../controllers/booking.controller");
const requireAuth = require("../middleware/requireAuth");

router.post("/", requireAuth, createBooking);

router.get("/", getBooking);

module.exports = router;
