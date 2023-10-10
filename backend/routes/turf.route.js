const express = require("express");
const router = express.Router();
const {
  createTurf,
  getTurfs,
  getTurfNames,
  getSlotNames,
} = require("../controllers/turf.controller");
const requireAuth = require("../middleware/requireAuth");

router.post("/", createTurf);

router.get("/", getTurfs);

router.get("/turfNames", getTurfNames);

router.get("/slots", getSlotNames);

module.exports = router;
