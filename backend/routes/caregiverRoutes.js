const express = require('express');
const router = express.Router();
const Caregiver = require('../models/Caregiver');
const User = require('../models/User'); // Ensure the User model is correctly imported

// Route to register a caregiver
router.post('/register', async (req, res) => {
  try {
    const newCaregiver = new Caregiver(req.body);
    await newCaregiver.save();
    res.status(201).json({ message: 'Caregiver registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to get all caregivers (for Admin approval list)
router.get('/list', async (req, res) => {
  try {
    const caregivers = await Caregiver.find();
    res.json(caregivers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to approve a caregiver
router.put('/approve/:id', async (req, res) => {
  try {
    await Caregiver.findByIdAndUpdate(req.params.id, { isApproved: true });
    res.json({ message: 'Caregiver approved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to reject a caregiver
// Route to reject a caregiver and remove from both collections
router.put('/reject/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the caregiver in the Caregiver collection
    const caregiver = await Caregiver.findById(id);
    if (!caregiver) {
      return res.status(404).json({ message: 'Caregiver not found' });
    }

    // Remove caregiver from the Caregiver collection
    await Caregiver.findByIdAndDelete(id);

    // Remove the corresponding user from the User collection
    const userDeleted = await User.findOneAndDelete({ email: caregiver.email });
    if (!userDeleted) {
      return res.status(404).json({ message: 'User record not found in User table.' });
    }

    res.status(200).json({
      message: 'Caregiver rejected and removed from both Caregiver and User tables successfully.',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting caregiver', error });
  }
});


// Route to delete a caregiver by ID
// Route to delete a caregiver and remove from both collections
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the caregiver in the Caregiver collection
    const caregiver = await Caregiver.findById(id);
    if (!caregiver) {
      return res.status(404).json({ message: 'Caregiver not found' });
    }

    // Remove caregiver from the Caregiver collection
    await Caregiver.findByIdAndDelete(id);

    // Remove the corresponding user from the User collection
    const userDeleted = await User.findOneAndDelete({ email: caregiver.email });
    if (!userDeleted) {
      return res.status(404).json({ message: 'User record not found in User table.' });
    }

    res.status(200).json({
      message: 'Caregiver deleted and removed from both Caregiver and User tables successfully.',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting caregiver', error });
  }
});


// Route to get caregiver details by email
router.get('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const caregiver = await Caregiver.findOne({ email });

    if (!caregiver) {
      return res.status(404).json({ message: 'Caregiver not found.' });
    }
    res.status(200).json(caregiver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});
// Update caregiver details
router.put("/update/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const updatedData = req.body;

    const updatedCaregiver = await Caregiver.findOneAndUpdate(
      { email },
      updatedData,
      { new: true } // Return the updated document
    );

    if (!updatedCaregiver) {
      return res.status(404).json({ message: "Caregiver not found." });
    }

    res.status(200).json(updatedCaregiver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update caregiver." });
  }
});

module.exports = router;
