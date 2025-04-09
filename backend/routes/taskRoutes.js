const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');
const Caregiver = require("../models/Caregiver");
const Patient = require("../models/Patient");



router.post('/', async (req, res) => {
  try {
    const { name, task, resident, status, caregiver } = req.body;

    if (!name || !task || !resident || !status || !caregiver) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find the caregiver by their ID
    const caregiverDoc = await Caregiver.findById(caregiver);
    if (!caregiverDoc) {
      return res.status(400).json({ message: 'Caregiver not found' });
    }

    // Find the patient by their ID
    const patientDoc = await Patient.findById(resident);
    if (!patientDoc) {
      return res.status(400).json({ message: 'Patient not found' });
    }

    // Create and save the task
    const newTask = new Task({
      name,
      task,
      resident: patientDoc._id,
      status,
      caregiver: caregiverDoc._id,
    });

    const savedTask = await newTask.save();

    // Populate resident and caregiver before sending response
    const populatedTask = await Task.findById(savedTask._id)
      .populate('resident', 'name')
      .populate('caregiver', 'name');

    console.log("Task added:", populatedTask);
    res.status(201).json(populatedTask);
  } catch (err) {
    console.error('Error saving task:', err);
    res.status(400).json({ message: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().populate('resident', 'name').populate('caregiver', 'name');
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// Update task details
router.put('/:id', async (req, res) => {
  try {
    const { name, task, resident, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { name, task, resident, status },
      { new: true } // Return the updated document
    );
    
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Route to get the total number of tasks
router.get("/count", async (req, res) => {
  try {
    const count = await Task.countDocuments(); // No need to query by _id
    res.json({ count });
  } catch (error) {
    console.error("Error fetching task count:", error);  // Log the error details
    res.status(500).json({ error: "Error fetching task count", message: error.message });  // Include error message for clarity
  }
});

/* // Get tasks by caregiver ObjectId
const mongoose = require('mongoose');

// Fetch tasks assigned to a specific caregiver
router.get('/caregiver/:caregiverId', async (req, res) => {
  console.log('Received request for caregiver ID:', req.params.caregiverId);
  try {
    const caregiverId = req.params.caregiverId;

    // Ensure caregiverId is valid
    if (!caregiverId || !mongoose.Types.ObjectId.isValid(caregiverId)) {
      return res.status(400).json({ message: 'Invalid or missing caregiver ID' });
    }

    console.log('Caregiver ID to query:', caregiverId); // Log caregiverId

    // Query tasks assigned to the specific caregiver
    const tasks = await Task.find({ caregiver: caregiverId })
      .populate('resident', 'name') // Get resident's name
      .populate('caregiver', 'name'); // Get caregiver's name

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this caregiver' });
    }

    res.json(tasks); // Send tasks as response
  } catch (err) {
    console.error('Error fetching tasks for caregiver:', err);
    res.status(500).json({ message: 'Error fetching tasks for caregiver', error: err.message });
  }
}); */






  
// Fetch single task by ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update task status
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.status = status;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;