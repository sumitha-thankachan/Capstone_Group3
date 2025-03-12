const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const caregiverRoutes = require('./routes/caregiverRoutes');
const patientRoutes = require('./routes/patientRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
app.use('/api/caregivers', caregiverRoutes);
app.use("/api/patients", patientRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
