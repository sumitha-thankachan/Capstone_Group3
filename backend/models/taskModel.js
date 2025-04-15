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
  resident: {
    type: String, // You can link this to a Resident model if necessary
    required: true
  },
  caregiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Caregiver',
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  }
}, { timestamps: true });

// Create the Task model based on the schema
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
