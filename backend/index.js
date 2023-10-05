const express = require("express");
const app = express();
const userRoutes = require("./routes/user.route");

const mongoose = require("mongoose");

app.use(express.json());

app.use("/user", userRoutes);

mongoose
  .connect("mongodb://localhost:1000/turfs")
  .then(() => console.log("db connected"));

app.listen(3000, () => console.log("server running"));