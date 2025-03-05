// routes/adminRoutes.js
const express = require("express");
const { authenticateAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/admin-dashboard", authenticateAdmin, (req, res) => {
  res.send("Welcome Admin");
});

module.exports = router;
