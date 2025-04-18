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
  isApproved: { type: Boolean, default: false }, // If approval is required
  dateAdded: { type: Date, default: Date.now },
  medicalPhoto: { type: String },  // store filename or path
  medicalReport: { type: String },
  assignedCaregiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Caregiver",
    default: null
  }
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
