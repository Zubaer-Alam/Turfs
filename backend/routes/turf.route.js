const express = require("express");
const router = express.Router();
const { createTurf, getTurfs } = require("../controllers/turf.controller");
const requireAuth = require("../middleware/requireAuth");

router.post("/", createTurf);

router.get("/", getTurfs);

module.exports = router;
