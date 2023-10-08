const express = require("express");
const app = express();
const userRoutes = require("./routes/user.route");
const bookingRoutes = require("./routes/booking.route");
const cors = require("cors");
var corsOptions = {
  origin: "*",
  OptionsSuccessStatus: 200,
};
const mongoose = require("mongoose");

app.use(cors(corsOptions));
app.use(express.json());

app.use("/bookings", bookingRoutes);
app.use("/user", userRoutes);

mongoose
  .connect("mongodb://localhost:1000/turfs")
  .then(() => console.log("db connected"));

app.listen(3000, () => console.log("server running"));
