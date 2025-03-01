// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true, enum: ['Admin', 'Caregiver'], default: 'Caregiver' }, // Added role field
});

module.exports = mongoose.model("User", UserSchema);
