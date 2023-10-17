const pool = require("../db");

const createTurf = async (req, res) => {
  const { turfName, slots, dayTimes, nightTimes } = req.body;
  console.log(req.body);
  const hasDaySlots = slots.includes("day") ? 1 : 0;
  const hasNightSlots = slots.includes("night") ? 1 : 0;

  let turfId;

  const turfInsertQuery =
    "INSERT INTO Turf (turf_name, has_day_slots, has_night_slots) VALUES (?, ?, ?)";

  try {
    const result = await pool.query(turfInsertQuery, [
      turfName,
      hasDaySlots,
      hasNightSlots,
    ]);
    console.log("Turf data saved successfully");

    // Fetch the turfId from the database immediately after insertion
    const selectTurfIdQuery = "SELECT turf_id FROM Turf WHERE turf_name = ?";

    const [turfIdResult] = await pool.query(selectTurfIdQuery, [turfName]);

    if (turfIdResult.length > 0) {
      turfId = turfIdResult[0].turf_id;
    }
  } catch (err) {
    console.error("Failed to insert Turf data:", err);
    res.status(500).json({ error: "Failed to insert Turf data" });
    return;
  }

  // Insert DayTimes (if applicable)
  if (hasDaySlots) {
    const dayTimesData = dayTimes.map((timeRange) => {
      const [fromTime, toTime] = timeRange.split(" ");
      return [turfId, fromTime, toTime];
    });

    const dayTimesInsertQuery =
      "INSERT INTO DayTimes (turf_id, from_time, to_time) VALUES ?";

    try {
      await pool.query(dayTimesInsertQuery, [dayTimesData]);
      console.log("Day Time data saved successfully");
    } catch (err) {
      console.error("Failed to insert Day Time data:", err);
      res.status(500).json({ error: "Failed to insert Day Time data" });
      return;
    }
  }

  if (hasNightSlots) {
    const nightTimesData = nightTimes.map((timeRange) => {
      const [fromTime, toTime] = timeRange.split(" ");
      return [turfId, fromTime, toTime];
    });

    const nightTimesInsertQuery =
      "INSERT INTO NightTimes (turf_id, from_time, to_time) VALUES ?";

    try {
      await pool.query(nightTimesInsertQuery, [nightTimesData]);
      console.log("Night Time data saved successfully");
    } catch (err) {
      console.error("Failed to insert Night Time data:", err);
      res.status(500).json({ error: "Failed to insert Night Time data" });
      return;
    }
  }

  res.status(200).json({ message: "Turf data saved successfully" });
};

const getTurfNames = async (req, res) => {
  try {
    const selectTurfNamesQuery = "SELECT turf_name FROM Turf";
    const [turfNamesResult] = await pool.query(selectTurfNamesQuery);

    if (turfNamesResult.length > 0) {
      const turfNames = turfNamesResult.map((row) => row.turf_name);
      res.status(200).json({ turfNames });
    } else {
      res.status(200).json({ turfNames: [] });
    }
  } catch (err) {
    console.error("Failed to retrieve turf names:", err);
    res.status(500).json({ error: "Failed to retrieve turf names" });
  }
};

const getSlotNames = async (req, res) => {
  const selectedTurf = req.query.turfName;

  try {
    const selectSlotNamesQuery =
      "SELECT has_day_slots, has_night_slots FROM Turf WHERE turf_name = ?";
    const [slotNamesResult] = await pool.query(selectSlotNamesQuery, [
      selectedTurf,
    ]);
    if (slotNamesResult.length > 0) {
      const hasDaySlots = slotNamesResult[0].has_day_slots;
      const hasNightSlots = slotNamesResult[0].has_night_slots;
      const slotNames = [];

      hasDaySlots && slotNames.push("day");
      hasNightSlots && slotNames.push("night");

      res.status(200).json({ slotNames });
    } else {
      res.status(200).json({ slotNames: [] });
    }
  } catch (err) {
    console.error("Failed to retrieve slot names:", err);
    res.status(500).json({ error: "Failed to retrieve slot names" });
  }
};

const getTimeSlots = async (req, res) => {
  const selectedTurf = req.query.turfName;
  const selectedTime = req.query.time; // "day" or "night" or both

  try {
    let selectDayTimesQuery =
      "SELECT from_time, to_time FROM DayTimes WHERE turf_id = (SELECT turf_id FROM Turf WHERE turf_name = ?)";

    if (selectedTime === "day") {
      selectDayTimesQuery +=
        " AND TIME_TO_SEC(from_time) < TIME_TO_SEC('12:00:00')";
    } else if (selectedTime === "night") {
      selectDayTimesQuery +=
        " AND TIME_TO_SEC(from_time) >= TIME_TO_SEC('12:00:00')";
    }

    const [dayTimesResult] = await pool.query(selectDayTimesQuery, [
      selectedTurf,
    ]);

    if (dayTimesResult.length > 0) {
      const dayTimes = dayTimesResult.map(
        (row) => `${row.from_time} to ${row.to_time}`
      );
      res.status(200).json(dayTimes);
    } else {
      res.status(200).json([]);
    }
  } catch (err) {
    console.error("Failed to retrieve daytimes:", err);
    res.status(500).json({ error: "Failed to retrieve daytimes" });
  }
};

module.exports = { createTurf, getTurfNames, getSlotNames, getTimeSlots };
