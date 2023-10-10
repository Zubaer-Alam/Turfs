const Turf = require("../models/turf.model");

const createTurf = async (req, res) => {
  const turfData = req.body;
  const existingTurf = await Turf.findOne({ turfName: turfData.turfName });

  if (existingTurf) {
    return res.status(400).json({ error: "This Turf exists" });
  }
  try {
    const turf = await Turf.create(turfData);
    res.status(201).json(turf);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getTurfNames = async (req, res) => {
  try {
    const turfNames = await Turf.distinct("turfName");
    res.status(200).json(turfNames);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSlotNames = async (req, res) => {
  try {
    const turfName = req.query.turfName;
    const turf = await Turf.findOne({ turfName });

    if (!turf) {
      return res.status(404).json({ error: "Turf not found" });
    }
    const slotNames = turf.slots;
    res.status(200).json(slotNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTurfs = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;
  const skip = (page - 1) * limit;
  try {
    const totalTurfs = await Turf.countDocuments();
    const turfName = req.query.turfName;
    const turfs = await Turf.find({ turfName: turfName })
      .skip(skip)
      .limit(limit);
    if (turfs.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for the specified user." });
    }
    res.status(200).json({
      totalPages: Math.ceil(totalTurfs / limit),
      currentPage: page,
      turfs,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createTurf, getTurfs, getTurfNames, getSlotNames };
