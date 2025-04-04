
const express = require("express");
const Patient = require("../models/Patient");
const { authenticateAdmin } = require("../middleware/auth");
const Caregiver = require("../models/Caregiver");

const router = express.Router();

//  Fetch pending & approved patients
//  Fetch pending & approved patients (Admins only)
router.get("/patients", authenticateAdmin, async (req, res) => {
  try {
    console.log("Admin Request Received");
    console.log("Authorization Header:", req.header("Authorization")); 

    const pending = await Patient.find({ isApproved: false });
    // const approved = await Patient.find({ isApproved: true });
    const approved = await Patient.find({ isApproved: true }).populate("assignedCaregiver", "name");

    res.json({ pending, approved });
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
router.put("/approve-patient/:id", authenticateAdmin, async (req, res) => {
  try {
    console.log("Approve Request Received for ID:", req.params.id); //  Debugging

    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );

    if (!patient) {
      console.log(" Patient not found");
      return res.status(404).json({ message: "Patient not found" });
    }

    console.log("Approved Patient:", patient); //  Debugging output

    res.json({ message: "Patient approved successfully!", patient });
  } catch (error) {
    console.error(" Error approving patient:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
router.delete("/delete-patient/:id", authenticateAdmin, async (req, res) => {
  try {
    console.log(" Deleting Patient ID:", req.params.id); //  Debugging output

    const patient = await Patient.findByIdAndDelete(req.params.id);

    if (!patient) {
      console.log(" Patient not found");
      return res.status(404).json({ message: "Patient not found" });
    }

    console.log(" Patient Deleted:", patient);
    res.json({ message: "Patient deleted successfully!" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// backend/routes/adminRoutes.js
router.post("/assign-caregiver", authenticateAdmin, async (req, res) => {
  const { patientId, caregiverId } = req.body;

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    patient.assignedCaregiver = caregiverId;
    await patient.save();

    res.json({ message: "Caregiver assigned successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Assignment failed." });
  }
});

// Get all approved caregivers
router.get("/caregivers", authenticateAdmin, async (req, res) => {
  try {
    const caregivers = await Caregiver.find({ isApproved: true }); // Make sure this matches your schema
    
    res.json({ approved: caregivers });
  } catch (error) {
    console.error("Error fetching caregivers:", error);
    res.status(500).json({ message: "Failed to load caregivers" });
  }
});


module.exports = router;
