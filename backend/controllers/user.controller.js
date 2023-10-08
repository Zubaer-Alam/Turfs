const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// LOGIN
const loginUser = async (req, res) => {
  const { number, password } = req.body;
  try {
    const user = await User.login(number, password);
    const token = createToken(user._id);
    res.status(200).json({ name: user.username, number, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// SIGNUP
const signupUser = async (req, res) => {
  const { username, email, number, password } = req.body;
  try {
    const user = await User.signup(username, email, number, password);
    const token = createToken(user._id);
    res.status(200).json({ username, number, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
