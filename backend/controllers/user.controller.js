const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (number) => {
  return jwt.sign({ number }, process.env.SECRET, { expiresIn: "3d" });
};

// LOGIN
const loginUser = async (req, res) => {
  const { number, password } = req.body;
  try {
    const user = await User.login(number, password);
    const token = createToken(number);
    res.status(200).json({ username:user.username, number, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// SIGNUP
const signupUser = async (req, res) => {
  const { username, email, number, password } = req.body;
  try {
    const user = await User.signup(username, email, number, password);
    const token = createToken(number);
    res.status(200).json({ username, number, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
