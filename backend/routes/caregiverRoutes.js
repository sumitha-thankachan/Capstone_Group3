const express = require("express");
const router = express.Router();
const Caregiver = require("../models/Caregiver");
const User = require("../models/User");
const multer = require("multer");
const path = require("path");

// === Multer setup ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

// Route to get count of approved caregivers
router.get('/count/approved', async (req, res) => {
  try {
    const count = await Caregiver.countDocuments({ isApproved: true });
    console.log('Approved caregivers count:', count); // Debug log
    res.json({ count });
  } catch (error) {
    console.error('Error getting approved caregivers count:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route to get all caregivers (for Admin approval list)
router.get('/list', async (req, res) => {
  try {
    const caregivers = await Caregiver.find();
    res.json(caregivers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to register a caregiver
// router.post('/register', async (req, res) => {
//   try {
//     const newCaregiver = new Caregiver(req.body);
//     await newCaregiver.save();
//     res.status(201).json({ message: 'Caregiver registered successfully' });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });
// Register caregiver with image & resume upload
router.post(
  "/register",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const newCaregiver = new Caregiver({
        ...req.body,
        image: req.files?.image?.[0]?.filename,
        resume: req.files?.resume?.[0]?.filename,
      });

      await newCaregiver.save();
      res.status(201).json({ message: "Caregiver registered successfully" });
    } catch (error) {
      console.error("Error registering caregiver:", error);
      res.status(400).json({ error: error.message });
    }
  }
);

// Route to approve a caregiver
router.put('/approve/:id', async (req, res) => {
  try {
    await Caregiver.findByIdAndUpdate(req.params.id, { isApproved: true });
    res.json({ message: 'Caregiver approved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to reject a caregiver and remove from both collections
router.put('/reject/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the caregiver in the Caregiver collection
    const caregiver = await Caregiver.findById(id);
    if (!caregiver) {
      return res.status(404).json({ message: 'Caregiver not found' });
    }

    // Remove caregiver from the Caregiver collection
    await Caregiver.findByIdAndDelete(id);

    // Remove the corresponding user from the User collection
    const userDeleted = await User.findOneAndDelete({ email: caregiver.email });
    if (!userDeleted) {
      return res.status(404).json({ message: 'User record not found in User table.' });
    }

    res.status(200).json({
      message: 'Caregiver rejected and removed from both Caregiver and User tables successfully.',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting caregiver', error });
  }
});

// Route to delete a caregiver and remove from both collections
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the caregiver in the Caregiver collection
    const caregiver = await Caregiver.findById(id);
    if (!caregiver) {
      return res.status(404).json({ message: 'Caregiver not found' });
    }

    // Remove caregiver from the Caregiver collection
    await Caregiver.findByIdAndDelete(id);

    // Remove the corresponding user from the User collection
    const userDeleted = await User.findOneAndDelete({ email: caregiver.email });
    if (!userDeleted) {
      return res.status(404).json({ message: 'User record not found in User table.' });
    }

    res.status(200).json({
      message: 'Caregiver deleted and removed from both Caregiver and User tables successfully.',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting caregiver', error });
  }
});


// for task management
// Route to get only approved caregivers
router.get('/approved', async (req, res) => {
  try {
    const caregivers = await Caregiver.find({ isApproved: true });
    res.json(caregivers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get caregiver details by email
router.get('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const caregiver = await Caregiver.findOne({ email });

    if (!caregiver) {
      return res.status(404).json({ message: 'Caregiver not found.' });
    }
    res.status(200).json(caregiver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Update caregiver details
// router.put("/update/:email", async (req, res) => {
//   try {
//     const email = req.params.email;
//     const updatedData = req.body;

//     const updatedCaregiver = await Caregiver.findOneAndUpdate(
//       { email },
//       updatedData,
//       { new: true }
//     );

//     if (!updatedCaregiver) {
//       return res.status(404).json({ message: "Caregiver not found." });
//     }

//     res.status(200).json(updatedCaregiver);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to update caregiver." });
//   }
// });
router.put(
  "/update/:email",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { email } = req.params;

      const updateData = {
        ...req.body,
      };

      if (req.files?.image?.[0]) {
        updateData.image = req.files.image[0].filename;
      }

      if (req.files?.resume?.[0]) {
        updateData.resume = req.files.resume[0].filename;
      }

      const updatedCaregiver = await Caregiver.findOneAndUpdate(
        { email },
        updateData,
        { new: true }
      );

      if (!updatedCaregiver) {
        return res.status(404).json({ message: "Caregiver not found." });
      }

      res.status(200).json(updatedCaregiver);
    } catch (error) {
      console.error("Error updating caregiver:", error);
      res.status(500).json({ message: "Failed to update caregiver." });
    }
  }
);


// Route to get caregiver profile (for sidebar use)
router.get('/profile/:email', async (req, res) => {
  try {
    const caregiver = await Caregiver.findOne({ email: req.params.email });
    if (!caregiver) return res.status(404).json({ message: 'Caregiver not found' });
    res.json({
      name: caregiver.name,
      photo: caregiver.image || 'default-profile.png'
    });
  } catch (error) {
    console.error("Error fetching caregiver profile:", error);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
