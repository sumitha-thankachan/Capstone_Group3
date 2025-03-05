const express = require('express');
const router = express.Router();
const Caregiver = require('../models/Caregiver');

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

// DELETE caregiver by ID


  router.delete('/delete/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const caregiver = await Caregiver.findByIdAndDelete(id);
      
      if (!caregiver) {
        return res.status(404).json({ message: 'Caregiver not found' });
      }
  
      res.status(200).json({ message: 'Caregiver deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting caregiver', error });
    }
  });
  

module.exports = router;
