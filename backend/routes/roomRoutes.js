const express = require("express");
const Room = require("../models/Room");
const Patient = require("../models/Patient");
const router = express.Router();

// ✅ Fetch All Rooms
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find().populate("residents", "name age medicalStatus");
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Add a New Room
router.post("/", async (req, res) => {
  try {
    const { roomNumber, type, capacity } = req.body;
    const newRoom = new Room({ roomNumber, type, capacity, status: "Available" }); // ✅ Default status: Available
    await newRoom.save();
    res.status(201).json({ message: "Room added successfully", room: newRoom });
  } catch (error) {
    res.status(500).json({ message: "Error adding room", error: error.message });
  }
});

// ✅ Assign a Patient to a Room & Update Status
router.put("/:id/assign", async (req, res) => {
    try {
      const room = await Room.findById(req.params.id);
      const patient = await Patient.findById(req.body.patientId);
  
      if (!room || !patient) {
        return res.status(404).json({ message: "Room or Patient not found" });
      }
  
      // ✅ Prevent assignment if the patient is already in another room
      const existingRoom = await Room.findOne({ residents: patient._id });
      if (existingRoom) {
        return res.status(400).json({
          message: `Patient ${patient.name} is already assigned to Room ${existingRoom.roomNumber}.`,
        });
      }
  
      // ✅ Prevent assignment if the room is under maintenance
      if (room.status === "Under Maintenance") {
        return res.status(400).json({ message: "Cannot assign patients to a room under maintenance." });
      }
  
      // ✅ Prevent assignment if the room is full
      if (room.residents.length >= room.capacity) {
        return res.status(400).json({ message: "Room is full" });
      }
  
      // ✅ Assign patient to the room
      room.residents.push(patient._id);
      await room.save();
  
      patient.room = room._id;
      await patient.save();
  
      // ✅ Update status to "Occupied" if room is full
      if (room.residents.length >= room.capacity) {
        room.status = "Occupied";
        await room.save();
      }
  
      res.json({ message: `Patient ${patient.name} assigned to Room ${room.roomNumber}`, room });
    } catch (error) {
      res.status(500).json({ message: "Error assigning patient", error: error.message });
    }
  });
  
  
// ✅ Remove a Patient from a Room & Update Status
router.put("/:id/remove", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    room.residents = room.residents.filter(id => id.toString() !== req.body.patientId);
    await room.save();

    const patient = await Patient.findById(req.body.patientId);
    if (patient) {
      patient.room = null;
      await patient.save();
    }

    // ✅ If room has space, update status back to "Available"
    if (room.residents.length < room.capacity) {
      room.status = "Available";
      await room.save();
    }

    res.json({ message: "Patient removed successfully", room });
  } catch (error) {
    res.status(500).json({ message: "Error removing patient", error: error.message });
  }
});

// ✅ Mark a Room as Under Maintenance
// router.put("/:id/status", async (req, res) => {
//   try {
//     const room = await Room.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
//     if (!room) return res.status(404).json({ message: "Room not found" });

//     res.json({ message: "Room status updated", room });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating room status", error: error.message });
//   }
// });
router.put("/:id/status", async (req, res) => {
    try {
      const room = await Room.findById(req.params.id);
      if (!room) return res.status(404).json({ message: "Room not found" });
  
      // ✅ Prevent setting "Available" if room is full
      if (req.body.status === "Available" && room.residents.length >= room.capacity) {
        return res.status(400).json({ message: "Cannot mark as Available, room is full." });
      }
  
      room.status = req.body.status;
      await room.save();
  
      res.json({ message: "Room status updated", room });
    } catch (error) {
      res.status(500).json({ message: "Error updating room status", error: error.message });
    }
  });
  

module.exports = router;
