const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// to fetch all expenses
router.get("/expenses/all", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// for saving
router.post("/save", async (req, res) => {
  try {
    console.log("Incoming request data:", req.body);

    const { date, description, amount } = req.body;
    if (!date || !description || !amount) {
      console.log("Missing fields in request:", req.body);
      return res.status(400).json({ message: "All fields are required." });
    }

    const newExpense = new Expense({
      date,
      description,
      amount,
      category: "Expenses",
    });

    await newExpense.save();
    console.log("Expense saved successfully:", newExpense);
    res.status(201).json({ message: "Expense saved successfully" });
  } catch (error) {
    console.error("Error saving expense:", error);
    res.status(500).json({ message: "Error saving expense", error });
  }
});

// DELETE route to delete an expense by ID
router.delete("/expenses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
