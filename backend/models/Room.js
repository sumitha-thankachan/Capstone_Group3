const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  type: { type: String, enum: ["ICU", "General", "Private"], required: true },
  capacity: { type: Number, required: true },
  status: { type: String, enum: ["Available", "Occupied", "Under Maintenance"], default: "Available" },
  residents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patient" }]
});

module.exports = mongoose.model("Room", RoomSchema);
