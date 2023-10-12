const express = require("express");
const app = express();
const userRoutes = require("./routes/user.route");
const bookingRoutes = require("./routes/booking.route");
const turfRoutes = require("./routes/turf.route");
const mysql = require("mysql2");
const cors = require("cors");
var corsOptions = {
  origin: "*",
  OptionsSuccessStatus: 200,
};

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "0000",
  database: "Turfs",
});

app.use(cors(corsOptions));
app.use(express.json());

app.use("/bookings", bookingRoutes);
app.use("/user", userRoutes);
app.use("/turfs", turfRoutes);

connection.connect((err) => {
  if (err) {
    console.error("Error:" + err.stack);
    return;
  }
  console.log("Connected as ID: " + connection.threadId);
});

app.listen(3000, () => console.log("server running"));
