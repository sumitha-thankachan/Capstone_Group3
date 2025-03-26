const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Patient = require('../models/Patient');
const User = require('../models/User'); // Ensure the User model is correctly imported


// Route to register a patient

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'application/pdf'];
  cb(null, allowedTypes.includes(file.mimetype));
};

const upload = multer({ storage, fileFilter });

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

// Route to get the count of approved patients
router.get("/count/approved", async (req, res) => {
  try {
    const count = await Patient.countDocuments({ isApproved: true }); // Only count approved patients
    res.json({ count });
  } catch (error) {
    console.error("Error fetching approved patients count:", error);
    res.status(500).json({ error: "Error fetching approved patients count" });
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
    await Patient.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
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
router.put('/update/:email', upload.fields([
  { name: 'medicalPhoto', maxCount: 1 },
  { name: 'medicalReport', maxCount: 1 }
]), async (req, res) => {
  try {
    const { email } = req.params;
    const updatedData = { ...req.body };


    // Convert string -> number for age
    if (updatedData.age) updatedData.age = Number(updatedData.age);

    if (req.files?.medicalPhoto?.[0]) {
      updatedData.medicalPhoto = req.files.medicalPhoto[0].filename;
    }

    if (req.files?.medicalReport?.[0]) {
      updatedData.medicalReport = req.files.medicalReport[0].filename;
    }

   

    const updatedPatient = await Patient.findOneAndUpdate(
      { email },
      updatedData,
      { new: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found.' });
    }

    res.status(200).json(updatedPatient);
  } catch (error) {
    console.error("🔥 Update error:", error);
    res.status(500).json({ message: 'Failed to update patient.', error: error.message });
  }
});




router.post('/register', upload.fields([
  { name: 'medicalPhoto', maxCount: 1 },
  { name: 'medicalReport', maxCount: 1 }
]), (req, res) => {
  const patientData = req.body;
  console.log('Received patient registration:', patientData);
  console.log('Uploaded files:', req.files);
  res.json({ message: 'Patient registered successfully' });
});





router.get('/profile/:email', async (req, res) => {
  try {
    const patient = await Patient.findOne({ email: req.params.email });
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;