const mongoose = require('mongoose');

const caregiverSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  contact: String,
  email: { type: String, unique: true },
  address: String,
  experience: Number,
  specialization: String,
  isApproved: { type: Boolean, default: false }, 
  image: String, // or Buffer if storing binary
resume: String,
});



const Caregiver = mongoose.model('Caregiver', caregiverSchema);
module.exports = Caregiver;
