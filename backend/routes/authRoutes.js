const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Patient = require("../models/Patient");  
const Caregiver = require("../models/Caregiver");  

const { authenticateUser } = require("../middleware/auth");
const router = express.Router();



router.post("/change-password", authenticateUser, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { email, userType } = req.user; 

    console.log("Change Password Request for:", email, "User Type:", userType);

    let user;
    
    // ✅ Fetch user from the `Users` table for authentication
    const userAuth = await User.findOne({ email });

    if (!userAuth) {
      console.log("User not found in Users table.");
      return res.status(404).json({ message: "User not found." });
    }

    console.log("User Data from Users Table:", userAuth);

    if (!userAuth.password) {
      console.log("Error: User password is undefined.");
      return res.status(400).json({ message: "User password not found in database." });
    }

    // ✅ Check if old password is correct
    const isMatch = await bcrypt.compare(oldPassword, userAuth.password);
    if (!isMatch) {
      console.log("Incorrect current password.");
      return res.status(400).json({ message: "Incorrect current password." });
    }

    // ✅ Fetch user profile based on `userType`
    if (userType === "Patient") {
      user = await Patient.findOne({ email });
    } else if (userType === "Caregiver") {
      user = await Caregiver.findOne({ email });
    } else {
      console.log("Unknown user type.");
      return res.status(400).json({ message: "Invalid user type." });
    }

    if (!user) {
      console.log("User profile not found in database.");
      return res.status(404).json({ message: "User profile not found." });
    }

    // ✅ Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    userAuth.password = hashedPassword; // ✅ Update password in `Users` table
    await userAuth.save();

    console.log("Password changed successfully for:", email);
    res.json({ message: "Password changed successfully!" });
  } catch (error) {
    console.error("Error in change-password route:", error);
    res.status(500).json({ message: "Error changing password.", error });
  }
});





// ✅ Route: Send password reset link (Only for Patients & Caregivers)
router.post("/forgot-password", async (req, res) => {
  try {
    const { email, role } = req.body;

    let user;
    if (role === "patient") {
      user = await Patient.findOne({ email });
    } else if (role === "caregiver") {
      user = await Caregiver.findOne({ email });
    } else {
      return res.status(403).json({ message: "Admins cannot reset passwords here." });
    }

    if (!user) {
      return res.status(404).json({ message: "Email not found." });
    }

    // Generate a reset token
    const token = jwt.sign({ email, role }, SECRET_KEY, { expiresIn: "10m" });

    // Simulate sending an email (replace with actual email logic)
    console.log(`Password reset link: http://localhost:3000/reset-password?token=${token}`);

    res.json({ message: "Password reset link sent to your email." });
  } catch (error) {
    res.status(500).json({ message: "Error sending reset link.", error });
  }
});

// ✅ Route: Reset password (Only for Patients & Caregivers)
router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Verify token
    const decoded = jwt.verify(token, SECRET_KEY);
    const { email, role } = decoded;

    let user;
    if (role === "patient") {
      user = await Patient.findOne({ email });
    } else if (role === "caregiver") {
      user = await Caregiver.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successfully." });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token.", error });
  }
});







// SIGNUP
router.post("/signup", async (req, res) => {
 //-------------------------- const { name, email, password, userType } = req.body;
 const { name, email, password, userType  } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Ensure userType is either 'Admin' or 'Caregiver', default to 'Caregiver'
    const role = userType || "Caregiver"; // Default to "Caregiver" if no role is provided

    // Create a new user with the provided userType (Admin or Caregiver)
    // ----------------const newUser = new User({ name, email, password: hashedPassword, userType: role });
    const newUser = new User({ name, email, password: hashedPassword,userType: role});

    await newUser.save();

    // Respond with success message
    //---------------------- res.status(201).json({ message: "User registered successfully", userType: role });
    res.status(201).json({ message: "User registered successfully"});
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
