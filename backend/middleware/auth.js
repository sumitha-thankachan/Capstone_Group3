// middleware/auth.js
const jwt = require("jsonwebtoken");

const authenticateAdmin = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "Admin") {
      return res.status(403).json({ message: "Access forbidden: Admins only" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = { authenticateAdmin };
