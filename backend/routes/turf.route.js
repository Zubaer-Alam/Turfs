const express = require("express");
const router = express.Router();
const {
  createTurf,
  getTurfs,
  getTurfNames,
  getSlotNames,
  getTimeSlots,
} = require("../controllers/turf.controller");
const requireAuth = require("../middleware/requireAuth");

router.post("/", requireAuth, createTurf);

router.get("/", requireAuth, getTurfs);

router.get("/turfNames", getTurfNames);

router.get("/slots", getSlotNames);

router.get("/times", getTimeSlots);

module.exports = router;
