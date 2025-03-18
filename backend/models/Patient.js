const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  address: { type: String, required: true },
  medicalHistory: { type: String, required: true },
  allergies: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now },
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
