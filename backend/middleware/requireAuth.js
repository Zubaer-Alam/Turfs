const jwt = require("jsonwebtoken");
const pool = require("../db");

//Find user by number
async function findUserByNumber(number) {
  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.execute(
      "SELECT number FROM users WHERE number = ?",
      [number]
    );

    if (rows.length > 0) {
      const userNumber = rows[0].number;
      return userNumber;
    } else {
      return null;
    }
  } finally {
    connection.release();
  }
}

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { number } = jwt.verify(token, process.env.SECRET);

    req.user = await findUserByNumber(number);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
