const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  number: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

//Static signup
userSchema.statics.signup = async function (username, email, number, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid Email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Weak Password");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, email, number, password: hash });
  return user;
};

//static login method
userSchema.statics.login = async function (number, password) {
  const user = await this.findOne({ number });
  if (!user) {
    throw Error("Incorrect Email");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect Password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
