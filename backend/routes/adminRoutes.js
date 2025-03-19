// // routes/adminRoutes.js
// const express = require("express");
// const { authenticateAdmin } = require("../middleware/auth");

// const router = express.Router();

// router.get("/admin-dashboard", authenticateAdmin, (req, res) => {
//   res.send("Welcome Admin");
// });

// module.exports = router;
const express = require("express");
const Patient = require("../models/Patient");
const { authenticateAdmin } = require("../middleware/auth");

const router = express.Router();

// ✅ Fetch pending & approved patients
// ✅ Fetch pending & approved patients (Admins only)
router.get("/patients", authenticateAdmin, async (req, res) => {
  try {
    console.log("Admin Request Received"); // ✅ Debugging
    console.log("Authorization Header:", req.header("Authorization")); // ✅ Log Token

    const pending = await Patient.find({ isApproved: false });
    const approved = await Patient.find({ isApproved: true });

    res.json({ pending, approved });
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
router.put("/approve-patient/:id", authenticateAdmin, async (req, res) => {
  try {
    console.log("Approve Request Received for ID:", req.params.id); // ✅ Debugging

    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );

    if (!patient) {
      console.log("❌ Patient not found");
      return res.status(404).json({ message: "Patient not found" });
    }

    console.log("✅ Approved Patient:", patient); // ✅ Debugging output

    res.json({ message: "Patient approved successfully!", patient });
  } catch (error) {
    console.error("❌ Error approving patient:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
router.delete("/delete-patient/:id", authenticateAdmin, async (req, res) => {
  try {
    console.log("🗑️ Deleting Patient ID:", req.params.id); // ✅ Debugging output

    const patient = await Patient.findByIdAndDelete(req.params.id);

    if (!patient) {
      console.log("❌ Patient not found");
      return res.status(404).json({ message: "Patient not found" });
    }

    console.log("✅ Patient Deleted:", patient);
    res.json({ message: "Patient deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting patient:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



module.exports = router;
