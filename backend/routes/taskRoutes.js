const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');

router.post('/', async (req, res) => { // ✅ Path should be '/'
  try {
    const { name, task, resident, status } = req.body;
    
    if (!name || !task || !resident || !status) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newTask = new Task({ name, task, resident, status });
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

  // Fetch all tasks
router.get('/', async (req, res) => {
  console.log('Fetching tasks...'); 
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});
  
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
