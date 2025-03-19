const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');

// Route to create a new task
router.post('/tasks', async (req, res) => {
  const { name, task, resident, status } = req.body;
  const newTask = new Task({ name, task, resident, status });

  try {
    const savedTask = await newTask.save();
    console.log("Task added:", savedTask);  // Log to confirm task is saved
    res.status(201).json(savedTask);
  } catch (err) {
    console.error('Error saving task:', err); // Log any error
    res.status(400).json({ message: err.message });
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

  
// Route to get a single task by ID
router.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to update a task status
router.put('/tasks/:id', async (req, res) => {
  const { status } = req.body;

  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    task.status = status;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
