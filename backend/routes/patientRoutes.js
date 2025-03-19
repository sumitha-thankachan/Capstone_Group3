const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const User = require('../models/User'); // Ensure the User model is correctly imported


// Route to register a patient
router.post('/register', async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json({ message: 'Patient registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// Route to get the total number of patients
router.get("/count", async (req, res) => {
  try {
    const count = await Patient.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error("Error fetching patient count:", error);
    res.status(500).json({ error: "Error fetching patient count" });
  }
});


// Route to get all patients (for Admin approval list)
router.get('/list', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to approve a patient
router.put('/approve/:id', async (req, res) => {
  try {
    await Patient.findByIdAndUpdate(req.params.id, { isApproved: true });
    res.json({ message: 'Patient approved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to reject a patient
// Route to reject a patient and remove from both collections
router.put('/reject/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the patient in the Patient collection
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Remove patient from the Patient collection
    await Patient.findByIdAndDelete(id);

    // Remove the corresponding user from the User collection
    const userDeleted = await User.findOneAndDelete({ email: patient.email });
    if (!userDeleted) {
      return res.status(404).json({ message: 'User record not found in User table.' });
    }

    res.status(200).json({
      message: 'Patient rejected and removed from both Patient and User tables successfully.',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting patient', error });
  }
});

// Route to delete a patient by ID
// Route to delete a patient and remove from both collections
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the patient in the Patient collection
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Remove patient from the Patient collection
    await Patient.findByIdAndDelete(id);

    // Remove the corresponding user from the User collection
    const userDeleted = await User.findOneAndDelete({ email: patient.email });
    if (!userDeleted) {
      return res.status(404).json({ message: 'User record not found in User table.' });
    }

    res.status(200).json({
      message: 'Patient deleted and removed from both Patient and User tables successfully.',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting patient', error });
  }
});

// Route to get patient details by email
router.get('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const patient = await Patient.findOne({ email });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found.' });
    }
    res.status(200).json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Route to update patient details
router.put("/update/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const updatedData = req.body;

    const updatedPatient = await Patient.findOneAndUpdate(
      { email },
      updatedData,
      { new: true } // ✅ Ensures updated data is returned
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found." });
    }

    res.status(200).json(updatedPatient); // ✅ Returns updated patient details
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update patient." });
  }
});


module.exports = router;
