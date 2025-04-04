const mongoose = require('mongoose');

// Define the task schema
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  task: {
    type: String,
    required: true
  },
  resident: {  // Add this field
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient', // Reference to Patient model
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  caregiver: {  // Link caregiver to Caregiver model
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Caregiver', // Reference to Caregiver model
    required: true
  },
}, { timestamps: true });

// Create the Task model based on the schema
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
