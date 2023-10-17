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

module.exports = createTurf;
