const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const Expense = require("./models/Expense"); 

const expensesRoutes = require("./routes/expenses");

const stripeRoutes = require('./routes/stripeRoutes');
const caregiverRoutes = require('./routes/caregiverRoutes');
const patientRoutes = require('./routes/patientRoutes');
const adminRoutes = require("./routes/adminRoutes");
const roomRoutes = require("./routes/roomRoutes");
const taskRoutes = require('./routes/taskRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

dotenv.config();

const app = express();


const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Middleware
app.use(express.json());
app.use(cors());

app.use("/api/expenses", expensesRoutes);

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/stripe", stripeRoutes);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use("/api/caregivers", caregiverRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/rooms", roomRoutes);
app.use('/api/payments', paymentRoutes);

// get requests
app.get("/api/expenses/all", (req, res) => {
  Expense.find({})
    .then((expenses) => {
      console.log("Fetched expenses from DB:", expenses);  
      res.json(expenses);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
