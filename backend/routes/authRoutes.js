const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, password, userType } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Ensure userType is either 'Admin' or 'Caregiver', default to 'Caregiver'
    const role = userType || "Caregiver"; // Default to "Caregiver" if no role is provided

    // Create a new user with the provided userType (Admin or Caregiver)
    const newUser = new User({ name, email, password: hashedPassword, userType: role });
    await newUser.save();

    // Respond with success message
    res.status(201).json({ message: "User registered successfully", userType: role });
  } catch (error) {
    console.error(error); // Log error to server console for debugging
    res.status(500).json({ message: "Server Error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Create JWT token with userType included
    const token = jwt.sign({ id: user._id, email: user.email, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
