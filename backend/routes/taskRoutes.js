const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');
const { authenticateUser } = require('../middleware/auth');
const Caregiver = require('../models/Caregiver');

// Create a new task
router.post('/', async (req, res) => {
  try {
    const { name, task, resident, status, caregiver } = req.body;

    if (!name || !task || !resident || !status || !caregiver) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newTask = new Task({ name, task, resident, status, caregiver });
    const savedTask = await newTask.save();
    console.log("Task added:", savedTask);
    res.status(201).json(savedTask);
  } catch (err) {
    console.error('Error saving task:', err);
    res.status(400).json({ message: err.message });
  }
});

// Update task details
router.put('/:id', async (req, res) => {
  try {
    const { name, task, resident, status, caregiver } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { name, task, resident, status, caregiver },
      { new: true } // Return the updated document
    );

    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task', error: err.message });
  }
});

// Get task count
router.get('/count', async (req, res) => {
  try {
    const count = await Task.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error fetching task count:', error);
    res.status(500).json({ error: 'Error fetching task count', message: error.message });
  }
});


// Get all tasks (with caregiver populated)
router.get('/', async (req, res) => {
  console.log('Fetching tasks...');
  try {
    const tasks = await Task.find()
      .populate('caregiver', 'name email')
      .populate('resident', 'name'); // optional if resident is a reference
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// Get task by ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('caregiver', 'name email')
      .populate('resident', 'name');
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update task status only
router.put('/status/:id', async (req, res) => {
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

//------------------------------------------
// Get tasks assigned to a caregiver by email
router.get('/caregiver/tasks/:email', async (req, res) => {
  console.log('Fetching tasks for caregiver with email:', req.params.email); // Debug log
  try {
    const { email } = req.params;
    const caregiver = await Caregiver.findOne({ email });

    if (!caregiver) {
      return res.status(404).json({ message: 'Caregiver not found' });
    }

    const tasks = await Task.find({ caregiver: caregiver._id })
      .populate('caregiver', 'name email')
      .populate('resident', 'name');
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks for caregiver:', err);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});




module.exports = router;
