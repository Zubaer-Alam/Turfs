const pool = require('../db')
const bcrypt = require("bcrypt");
const validator = require("validator");

class User {
  //SIGNUP
  static async signup(username, email, number, password) {
    if (!validator.isEmail(email)) {
      throw new Error("Invalid Email");
    }
    if (!validator.isStrongPassword(password)) {
      throw new Error("Weak Password");
    }
    const connection = await pool.getConnection();
    try {
      const [existingUser] = await connection.execute(
        "SELECT * FROM users WHERE number = ?",
        [number]
      );
      if (existingUser.length > 0) {
        throw new Error("Number already in use");
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const [result] = await connection.execute(
        "INSERT INTO users (username, email, number, password) VALUES (?, ?, ?, ?)",
        [username, email, number, hashedPassword]
      );
      return result.insertId;
    } finally {
      connection.release();
    }
  }
  // LOGIN
  static async login(number, password) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute(
        "SELECT * FROM users WHERE number = ?",
        [number]
      );
      if (rows.length === 0) {
        throw new Error("Incorrect Number");
      }
      const user = rows[0];
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        throw new Error("Incorrect Password");
      }
      return user;
    } finally {
      connection.release();
    }
  } 
}

module.exports = User;
